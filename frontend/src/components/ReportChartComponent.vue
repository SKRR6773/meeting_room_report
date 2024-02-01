<template>
    <div>
        <!-- {{ props.data }} -->
        <!-- <header v-if="is_render_header">
            <div v-for="(row, index) in store.getters.getSimpleQuestionData">
                <p style="font-size: 14px;">{{ "ข้อที่ " + row.id.toString() +  " คือ " + row.question_text }}</p>
            </div>
        </header> -->
        <section>
            <div style="min-height: 60vh;">
                <Bar :data="data" :options="options" />
            </div>
        </section>
    </div>
</template>
<script setup>
    import { ref, defineProps, onMounted } from 'vue';
    import 
    { 
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        BarElement,
        CategoryScale,
        LinearScale
    } from 'chart.js';
    import { Bar } from 'vue-chartjs';
    import axios from 'axios';
    import { useStore } from 'vuex';
    

    const props = defineProps({
        data: {
            type: Array
        }
    });
    const store = useStore();

    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


    // const is_render_header = ref(false);
    const questionData = ref([]);
    const questionSimpleData = ref((() => {
            let data = [];
            for (let i=1; i < 11; i++)
            {
                data.push(`ข้อที่ ${i}`);
            }

            return data;
    })());

    const data = ref({
        labels: questionSimpleData.value,
        datasets: [
            {
            label: 'คะแนนโหวต',
            backgroundColor: '#f87979',
            data: props.data
            }
        ]
    });

    const options = ref({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                max: 5
            }
        }
    });


    onMounted(() => {
        // store.commit('updateSimpleQuestionData', (data) => {
        //     if (data)
        //     {
        //         is_render_header.value = true;
        //     }
        // }); 
    });

</script>