<template>
    <div>
        <div class="px-1 py-1">
            <table class="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ชื่อประชุม</th>
                        <th class="text-center">สถานะ</th>
                        <th>ทำแบบประเมิน</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="_data.length === 0">
                        <td colspan="4" align="center">ไม่มีห้องประชุม</td>
                    </tr>
                    <tr v-for="(row, index) in _data" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ row.name }}</td>
                        <td class="text-center"><span class="badge fs-7" :class="convBadgeClassName(row.status_name)">{{ row.status_name }}</span></td>
                        <td class="text-center">
                            <div class="btn-group shadow-custom" style="background: transparent;">
                                <button type="button" class="btn btn-warning" :data-topic-id="row.id" @click="toTopic" :disabled="row.is_closed || row.status_name === 'voted'">
                                    เลือก
                                </button>
                                <button type="button" class="btn btn-success position-relative" :data-topic-id="row.id" @click.prevent="ShareQrCode">แชร์
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share pt-none" viewBox="0 0 16 16">
                                        <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"/>
                                    </svg>
                                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light" v-if="row.is_new">
                                        new
                                    </span>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
    import { computed, defineProps, defineEmits } from 'vue';
    import { useRouter } from 'vue-router';
    import my_modules from '../../lib/it_system_module';


    


    const emits = defineEmits(['topic-selected']);


    const props = defineProps({
        data: {
            type: Array
        }
    });

    const _data = computed(() => props.data);


    const toTopic = (e) => 
    {
        const topic_id = e.target.getAttribute('data-topic-id');

        emits('topic-selected', topic_id);
    }

    const convBadgeClassName = (status_name) => {
        let _result;


        switch (status_name) 
        {
            case "publish":
                _result = "text-bg-primary";
                break;


            case "voted":
                _result = "text-bg-secondary";
                break;

            case "vote-closed":
                _result = "text-bg-danger";
                break

            default: // { 'text-bg-primary': row.status_name === 'publish', 'text-bg-danger': row.status_name === 'vote-closed'}
                _result = "text-bg-danger";
                break;
        }


        return _result;
    };

    const ShareQrCode = async (e) => 
    {
        const topic_id = e.target.getAttribute('data-topic-id'); 

        my_modules.ShareQrCodeTopicIdUrl(topic_id);
    };
</script>