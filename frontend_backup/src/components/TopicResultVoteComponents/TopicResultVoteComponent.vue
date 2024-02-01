<template>
    <div class="mt-3 mb-5">
        <form>
            <div class="bg-light px-3 py-4">
                <header>
                    <div class="header d-flex mb-3">
                        <h1 class="mx-auto text-secondary header-title">รายงานการประเมิน</h1>
                    </div>
                </header>
                <section>

                    <!-- {{ $route.params.topic_id }} -->

                    <div v-if="is_render">
                        <ChartResultComponent :data="data" />
                    </div>

                </section>
                <footer>

                </footer>
            </div>
        </form>
    </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import ChartResultComponent from './ChartResultComponent.vue';
    import axios from 'axios';
    import my_modules from '../../lib/it_system_module';



    const route = useRoute();


    const is_render = ref(false);
    const data = ref([]);

    const LoadReportData = () =>{
        return _LoadReportData(route.params.topic_id);
    };

    const _LoadReportData = (topic_id) =>
    {
        const formData = new FormData;
        formData.append("topic_id", topic_id);


        axios({
            url: import.meta.env.VITE_VUE_API_URL + "/meeting_topic/get_report_of_topic",
            method: "POST",
            data: formData
        }).then((response) => {


            my_modules.sweetAlertReport(response.data, () => {
                // errors ...
            }, () => {
                // succ ...
                data.value = Object.values(response.data.data.raw_data);
    
                is_render.value = true;
            }, false, () => {
                // warning ...
            }, false, true);
        }).catch((err) => {
            console.error(err);


            my_modules.sweetAlertServerError();
        });
    }

    onMounted(() => {
        LoadReportData();
    });
</script>