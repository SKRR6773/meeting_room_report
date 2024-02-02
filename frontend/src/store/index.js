import { createStore } from "vuex";
import axios from 'axios';
import my_modules from "@/lib/it_system_module";
import Swal from "sweetalert2";
import moduleOfStore from './lib/module_of_store';
import jsCookies from 'js-cookie';


export default createStore({
    state()
    {
        return {
            appName: "Meeting Report App",
            simpleQuestionData: [],
            user_details: {},
            user_token: '',
            meeting_room_data: [],

            meeting_meta_data: [],
            topics_id_voted: []
        };
    },
    mutations: {
        updateSimpleQuestionData(state, cb=null)
        {
            axios({
                url: import.meta.env.VITE_VUE_API_URL + "/meeting_question/get_questions",
                method: "POST"
            }).then((response) => {
                if (response.data.status)
                {
                    state.simpleQuestionData = response.data.data;
                }


                if (typeof cb === 'function')
                {
                    cb(response.data);
                }
            }).catch((err) => {
                console.error(err);

                if (typeof cb === 'function')
                {
                    cb(false);
                }
            });
        },
        updateUserDetails(state, value)
        {
            state.user_details = value;
            localStorage.setItem('user_details', JSON.stringify(value));
        },
        updateUserToken(state, value)
        {
            state.user_token = value;
            localStorage.setItem('user_token', value);
        },
        verifyUserTokenAndUpdateUser(state, cb=null)
        {
            const formData = new FormData;
            formData.append("token", state.user_token);


            axios({
                url: import.meta.env.VITE_VUE_API_URL + "/auth/verify_my_token",
                method: "POST",
                data: formData
            }).then((response) => {
                my_modules.sweetAlertReport(response.data, (err_data) => {
                    // errors

                    Swal.fire({
                        icon: 'info',
                        title: "คุณต้องการที่จะยืนยันตัวตนอีกรอบหรือไม่",
                        showCancelButton: true,
                        showConfirmButton: true,
                        confirmButtonText: "Yes, i do",
                        cancelButtonText: "No, in later"
                    }).then((result) => {
                        if (result.isConfirmed)
                        {
                            return moduleOfStore.Login(this);
                        }

                        this.commit('updateUserDetails', {});
                        this.commit('updateUserToken', '');
                    });

                    my_modules.callFunc(cb, false);
                }, () => {
                    // success

                    const { data, token } = response.data.data;
    
                    this.commit("updateUserDetails", data);
                    this.commit("updateUserToken", token);

                    my_modules.callFunc(cb, true);

                    this.commit('updateMeetingRoomData');

                }, false, null, false, true);
            }).catch((err) => {
                console.error(err);

                my_modules.sweetAlertServerError(() => my_modules.callFunc(cb, false));
            });
        },
        updateMeetingRoomData(state, cb)
        {
            axios({
                url: import.meta.env.VITE_VUE_API_URL + "/meeting_topic/get_all_room",
                method: "POST"
            }).then((response) => {
                my_modules.sweetAlertReport(response.data, function(){
                    // errors


                }, (data) => {
                    // success

                    state.meeting_room_data = data.data;
                }, true, null, false, true);
            }).catch((err) => {
                console.error(err);

                my_modules.callFunc(cb, false);
            });
        },
        firstUpdateMeetingMetaData(state, cb)
        {
            this.commit('updateMeetingMetaData', (response_data) => {
                state.meeting_meta_data = moduleOfStore.SortByLatest(state.meeting_meta_data.map((row) => {
                    return {
                        ...row,
                        is_new: false
                    };
                }));
                
                
                cb(response_data);
            });


        },
        updateMeetingMetaData(state, cb)
        {
            axios({
                url: import.meta.env.VITE_VUE_API_URL + "/meeting_topic/get_all_topics",
                method: 'POST'
            }).then((response) => {
                if (response.data.status)
                {
                    this.commit('setMeetingMetaData', response.data.data);
                }

                if (typeof cb === 'function')
                {
                    cb(response.data);
                }
            }).catch((err) => {
                console.error(err);
            });
        },
        setMeetingMetaData(state, value)
        {
            const _old_meeting_meta_data_id = state.meeting_meta_data.map((row) => row.id);
            
            state.meeting_meta_data = value.map((row) => {
                
                row.status_name = state.topics_id_voted.includes(row.id) ? "voted" : row.status_name;

                row.is_new = !_old_meeting_meta_data_id.includes(row.id);

                console.log("Row => ");
                console.log(row);
                
                return row;
            })
            // middleware
            .map((row) => {
                row.can_vote = !["voted"].includes(row.status_name);
                return row;
            });

            state.meeting_meta_data = moduleOfStore.SortByLatest(state.meeting_meta_data);
        },
        updateTopicVoted(state, topic_id) // set cookie
        {
            state.topics_id_voted.push(topic_id);

            state.meeting_meta_data = moduleOfStore.SortByLatest(state.meeting_meta_data.map((row) => {
                row.status_name = state.topics_id_voted.includes(row.id) ? "voted" : row.status_name;

                return row;
            }));

            jsCookies.set("topics_id_voted", JSON.stringify(state.topics_id_voted));
        },
        setTopicVoted(state, value)
        {
            state.topics_id_voted = value;

            jsCookies.set("topics_id_voted", JSON.stringify(state.topics_id_voted));
        }
    },

    getters: {
        getAppName(state)
        {
            return state.appName;
        },
        getSimpleQuestionData(state)
        {
            return state.simpleQuestionData.length === 0 ? false : state.simpleQuestionData;
        },
        getUserDetails(state)
        {
            return state.user_details;
        },
        getUserToken(state)
        {
            return state.user_token;
        },
        getAuthed(state)
        {
            return Object.keys(state.user_details).length !== 0 && state.user_token !== '';
        },
        getMeetingRoomData(state)
        {
            return state.meeting_room_data;
        },
        getMeetingMetaData(state)
        {
            return state.meeting_meta_data;
        }
    }
});