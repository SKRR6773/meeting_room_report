<template>
    <div>
        <form @submit.prevent="Submit" method="post">
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
                            <select class="form-select" name="room_id">
                                <option v-for="(row, index) in $store.getters.getMeetingRoomData" :value="row.id" :key="index">{{ row.name }}</option>
                            </select>
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
</template>
<script setup>
    import { defineEmits } from 'vue';

    const emits = defineEmits(['submit']);


    const Submit = (e) => {
        emits('submit', e);
    };
</script>