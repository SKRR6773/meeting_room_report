<template>
    <div class="rounded-3 text-light">
        <div class="main-image-thumbnail rounded-3" style="position: relative;" :style="{ 'background-image': 'url(' + backgroundPosterImage + ')' }" >
            <div class="overlay">
                <div class="d-flex px-3" style="justify-content: space-between; flex-direction: column; height: 100%;">
                    <header class="py-3 mb-auto">
                        <div class="header d-flex mb-3">
                            <h2 class="mx-auto text-light header-title fw-bold" align="center">แบบประเมินการสื่อสารและความร่วมมือ</h2>
                        </div>
                    </header>
                    <section class="mt-auto d-flex" style="justify-content: space-between;">
                        <!-- {{ topicData }} -->
                        <div class="left">
                            <h6>รหัสประชุม: {{ topicData.id }}</h6>
                            <h6>ชื่อประชุม: {{ topicData.name }}</h6>
                            <h6>รายละเอียด: {{ topicData.details }}</h6>
                            <h6>จำนวนผู้เข้าร่วม: {{ topicData.people_count }} คน</h6>
                            <h6>โหวตไปแล้ว: {{ topicData.voted_count }} คน</h6>
                        </div>
                        <div class="right d-flex">
                            <h3 class="mt-auto fw-bold">
                                {{ get_total_score }}/50 คะแนน
                            </h3>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { defineProps, computed } from 'vue';
    import backgroundPosterImage from '../assets/backgroup_header.png';



    const props = defineProps({
        topicData: {
            type: Object
        },
        totalScore: {
            type: Number
        }
    });


    const get_total_score = computed(() => props.totalScore);


    const topicData = computed(() => props.topicData);


</script>
<style scoped>
    .main-image-thumbnail
    {
        width: 100%;
        min-height: 35vh;
        object-fit: cover;
        background-attachment: fixed;
        overflow: hidden;
        background-position: 0;
    }

    .overlay
    {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.45);
    }

</style>