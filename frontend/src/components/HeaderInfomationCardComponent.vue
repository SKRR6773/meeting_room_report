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
                            <h1 class="mx-auto text-info"><a href="#" data-bs-target="#modalShowAllReportTopics" data-bs-toggle="modal" @click="is_render_admin_report = true">{{ get_all_topics_score_persen }}%</a></h1>
                            <h6 class="mx-auto text-secondary" align="center">ค่าเฉลี่ยคะแนนโหวตทั้งหมด</h6>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="carousel slide carousel-dark" id="carouselCardIndicators" data-bs-ride="carousel">
                <div class="carousel-indicators visually-hidden">
                    <button type="button" data-bs-target="#carouselCardIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselCardIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselCardIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="5000">
                        <div class="card shadow-custom h-100 mx-5">
                            <div class="card-body d-flex" style="flex-direction: column;">
                                <h1 class="mx-auto text-warning">{{ get_progress_simple_text }}</h1>
                                <h6 class="mx-auto text-secondary" align="center">จำนวนที่โหวต (คน)</h6>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item" data-bs-interval="5000">
                        <div class="card shadow-custom h-100 mx-5">
                            <div class="card-body d-flex" style="flex-direction: column;">
                                <h1 class="mx-auto text-success">{{ get_this_topic_score_persen }}%</h1>
                                <h6 class="mx-auto text-secondary" align="center">ค่าเฉลี่ยคะแนนโหวต</h6>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item" data-bs-interval="5000">
                        <div class="card shadow-custom h-100 mx-5">
                            <div class="card-body d-flex" style="flex-direction: column;">
                                <h1 class="mx-auto text-info">{{ get_all_topics_score_persen }}%</h1>
                                <h6 class="mx-auto text-secondary" align="center">ค่าเฉลี่ยคะแนนโหวตทั้งหมด</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselCardIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselCardIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div> -->
        </div>


        <div class="modal fade" id="modalShowAllReportTopics" tabindex="-1" ref="modalShowAllReportTopics">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">หน้ารายงานสรุปผลทั้งหมด</h5>
                        <button type="button" class="btn-close" data-bs-target="#modalShowAllReportTopics" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <AdminReportComponent @updateMeetingCount="(value) => meeting_count = value" v-if="is_render_admin_report" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="container-fluid h-100">
                            <div class="d-flex" style="justify-content: space-between;">
                                <div class="my-auto d-flex text-center justify-content-center align-items-center">
                                    <h5 class="fw-bold text-secondary my-auto">ทั้งหมด <span class="badge bg-secondary fw-bold">{{ meeting_count }}</span> ประชุม</h5>
                                </div>
                                <div>
                                    <button type="button" class="btn btn-secondary px-3" data-bs-toggle="#modalShowAllReportTopics" data-bs-dismiss="modal">ปิด</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { computed, defineProps, ref, onMounted } from 'vue';

    import AdminReportComponent from './AdminComponents/AdminReportComponent.vue';


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



    const modalShowAllReportTopics = ref();
    const is_render_admin_report = ref(false);

    const get_progress_simple_text = computed(() => props.progress_simple_text);
    const get_this_topic_score_persen = computed(() => props.this_topic_score_persen.toFixed(2));
    const get_all_topics_score_persen = computed(() => props.all_topics_score_persen.toFixed(2));
    const meeting_count = ref(0);


    onMounted(() => {

        modalShowAllReportTopics.value.addEventListener('hidden.bs.modal', () => {
            is_render_admin_report.value = false;
        });
    }); 
</script>