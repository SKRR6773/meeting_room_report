<template>
    <div class="rounded-3 text-light">
        <div class="main-image-thumbnail rounded-3" style="position: relative;" :style="{ 'background-image': 'url(' + backgroundPosterImage + ')' }" >
            <div class="overlay">
                <div class="d-flex px-3" style="justify-content: space-between; flex-direction: column; height: 100%;">
                    <header class="py-3 mb-auto">
                        <div class="header d-flex mb-3">
                            <h1 class="mx-auto text-light header-title" align="center">แบบประเมินการสื่อสารและความร่วมมือ</h1>
                        </div>
                    </header>
                    <section class="mt-auto">
                        <!-- {{ topicData }} -->
                        <h5>รหัสประชุม: {{ topicData.id }}</h5>
                        <h5>ชื่อประชุม: {{ topicData.name }}</h5>
                        <h5>รายละเอียด: {{ topicData.details }}</h5>
                        <h5>จำนวนผู้เข้าร่วม: {{ topicData.people_count }} คน</h5>
                        <h5>โหวตไปแล้ว: {{ topicData.voted_count }} คน</h5>
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
        }
    });



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