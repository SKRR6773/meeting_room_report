<template>
    <div>
        <div v-if="is_render">
            <ReportChartComponent :data.sync="reportData" />
        </div>
    </div>
</template>
<script setup>
    import { ref, defineEmits, onMounted } from 'vue';
    import axios from 'axios';
    import my_modules from '../lib/it_system_module';

    import ReportChartComponent from './ReportChartComponent.vue';


    const emits = defineEmits(['update_all_topics_score_persen', 'report_rendered']);

    const is_render = ref(false);

    const reportData = ref();


    const LoadReportData = () => 
    {
        _LoadReportData();
    }

    const _LoadReportData = () => 
    {
        axios({
            url: import.meta.env.VITE_VUE_API_URL + "/meeting_topic/get_report_all_topics",
            method: "POST"
        }).then((response) => {
            console.log("Response => ");
            console.log(response);

            my_modules.sweetAlertReport(response.data, (err_data) => {
                // errors ...
                emits('report_rendered', false);
            }, (succ_data) => {
                // success ...
                const value = Object.keys(succ_data.data.raw_data).map((row) => succ_data.data.raw_data[row]);
                reportData.value = value;
                is_render.value = true;


                emits('update_all_topics_score_persen', my_modules.calculatePercentage(5, reportData.value));
                emits('report_rendered', true);
                
            }, false, (warn_data) => {
                // warnning ...
                emits('report_rendered', false);
            }, false, true);
        }).catch((err) => {
            emits('report_rendered', false);
            console.error(err);
        });
    }


    onMounted(() => {
        LoadReportData();
    });


</script>