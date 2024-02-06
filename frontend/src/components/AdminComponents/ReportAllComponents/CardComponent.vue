<template>
    <div class="card h-100 shadow">
        <div class="card-body h-100">
            <div class="px-3">
                <ReportChartComponent min-height="30" :data.sync="_data" v-if="is_render_chart" />
            </div><hr>
            <section class="container text-secondary">
                <h6>รหัสประชุม: {{ topic_id }}</h6>
                <h6>ประชุม: {{ topic_name }}</h6>
                <h6>รายละเอียด: {{ topic_details }}</h6>
                <hr>
                <h6>จำนวนผู้เข้าร่วม(คน): {{ people_count }}</h6>
                <h6>ความคืบหน้า: {{ progress_simple_text }}</h6>
                <hr>
                <!-- {{ props.data }} -->
                <div class="d-flex">
                    <div class="ms-auto">
                        <!-- <button type="button" class="btn btn-warning me-1">ดูรายละเอียด</button> -->
                        <button type="button" class="btn btn-success shadow" @click.prevent="ShareQrCode" :data-topic-id="topic_id">แชร์ให้เพื่อนๆ</button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script setup>
    import { defineProps, ref, onMounted, computed } from 'vue';
    import axios from 'axios';
    import my_modules from '@/lib/it_system_module';

    import ReportChartComponent from '@/components/ReportChartComponent.vue';

    const _data = ref([2, 3, 1, 2, 2, 4, 3, 5, 1, 1]);


    const props = defineProps({
        data: {
            type: Object
        }
    });


    const is_render_chart = ref(false);

    const topic_id = computed(() => props.data.id);
    const topic_name = computed(() => props.data.name);
    const topic_details = computed(() => props.data.details);
    const people_count = computed(() => props.data.people_count);
    const progress_simple_text = computed(() => props.data.progress_simple_text);



    const ShareQrCode = async (e) => 
    {
        const topic_id = e.target.getAttribute('data-topic-id'); 

        my_modules.ShareQrCodeTopicIdUrl(topic_id);
    }

    onMounted(() => {
        const formData = new FormData;
        formData.append("topic_id", topic_id.value);

        axios({
            url: import.meta.env.VITE_VUE_API_URL + "/meeting_topic/get_report_of_topic",
            method: "POST",
            data: formData
        }).then((response) => {
            console.log("Row => ");
            console.log(response);

            _data.value = Object.values(response.data.data.raw_data);
            is_render_chart.value = true;
        }).catch((err) => {
            console.error(err);
        });
    });
</script>