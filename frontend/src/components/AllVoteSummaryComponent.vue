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


    const emits = defineEmits(['update_all_topics_score_persen']);

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
            }, (succ_data) => {
                // success ...

                // console.log("Succ Data => ");
                // console.log(succ_data.data);
                const value = Object.keys(succ_data.data.raw_data).map((row) => succ_data.data.raw_data[row]);
                // console.log(value);

                // let raw_data_assign = Object.assign({}, succ_data.data.raw_data);

                // const value = Object.values();
                reportData.value = value;
                is_render.value = true;


                emits('update_all_topics_score_persen', my_modules.calculatePercentage(5, reportData.value));

            }, false, (warn_data) => {
                // warnning ...
            }, false, true);
        }).catch((err) => {
            console.error(err);
        });
    }


    onMounted(() => {
        LoadReportData();
    });


</script>