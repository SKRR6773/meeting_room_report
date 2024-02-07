<template>
    <div>
        <form @submit.prevent="Submit" method="post" ref="_form">
            <div class="container-fluid">
                <!-- <p class="text-secondary" style="font-weight: 500;">แจ้งให้เราทราบคำถาม ข้อเสนอแนะ และข้อกังวลของคุณโดยกรอกแบบฟอร์ม</p> -->
                <div class="row gy-3">
                    <div class="col-md-12 col-lg-6">
                        <div class="form-floating">
                            <input type="text" name="name" class="form-control" placeholder="ชื่อประชุม" required @keydown="next2people">
                            <label for="floatingPassword">ชื่อประชุม</label>
                        </div>
                    </div>
                    <!-- <div class="col-md-6 col-lg-4">
                        <div class="form-floating">
                            <select class="form-select" name="room_id">
                                <option v-for="(row, index) in $store.getters.getMeetingRoomData" :value="row.id" :key="index">{{ row.name }}</option>
                            </select>
                            <label for="floatingPassword">ห้องประชุม</label>
                        </div>
                    </div> -->
                    <div class="col-md-6 col-lg-6">
                        <div class="form-floating">
                            <input type="number" min="1" name="people_count" class="form-control" placeholder="จำนวนผู้เข้าร่วม" value="1" required ref="people_count_el" @keydown="next2details" />
                            <label for="floatingPassword">จำนวนผู้เข้าร่วม</label>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-floating">
                            <textarea class="form-control" name="details" placeholder="รายละเอียด (ไม่จำเป็น)" style="height: 30vh;" @keydown="chkShortCut" ref="details_el"></textarea>
                            <label for="floatingTextarea2">รายละเอียด *(ไม่จำเป็น)</label>
                        </div>
                    </div>
                </div>
                <div class="d-flex mt-3">
                    <div class="ms-auto">
                        <button type="button" class="btn btn-secondary px-4 py-2 fw-bold rounded-1 me-1" @click.prevent="Cancel">ยกเลิก</button>
                        <button type="submit" class="btn btn-primary px-4 py-2 fw-bold rounded-1" ref="_submitBtn">สร้าง</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script setup>
    import { ref, defineEmits } from 'vue';

    const emits = defineEmits(['submit', 'canceled']);

    const _form = ref();
    const _submitBtn = ref();

    const people_count_el = ref();
    const details_el = ref();


    const Submit = (e) => {
        emits('submit', e);
    };

    const Cancel = (e) => {
        emits('canceled', e);
    };


    const chkShortCut = (e) => 
    {
        if (e.ctrlKey && e.key === "Enter")
        {
            _submitBtn.value.click();
        }
    };


    const next2people = (e) => 
    {
        if (e.keyCode === 13)
        {
            e.preventDefault();
            people_count_el.value.focus();
        }
    }
    
    const next2details = (e) => 
    {
        if (e.keyCode === 13)
        {
            e.preventDefault();
            details_el.value.focus();
        }
    }
</script>