<template>
    <div>
        <div class="container px-3 py-3" v-if="is_render">
            <header class="mb-3">
                <div class="d-flex">
                    <h1 class="mx-auto text-secondary header-title">รายงานสรุปผล</h1>
                </div>
            </header>
            <section>
                <ReportChartComponentVue :data.sync="reportData" />
            </section>
        </div>
    </div>
</template>
<script setup>
    import { ref, defineProps, computed, onMounted } from 'vue';

    import ReportChartComponentVue from './ReportChartComponent.vue';
    import axios from 'axios';
    import my_modules from '@/lib/it_system_module';


    const props = defineProps({
        meeting_topic_id: {
            type: Number
        }
    });



    const is_render = ref(false);
    const reportData = ref([]);

    const meeting_topic_id = computed(() => {
        return props.meeting_topic_id;
    });

    const LoadReportData = () => 
    {
        _LoadReportData(meeting_topic_id.value);
    }

    const _LoadReportData = (topic_id) => 
    {
        const formData = new FormData;
        formData.append("topic_id", topic_id);


        axios({
            url: import.meta.env.VITE_VUE_API_URL + "/meeting_topic/get_report_of_topic",
            method: "POST",
            data: formData
        }).then((response) => {

            my_modules.sweetAlertReport(response.data, (err_data) => {
                // errors...
            }, (succ_data) => {
                // success...

                reportData.value = Object.keys(succ_data.data.raw_data).map((row) => succ_data.data.raw_data[row]);

                console.log("Report Data => ");
                console.log(reportData.value);

                is_render.value = true;
            }, false, (warn_data) => {
                // warning ...
            }, false, true);
        }).catch((err) => {
            console.error(err);


            my_modules.sweetAlertServerError();
        });
    }

    onMounted(() => {
        // alert(meeting_topic_id.value);

        LoadReportData();
    });

</script>