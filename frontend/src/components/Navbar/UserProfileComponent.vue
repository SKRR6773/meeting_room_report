<template>
    <div class="btn-group">
        <button type="button" class="btn">
            <img :src="$store.getters.getUserDetails.E_ImagePath" alt="" class="profile-image" />
        </button>
        <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu">
            <li><h6 class="dropdown-header">{{ 'คุณ ' +  $store.getters.getUserDetails.LocalFirstName + ' ' + $store.getters.getUserDetails.LocalLastName }}</h6></li>
            <li><a class="dropdown-item" href="#">เพิ่มห้องประชุม</a></li>
            <li><a class="dropdown-item" href="#">กำหนดสิทธิ์ของผู้ใช้</a></li>
            <li><a class="dropdown-item" href="#">ดูรายงาน</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" @click="logoutUser">ออกจากระบบ</a></li>
        </ul>
    </div>
</template>
<script setup>
    import { useStore } from 'vuex';
    import Swal from 'sweetalert2';


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
</script>
<style scoped>
    .profile-image
    {
        width: 30px;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
    }
</style>