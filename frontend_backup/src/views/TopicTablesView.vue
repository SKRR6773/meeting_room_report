<template>
    <div>
        <div class="container-fluid">
            <div class="container shadow p-0 bg-light">
                <header>
                    <div class="container px-5 pt-3">
                        <div class="d-flex">
                            <button type="button" class="btn btn-warning rounded-0 ms-auto shadow-custom btn-lg" @click="CreateMeetRoomTopic">สร้างการประชุม</button>
                        </div>
                    </div>
                </header>
                <section style="overflow-x: auto;">
                    <TableTopicComponent />
                </section>
            </div>
        </div>


        <div class="modal fade" tabindex="-1" ref="modalCreateTopic">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold text-secondary">แบบฟอร์มสร้างการประชุม</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <CreateMeetRoomTopicFormComponent @submit="_CreateMeetRoomTopic" />
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import Swal from 'sweetalert2';
    import my_modules from '@/lib/it_system_module';
    import { Modal } from 'bootstrap/dist/js/bootstrap.bundle';
    import jsCookies from 'js-cookie';
    import { useStore } from 'vuex';

    
    import TableTopicComponent from '../components/TopicTableComponent/TableTopicComponent.vue';
    import CreateMeetRoomTopicFormComponent from '../components/FormComponents/CreateMeetRoomTopicFormComponent.vue';


    const store = useStore();


    const modalCreateTopic = ref();

    
    const CreateMeetRoomTopic = () => 
    {
        if (store.getters.getAuthed)
        {
            Modal.getOrCreateInstance(modalCreateTopic.value).show();
            return;
        }

        let username = null;
        let password = null;


        Swal.fire({
            icon: 'warning',
            title: 'คำเตือน!',
            text: "คุณคือผู้จัดการประชุมหรือผู้ที่ได้รับมอบหมายให้สร้างการประเมิน?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#6c757d",
            cancelButtonText: "ไม่, ฉันแค่กดผิด",
            confirmButtonText: "ใช่, ฉันต้องการสร้าง",
            reverseButtons: true,
            focusCancel: true
        }).then((response) => {
            if (response.isConfirmed)
            {
                const userModal = () => Swal.fire({
                    title: "ป้อนรหัสพนักงานของคุณ",
                    input: "text",
                    confirmButtonText: "ถัดไป",
                    showCancelButton: true,
                    cancelButtonText: "ยกเลิก",
                    focusConfirm: true
                }).then((result) => {
                    if (result.isConfirmed)
                    {
                        const formData = new FormData;
                        formData.append("empcode", result.value);

                        username = result.value;

                        axios({
                            url: import.meta.env.VITE_VUE_API_URL + "/employee/getEmpDetailsByEmpCode",
                            method: "POST",
                            data: formData
                        }).then((response) => {
                            my_modules.sweetAlertReport(response.data, function(err){
                                // errors...
                            }, function(data){
                                // success ...


                                const formData = new FormData;
                                formData.append("empcode", data.data.EmployeeCode);

                                axios({
                                    url: import.meta.env.VITE_VUE_API_URL + "/meeting_topic/chk_empcode_can_create_topic",
                                    method: "POST",
                                    data: formData
                                }).then((response) => {

                                    my_modules.sweetAlertReport(response.data, function(){
                                        // errors...
                                    }, function(){
                                        Swal.fire({
                                            allowOutsideClick: false,
                                            showClass: {
                                                popup: `
                                                    animate__animated
                                                    animate__fadeInUp
                                                    animate__faster
                                                `
                                            },
                                            imageUrl: data.data.E_ImagePath,
                                            imageHeight: '30vh',
                                            title: "ป้อนรหัสผ่าน?",
                                            text: `คุณคือ ${data.data.LocalFirstName} ${data.data.LocalLastName}`,
                                            showCancelButton: true,
                                            cancelButtonText: "ไม่ใช่ฉัน",
                                            confirmButtonText: "เข้าสู่ระบบ",
                                            input: 'password',
                                            focusConfirm: true
                                        }).then((result) => {
                                            if (result.isConfirmed)
                                            {
                                                password = result.value;
                                                
                                                const formData = new FormData;
                                                formData.append("empcode", username);
                                                formData.append("emppassword", password);

                                                axios({
                                                    url: import.meta.env.VITE_VUE_API_URL + "/auth/login",
                                                    method: 'POST',
                                                    data: formData
                                                }).then((response) => {
                                                    console.log("Response => ");
                                                    console.log(response);

                                                    my_modules.sweetAlertReport(response.data, function(){
                                                        // errors ...
                                                    }, function(_data){
                                                        console.log("Login Successfully!");
                                                        console.log("Data => ");
                                                        console.log(_data);
                                                        console.log(_data.data);

                                                        const { data, token } = _data.data;

                                                        store.commit('updateUserDetails', data);
                                                        store.commit('updateUserToken', token);

                                                        localStorage.setItem('user_details', JSON.stringify(data));
                                                        localStorage.setItem('user_token', token);

                                                        Modal.getOrCreateInstance(modalCreateTopic.value).show();

                                                    }, false, null, false, true);
                                                }).catch((err) => {
                                                    console.error(err);

                                                    my_modules.sweetAlertServerError();
                                                });
                                            }
                                            else
                                            {
                                                userModal();
                                            }
                                        });
                                    }, false, null, false, true);

                                }).catch((err) => {
                                    console.error(err);

                                    my_modules.sweetAlertServerError();
                                });
                            }, false, null, false, true);
                        }).catch((err) => {
                            console.error(err);
                        });
                    }
                });

                userModal();
            }
        });
    }


    const _CreateMeetRoomTopic = (e) => 
    {
        const formData = new FormData(e.target);


        axios({
            url: import.meta.env.VITE_VUE_API_URL + "/meeting_topic/create_topic",
            method: "POST",
            data: formData
        }).then((response) => {
            my_modules.sweetAlertReport(response.data, function(){
                // errors...
            }, (data) => {
                // succ

                console.log("Data => ");
                console.log(data.data);
            }, false, function(){
                // warnings ...
            }, false, false);
        }).catch((err) => {
            console.error(err);
        });
    }


    const sayHello = () => alert("Hello World!");

    onMounted(() => {
        axios({
            url: import.meta.env.VITE_VUE_API_URL + "/debug/",
            method: "GET",
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.error(err);
        });
    });
</script>