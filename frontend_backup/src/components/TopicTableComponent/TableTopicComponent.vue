<template>
    <div>
        <div class="px-3 py-4">
            <table class="table table-light">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ชื่อประชุม</th>
                        <th>ชื่อห้องประชุม</th>
                        <th class="text-center">ความคืบหน้า</th>
                        <th class="text-center">จำนวนผู้เข้าร่วม</th>
                        <th>สถานะ</th>
                        <th>ทำแบบประเมิน</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in _data" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ row.name }}</td>
                        <td>{{ row.room_name }}</td>
                        <!-- <td align="center">{{ row.progress_simple_text }}</td> -->
                        <td><ProgressbarCompoennt :full_progre="row.people_count" :curr_progre="row.voted_count" :text="row.voted_count.toString() + ' คน'" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;" /></td>
                        <td align="center">{{ row.people_count }}</td>
                        <td align="start"><span class="badge fs-7" :class="{ 'text-bg-primary': row.status_name === 'publish', 'text-bg-danger': row.status_name === 'vote-closed'}">{{ row.status_name }}</span></td>
                        <td><button type="button" class="btn btn-warning shadow-custom" :data-topic-id="row.id" @click="toTopic" :disabled="row.is_closed">แบบประเมิน</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    import axios from 'axios';
    import my_modules from '@/lib/it_system_module';

    // progressbar
    import ProgressbarCompoennt from '../CustomComponent/ProgressbarComponent.vue';


    const router = useRouter();


    const _data = ref([]);

    const _LoadAllTopicsData = () => 
    {
        axios({
            url: import.meta.env.VITE_VUE_API_URL + "/meeting_topic/get_all_topics",
            method: "POST"
        }).then((response) => {
            my_modules.sweetAlertReport(response.data, function(){

            }, function(){
                _data.value = response.data.data;
            }, false, null, false, true);
        }).catch((err) => {
            console.error(err);

            return setTimeout(() => _LoadAllTopicsData(), 300);
        });
    }

    const toTopic = (e) => 
    {
        const topic_id = e.target.getAttribute('data-topic-id');

        console.log(topic_id);
        router.push(`/topic/${topic_id}`);
        // <router-link :to="'/topic/' + row.id" class="btn btn-warning shadow-custom">แบบประเมิน</router-link>
    }

    onMounted(() => {
        _LoadAllTopicsData();
    });
</script>