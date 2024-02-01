<template>
    <div class="bg-light shadow">
        <div class="bg-light px-3 py-4">
            <header>
                <div class="header d-flex mb-3">
                    <h1 class="mx-auto text-secondary header-title">รายงานทั้งหมด</h1>
                </div>
                <div class="tooltop">
                    
                </div>
            </header>
            <section>
                <div class="container-fluid">
                    <div class="row g-2">
                        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2" v-for="(row, index) in all_topic_data">
                            <CardComponent :data="row" :key="index" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import my_modules from '@/lib/it_system_module';


    import CardComponent from '../../../components/AdminComponents/ReportAllComponents/CardComponent.vue';


    const all_topic_data = ref([]);

    const LoadAllTopicsInfomation = () =>
    {
        axios({
            url: import.meta.env.VITE_VUE_API_URL + "/meeting_topic/get_all_topics",
            method: 'POST'
        }).then((response) => {


            my_modules.sweetAlertReport(response.data, (err_data) => {
                // errors ...
            }, (succ_data) => {
                // success ...

                all_topic_data.value = succ_data.data;

            }, false, (warn_data) => {
                // warning ...
            }, false, true);
        }).catch((err) => {
            console.error(err);


        });
    }

    onMounted(() => {
        LoadAllTopicsInfomation();
    });
</script>