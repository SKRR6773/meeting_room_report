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
                        <form @submit.prevent="_CreateMeetRoomTopic" method="post">
                            <div class="container-fluid">
                                <!-- <p class="text-secondary" style="font-weight: 500;">แจ้งให้เราทราบคำถาม ข้อเสนอแนะ และข้อกังวลของคุณโดยกรอกแบบฟอร์ม</p> -->
                                <div class="row gy-3">
                                    <div class="col-md-12 col-lg-4">
                                        <div class="form-floating">
                                            <input type="text" name="name" class="form-control" placeholder="ชื่อประชุม" required>
                                            <label for="floatingPassword">ชื่อประชุม</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-4">
                                        <div class="form-floating">
                                            <input type="text" name="room_id" class="form-control" placeholder="ห้องประชุม" required>
                                            <label for="floatingPassword">ห้องประชุม</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-4">
                                        <div class="form-floating">
                                            <input type="number" min="1" name="people_count" class="form-control" placeholder="จำนวนผู้เข้าร่วม" value="1" required>
                                            <label for="floatingPassword">จำนวนผู้เข้าร่วม</label>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-floating">
                                            <textarea class="form-control" name="details" placeholder="รายละเอียด" style="height: 30vh;" required></textarea>
                                            <label for="floatingTextarea2">รายละเอียด</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex mt-3">
                                    <button type="submit" class="btn btn-primary px-4 py-2 fw-bold rounded-1">สร้าง</button>
                                </div>
                            </div>
                        </form>
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

    
    import TableTopicComponent from '../components/TopicTableComponent/TableTopicComponent.vue';



    const modalCreateTopic = ref();

    
    const CreateMeetRoomTopic = () => 
    {
        if (jsCookies.get("username") && jsCookies.get("password"))
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
        
                                                
                                                jsCookies.set("username", username);
                                                jsCookies.set("password", password);
                                                
                                                Modal.getOrCreateInstance(modalCreateTopic.value).show();
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
            url: import.meta.env.VITE_VUE_API_URL + "/",
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