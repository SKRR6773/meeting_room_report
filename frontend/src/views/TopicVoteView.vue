<template>
    <div>
        <!-- {{ $route.params }} -->
        <div class="container-fluid">
            <div class="container shadow p-0">
                <TableVoteComponent :meeting_topic_id="topicData.id" :meeting_name="topicData.name" :meeting_room_name="topicData.room_name" @submit="Submit" />
            </div>
        </div>
    </div>
</template>
<script setup>
    import { reactive, onMounted } from 'vue';
    import { io } from 'socket.io-client';
    import { useRoute, useRouter } from 'vue-router';
    import axios from 'axios';
    import my_modules from '../lib/it_system_module';
    import Swal from 'sweetalert2';

    import TableVoteComponent from '../components/TopicVoteComponents/TableVoteComponent.vue';


    const route = useRoute();
    const router = useRouter();

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


    function Submit(value)
    {
        const { form, values, cb_toggle_submit_disabled } = value;


        console.log("Response => ");

        console.log(form);
        console.log(values);

        
        const formData = new FormData(form);
        formData.append('values', JSON.stringify(values));

        axios({
            url: import.meta.env.VITE_VUE_API_URL + "/meeting_votes/vote_topic",
            method: "POST",
            data: formData
        }).then((response) => {
            my_modules.sweetAlertReport(response.data, function(){
                // error
            }, function(){
                // success
                cb_toggle_submit_disabled();
            }, );
        }).catch((err) => {
            console.error(err);

            my_modules.sweetAlertServerError();
        });
    }   

    const UpdateTopicDetails = () => 
    {
        _LoadTopicDetailsWithTopicId(route.params.topic_id);
    }

    const _LoadTopicDetailsWithTopicId = (topic_id) => 
    {
        const formData = new FormData;
        formData.append("topic_id", topic_id);


        axios({
            url: import.meta.env.VITE_VUE_API_URL + "/meeting_topic/get_topic_detail",
            method: "POST",
            data: formData
        }).then((response) => {
            my_modules.sweetAlertReport(response.data, function(){
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

            }, function(data){
                Object.keys(data.data).forEach((keyname) => {
                    topicData[keyname] = data.data[keyname];
                });
            }, false, null, false, true);
        }).catch((err) => {
            console.error(err);

            my_modules.sweetAlertServerError();
        });
    }


    onMounted(() => {
        const socket = io(null, {
            path: '/topic/' + route.params.topic_id.toString() 
        });


        socket.on('connect', () => {
            socket.emit('change_topic', route.params.topic_id.toString());
        });


        UpdateTopicDetails();
    });
    
</script>