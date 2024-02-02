<template>
    <div>
        <div class="container-fluid">
            <div class="row gy-3">
                <div class="col-12 col-sm-6 col-lg-4 border border-0">
                    <div class="card shadow-custom h-100">
                        <div class="card-body d-flex" style="flex-direction: column;">
                            <h1 class="mx-auto text-warning">{{ get_progress_simple_text }}</h1>
                            <h6 class="mx-auto text-secondary" align="center">จำนวนที่โหวต (คน)</h6>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-lg-4 border border-0">
                    <div class="card shadow-custom h-100">
                        <div class="card-body d-flex" style="flex-direction: column;">
                            <h1 class="mx-auto text-success">{{ get_this_topic_score_persen }}%</h1>
                            <h6 class="mx-auto text-secondary" align="center">ค่าเฉลี่ยคะแนนโหวต</h6>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-12 col-lg-4 border border-0">
                    <div class="card shadow-custom h-100">
                        <div class="card-body d-flex" style="flex-direction: column;">
                            <h1 class="mx-auto text-info">{{ get_all_topics_score_persen }}%</h1>
                            <h6 class="mx-auto text-secondary" align="center">ค่าเฉลี่ยคะแนนโหวตทั้งหมด</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { computed, defineProps } from 'vue';


    const props = defineProps({
        progress_simple_text: {
            type: String
        },
        this_topic_score_persen: {
            type: Number
        },
        all_topics_score_persen: {
            type: Number
        }
    });


    const get_progress_simple_text = computed(() => props.progress_simple_text);
    const get_this_topic_score_persen = computed(() => props.this_topic_score_persen.toFixed(2));
    const get_all_topics_score_persen = computed(() => props.all_topics_score_persen.toFixed(2));
</script>