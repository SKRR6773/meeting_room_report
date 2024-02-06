<template>
    <div>
        <div class="container px-3 py-3" v-if="is_render">
            <header class="mb-4">
                <div class="d-flex">
                    <h1 class="mx-auto text-secondary header-title" style="text-decoration: underline;">รายงานสรุปผล</h1>
                </div>
            </header>
            <section>
                <div class="body">
                    <header>
                        <!-- <pre> -->
                            
                        <!-- </pre> -->
                        <HeaderInfomationCardComponent 
                            :progress_simple_text.sync="get_progress_simple_text" 
                            :this_topic_score_persen.sync="this_topic_score_persen" 
                            :all_topics_score_persen.sync="all_topics_score_persen" 
                        />
                    </header>
                    <section class="mt-4">
                        <ReportChartComponentVue :data.sync="reportData" />
                    </section>
                </div>
            </section>
        </div>
        
        <div class="container">
            <!-- <hr> -->
        </div>
        <!-- summary -->
        <!-- <div class="container px-3 py-3" v-if="is_render">
            <header class="mb-3">
                <div class="d-flex">
                    <h1 class="mx-auto text-secondary header-title" style="text-decoration: underline;">รายงานสรุปผลทั้งหมด</h1>
                </div>
            </header>
            <section>
                <AllVoteSummaryComponent @update_all_topics_score_persen="handleAllTopicsScorePersen" />
            </section>
        </div> -->
    </div>
</template>
<script setup>
    import { ref, defineProps, computed, onMounted } from 'vue';
    import { useStore } from 'vuex';

    import ReportChartComponentVue from './ReportChartComponent.vue';
    import axios from 'axios';
    import my_modules from '@/lib/it_system_module';
    import AllVoteSummaryComponent from './AllVoteSummaryComponent.vue';
    import HeaderInfomationCardComponent from './HeaderInfomationCardComponent.vue';


    const props = defineProps({
        meeting_topic_id: {
            type: Number
        }
    });


    const store = useStore();

    const is_render = ref(false);
    const reportData = ref([]);


    const this_topic_score_persen = computed(() => my_modules.calculatePercentage(5, reportData.value));
    const all_topics_score_persen = ref(0);

    const meeting_topic_id = computed(() => {
        return props.meeting_topic_id;
    });

    const get_progress_simple_text = computed(() => {
        return store.getters.getMeetingMetaData.filter((row) => {
            return row.id === props.meeting_topic_id;
        })[0].progress_simple_text;
    });


    const handleAllTopicsScorePersen = (value) => 
    {
        all_topics_score_persen.value = value;
    }

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

                store.commit('updateMeetingMetaData', () => {
                    is_render.value = true;
                    _LoadSummaryAllReportData();
                });

            }, false, (warn_data) => {
                // warning ...
            }, false, true);
        }).catch((err) => {
            console.error(err);


            my_modules.sweetAlertServerError();
        });
    }


    const _LoadSummaryAllReportData = () => 
    {
        axios({
            url: import.meta.env.VITE_VUE_API_URL + "/meeting_topic/get_report_all_topics",
            method: "POST"
        }).then((response) => {
            my_modules.sweetAlertReport(response.data, (err_data) => {
                // errors ...
            }, (succ_data) => {
                // success ...
                const value = Object.keys(succ_data.data.raw_data).map((row) => succ_data.data.raw_data[row]);
                handleAllTopicsScorePersen(my_modules.calculatePercentage(5, value));

            }, false, (warn_data) => {
                // warnning ...
            }, false, true);
        }).catch((err) => {
            console.error(err);
        });
    }

    onMounted(() => {
        // alert(meeting_topic_id.value);

        LoadReportData();
    });

</script>