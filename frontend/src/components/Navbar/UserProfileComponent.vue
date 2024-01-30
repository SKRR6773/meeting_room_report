<template>
    <div class="btn-group">
        <button type="button" class="btn" onclick="console.log(this.nextElementSibling.click())">
            <img :src="$store.getters.getUserDetails.E_ImagePath" alt="" class="profile-image pt-none" />
        </button>
        <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu">
            <li><h6 class="dropdown-header">{{ 'คุณ ' +  $store.getters.getUserDetails.LocalFirstName + ' ' + $store.getters.getUserDetails.LocalLastName }}</h6></li>
            <li><a class="dropdown-item" href="#" data-bs-target="#modalAddRoomMeeting" data-bs-toggle="modal">เพิ่มห้องประชุม</a></li>
            <li><a class="dropdown-item" href="#" data-bs-target="#modalAddUserPermission" data-bs-toggle="modal">กำหนดสิทธิ์ของผู้ใช้</a></li>
            <li><RouterLink to="/admin/report_all" class="dropdown-item">ดูรายงาน</RouterLink></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" @click="logoutUser">ออกจากระบบ</a></li>
        </ul>


        <div class="modal fade" tabindex="-1" id="modalAddRoomMeeting">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">เพิ่มห้องประชุม</h5>
                        <button class="btn-close" type="button" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form method="post" @submit.prevent="createMeetingRoom">
                            <div class="container-fluid">
                                <div class="form-floating mt-2">
                                    <input type="text" class="form-control" id="floatingInput" name="name" placeholder="ชื่อห้องประชุม">
                                    <label for="floatingInput">ชื่อห้องประชุม</label>
                                </div>
                                <div class="mt-2">
                                    <div class="d-flex">
                                        <button type="submit" class="btn btn-primary px-4 ms-auto">
                                            <span class="spinner-grow spinner-grow-sm spinner visually-hidden"></span>
                                            เพิ่ม
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal fade" tabindex="-1" id="modalAddUserPermission">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">เพิ่มผู้ใช้หรือแก้ไขสิทธิ์</h5>
                    </div>
                    <div class="modal-body">
                        <form method="post" @submit.prevent="createUserRole">
                            <div class="container-fluid">
                                <div class="row g-2">
                                    <div class="col-md">
                                        <div class="form-floating mt-2">
                                            <input type="text" class="form-control" name="empcode" placeholder="รหัสพนักงาน" />
                                            <label for="empcoe">รหัสพนักงาน</label>
                                        </div>
                                        <div class="form-floating mt-2">
                                            <select name="role_name" class="form-select">
                                                <option value="user" selected>User</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                            <label for="empcoe">สิทธิ์เริ่มต้นของผู้ใช้</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-2">
                                    <div class="d-flex">
                                        <button type="submit" class="btn btn-primary px-4 ms-auto">
                                            <span class="spinner-grow spinner-grow-sm spinner visually-hidden"></span>
                                            เพิ่ม
                                        </button>
                                    </div>
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
    import { onMounted } from 'vue';
    import { useStore } from 'vuex';
    import { RouterLink } from 'vue-router';
    import Swal from 'sweetalert2';
    import { Modal } from 'bootstrap/dist/js/bootstrap.bundle';
    import axios, { formToJSON } from 'axios';
    import my_modules from '@/lib/it_system_module';


    const store = useStore();


    const logoutUser = () => 
    {
        Swal.fire({
            icon: 'warning',
            title: "You sure?",
            text: "Are you sure you want to log out?",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes, i do!",
            cancelButtonText: "No, i don't sure"
        }).then((result) => {
            if (result.isConfirmed)
            {
                store.commit('updateUserDetails', {});
                store.commit('updateUserToken', '');
            }
        });
    }


    const createMeetingRoom = (e) => 
    {
        const formData = new FormData(e.target);

        my_modules.toggleSubmitButtonDisabledWithFormEl(e.target);
        
        axios({
            url: import.meta.env.VITE_VUE_API_URL + "/meeting_rooms/create",
            method: "POST",
            data: formData
        }).then((response) => {
            my_modules.sweetAlertReport(response.data, (err_data) => {
                // errors ...
            }, (data) => {
                // succ ...
                
                e.target.reset();
                Modal.getOrCreateInstance(document.getElementById('modalAddRoomMeeting')).hide();
                
                
                store.commit('updateMeetingRoomData');
                my_modules.toggleSubmitButtonDisabledWithFormEl(e.target);
                
            }, false, null, false, false);
        }).catch((err) => {
            console.error(err);
            
            my_modules.sweetAlertServerError();
        });
    }

    
    const createUserRole = (e) =>
    {
        const formData = new FormData(e.target);
        
        my_modules.toggleSubmitButtonDisabledWithFormEl(e.target);
        
        
        axios({
            url: import.meta.env.VITE_VUE_API_URL + "/user_roles/create",
            method: "POST",
            data: formData
        }).then((response) => {
            my_modules.sweetAlertReport(response.data, (err_data) => {
                // errors ...
            }, (succ_data) => {
                // succ ...
                e.target.reset();
                Modal.getOrCreateInstance(document.getElementById('modalAddUserPermission')).hide();
                my_modules.toggleSubmitButtonDisabledWithFormEl(e.target);
            }, false, (warn_data) => {
                // warn ...
            }, false, false);
        }).catch((err) => {
            console.error(err);


            my_modules.sweetAlertServerError();
        });
    }



    onMounted(() => {
        my_modules.addFirstFocusInputWithModalDomEl(document.getElementById('modalAddRoomMeeting'));
        my_modules.addFirstFocusInputWithModalDomEl(document.getElementById('modalAddUserPermission'));
    });
</script>
<style scoped>
    .profile-image
    {
        width: 30px;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
    }
</style>