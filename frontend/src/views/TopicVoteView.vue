<template>
    <div>
        <div class="container mb-5">
            <!-- header -->
            <div class="container shadow p-0 rouned-5">
                <HeaderPosterComponent :topicData.sync="topicData" />
            </div>

            <!-- {{ topicData }} -->
            <div class="container shadow p-0" v-if="is_render_table_vote" ref="voteFormEl">
                <TableVoteComponent 
                    :meeting_topic_id.sync="topicData.id" 
                    :meeting_name.sync="topicData.name"
                    :meeting_room_name.sync="topicData.room_name" 
                    :can_vote.sync="can_vote"
                    @submit="Submit" 
                    @topic-selected="ChangeTopic"
                />
            </div>


            <!-- summary -->
            <div class="container shadow p-0 mt-5" ref="votedSummaryEl">
                <Transition>
                    <div class="bg-light" v-if="is_show_summary">
                        <VoteSummaryComponent :meeting_topic_id.sync="topicData.id" /> 
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, reactive, onMounted } from 'vue';
    import { io } from 'socket.io-client';
    import { useRoute, useRouter } from 'vue-router';
    import axios from 'axios';
    import my_modules from '../lib/it_system_module';
    import Swal from 'sweetalert2';
    import jsCookies from 'js-cookie';

    import TableVoteComponent from '../components/TopicVoteComponents/TableVoteComponent.vue';
    import VoteSummaryComponent from '../components/VoteSummaryComponent.vue';
    import { useStore } from 'vuex';
    import HeaderPosterComponent from '@/components/HeaderPosterComponent.vue';


    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const topicData = reactive({
        id: null,
        name: null,
        room_name: null,
        details: null,
        people_count: 0,
        status_name: null,
        createdAt: null,
        voted_count: 0
    });

    const can_vote = ref(false);
    const is_render_table_vote = ref(false);
    const is_show_summary = ref(false);


    const voteFormEl = ref();
    const votedSummaryEl = ref();

    const ChangeTopic = ({cb, topic_id}) => 
    {
        router.push({params: {
            topic_id
        }});

        _LoadTopicDetailsWithTopicId(topic_id, cb);
    }

    const Submit = (value) =>
    {
        is_show_summary.value = false;

        const { form, values, cb_toggle_submit_disabled } = value;
        
        const formData = new FormData(form);
        formData.append('values', JSON.stringify(values));

        axios({
            url: import.meta.env.VITE_VUE_API_URL + "/meeting_votes/vote_topic",
            method: "POST",
            data: formData
        }).then((response) => {
            my_modules.sweetAlertReport(response.data, function(){
                // error
            }, () => {
                // success
                cb_toggle_submit_disabled();
                can_vote.value = false;

                
                is_show_summary.value = true;
        
                setTimeout(() => {
                    votedSummaryEl.value.scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 500);
                // setTimeout(() => router.push(`/topic_review/${topicData.id}`), 500);

                store.commit('updateTopicVoted', topicData.id);
            }, );
        }).catch((err) => {
            console.error(err);

            my_modules.sweetAlertServerError();
        });
    }   

    const UpdateTopicDetails = () => 
    {
        if (route.params.topic_id)
        {
            // alert(route.params.topic_id);
            _LoadTopicDetailsWithTopicId(route.params.topic_id);
        }
        else
        {
            is_render_table_vote.value = true;
        }
    }

    const _LoadTopicDetailsWithTopicId = (topic_id, cb=null) => 
    {
        // is_render_table_vote.value = false;


        const formData = new FormData;
        formData.append("topic_id", topic_id);



        axios({
            url: import.meta.env.VITE_VUE_API_URL + "/meeting_topic/get_topic_detail",
            method: "POST",
            data: formData
        }).then((response) => {
            if (typeof cb === 'function')
            {
                cb(response.data);
            }


            my_modules.sweetAlertReport(response.data, () => {
                // error ...

                // topic is exists
                if (response.data.error.includes("Service For Check Topic Exists Error #1"))
                {
                    Swal.fire({
                        icon: 'error',
                        title: "คุณจะลองค้นหาอีกครั้ง?",
                        text: "ดูเหมือนว่าการห้องประเมินหลังประชุมที่คุณจะโหวตไม่มีอยู่จริง?",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#6C757D",
                        cancelButtonText: "ลองอีกครั้ง",
                        confirmButtonText: "ไปหน้าแดชบอร์ด"
                    }).then((result) => {
                        if (result.isConfirmed)
                        {
                            router.push({
                                path: '/topics'
                            });
                        }
                        else
                        {
                            _LoadTopicDetailsWithTopicId(topic_id);
                        }
                    })
                }

            }, (data) => {
                
                let _data = {};
                if (response.data.data.length)
                {
                    _data = response.data.data.splice(-1)[0];
                }
                
                _data = response.data.data;
                
                Object.keys(_data).forEach((keyname) => {

                    topicData[keyname] = _data[keyname];
                });

                can_vote.value = true;
                is_render_table_vote.value = true;

            }, false, null, false, true);
        }).catch((err) => {
            console.error(err);

            my_modules.sweetAlertServerError();
        });
    }


    onMounted(() => {
        // const socket = io(null, {
        //     path: '/topic/' + route.params.topic_id.toString() 
        // });


        // socket.on('connect', () => {
        //     socket.emit('change_topic', route.params.topic_id.toString());
        // });

        if (!jsCookies.get("topics_id_voted"))
        {
            store.commit("setTopicVoted", []);
        }

        UpdateTopicDetails();
    });
    
</script>
<style scoped>
    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.5s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }
</style>