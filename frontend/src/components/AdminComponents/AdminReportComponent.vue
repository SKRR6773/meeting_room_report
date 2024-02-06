<template>
    <header>
        <h2 align="center" class="text-secondary mb-3">รายงานสรุปผลทั้งหมด</h2>
    </header>
    <section>
        <AllVoteSummaryComponent @report_rendered="report_rendered" />
    </section><hr>
    <section>
        <div class="container-fluid">
            <header>
                <h2 align="center" class="text-secondary mb-3">การประชุมทั้งหมด</h2>
            </header>
            <div class="row g-3 h-100">
                <div class="col-12 col-sm-6 col-md-4 h-100" v-for="(row, index) in all_topic_details" :key="index">
                    <div class="container bg-light shadow-sm m-0 p-0 h-100">
                        <CardComponent :data.sync="row" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import my_modules from '@/lib/it_system_module';



    import AllVoteSummaryComponent from '../AllVoteSummaryComponent.vue';
    import CardComponent from './ReportAllComponents/CardComponent.vue';



    const all_topic_details = ref([]);
    const is_render_child = ref(false);


    const LoadChildsDetails = () => 
    {
        axios({
            url: import.meta.env.VITE_VUE_API_URL + "/meeting_topic/get_all_topics",
            method: "POST"
        }).then((response) => {
    
            my_modules.sweetAlertReport(response.data, (err_data) => {
                // errors ...
            }, (succ_data) => {
                // success ...
                all_topic_details.value = succ_data.data;
            }, false, (warn_data) => {
                // warning ...
            }, false, true);
    
        }).catch((err) => {
            console.error(err);
        });
    }

    const report_rendered = () => 
    {
        is_render_child.value = true;
        LoadChildsDetails();
    }

    onMounted(() => {
    });

</script>