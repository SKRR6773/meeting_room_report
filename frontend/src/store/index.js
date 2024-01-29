import { createStore } from "vuex";
import axios from 'axios';


export default createStore({
    state()
    {
        return {
            appName: "Meeting Report App",
            simpleQuestionData: []
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
        }
    }
});