<template>
    <div class="mt-3 bg-light">
        <div class="bg-light px-3 py-4">
            <header>
                <div class="d-flex justify-content-between mb-2">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12 col-md-6">
                                <div class="form">
                                    <div class="mb-1 input-group">
                                        <div class="d-flex">
                                            <span class="input-group-text">ชื่อประชุม: </span>
                                            <div class="d-block w-100" style="position: relative;">
                                                <input type="text" class="form-control cursor-pointer" :class="{'is-valid': can_vote, 'is-invalid': !can_vote}" @click.prevent.stop="MeetingChange" placeholder="สร้างหรือเลือกประชุม" :value="meeting_name" ref="inputMeetingName" />
                                                <!-- <span style="position: absolute; top: 50%; right: 0; transform: translate(-10px, -50%);" class="text-secondary pt-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down" viewBox="0 0 16 16">
                                                        <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659"/>
                                                    </svg>
                                                </span> -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="input-group" hidden>
                                        <span class="input-group-text">ชื่อห้องประชุม: </span>
                                        <input type="text" class="form-control" :value="props.meeting_room_name" disabled />
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="d-flex">
                                    <h3 class="ms-auto mt-auto"> 
                                        {{ tweened.number.toFixed(0) }}/{{ totalScore }} คะแนน
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
    
            <form method="post" @submit.prevent="Submit" ref="_formEl">
                <div class="form-body">
                    <section>
                        <table class="table table-light table-bordered" style="position: relative;">
                            <thead style="position: sticky; top: 0;">
                                <tr>
                                    <th rowspan="2" class="text-center align-items-center fs-5" style="align-items: center; text-align: center; justify-content: center;">รายการ</th>
                                    <th colspan="5" class="text-center">ระดับความคิดเห็นด้วย 1น้อยสุด - 5มากสุด</th>
                                </tr>
                                <tr>
                                    <th class="text-center" @click="SelectAllRowOfCol(1)">1</th>
                                    <th class="text-center" @click="SelectAllRowOfCol(2)">2</th>
                                    <th class="text-center" @click="SelectAllRowOfCol(3)">3</th>
                                    <th class="text-center" @click="SelectAllRowOfCol(4)">4</th>
                                    <th class="text-center" @click="SelectAllRowOfCol(5)">5</th>
                                </tr>
                            </thead>
                            <tbody ref="tbodyEl">
                                <tr v-for="(row, index) in getSimpleQuestions" :key="index">
                                    <td>{{ (index + 1).toString() }} {{ ').' }} {{ row.question_text }}</td>
                                    <td class="text-center" @click="tdClickOnRadioFrame"><input type="radio" :name="'radio_' + index.toString()" class="form-check-input fs-5" :data-question-id="row.id" :data-score="1" :value="row.id" @click="checkUpScore" ref="radioEls" required :disabled="!can_vote" /></td>
                                    <td class="text-center" @click="tdClickOnRadioFrame"><input type="radio" :name="'radio_' + index.toString()" class="form-check-input fs-5" :data-question-id="row.id" :data-score="2" :value="row.id" @click="checkUpScore" ref="radioEls" required :disabled="!can_vote" /></td>
                                    <td class="text-center" @click="tdClickOnRadioFrame"><input type="radio" :name="'radio_' + index.toString()" class="form-check-input fs-5" :data-question-id="row.id" :data-score="3" :value="row.id" @click="checkUpScore" ref="radioEls" required :disabled="!can_vote" /></td>
                                    <td class="text-center" @click="tdClickOnRadioFrame"><input type="radio" :name="'radio_' + index.toString()" class="form-check-input fs-5" :data-question-id="row.id" :data-score="4" :value="row.id" @click="checkUpScore" ref="radioEls" required :disabled="!can_vote" /></td>
                                    <td class="text-center" @click="tdClickOnRadioFrame"><input type="radio" :name="'radio_' + index.toString()" class="form-check-input fs-5" :data-question-id="row.id" :data-score="5" :value="row.id" @click="checkUpScore" ref="radioEls" required :disabled="!can_vote" /></td>
                                </tr>
                            </tbody>
                        </table>
    
                        <div class="__secret__ d-none">
                            <input type="hidden" name="topic_id" :value="props.meeting_topic_id">
                        </div>
    
                    </section>
                    <footer class="d-flex">
                        <div class="ms-auto">
                            <button type="reset" class="btn btn-secondary me-1" :disabled="!can_vote">ล้างค่า</button>
                            <button type="submit" class="btn btn-primary ms-auto" autofocus :disabled="!can_vote">
                                <span class="spinner-grow spinner-grow-sm spinner visually-hidden"></span>
                                ส่งแบบฟอร์ม
                            </button>
                        </div>
                    </footer>
                </div>
            </form>
        </div>


        <div class="modal fade" ref="modalSelectMeeting" data-bs-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">สร้างหรือเลือกการประชุม</h5>

                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <header>
                            <div class="d-flex">
                                <button type="button" class="btn btn-primary ms-auto" data-bs-target="#modalCreateMeeting" data-bs-toggle="modal"><i class="bi bi-plus-lg"></i> เพิ่มประชุม</button>
                            </div>
                        </header>
                        <section class="mt-2">
                            <TableTopicComponent 
                                :data.sync="getMeetingMetaData"  
                                @topic-selected="ChangeTopic"
                            />
                        </section>
                        <!-- {{ getMeetingMetaData }} -->
                    </div>
                </div>
            </div>
        </div>


        <div class="modal fade" ref="modalCreateMeeting" id="modalCreateMeeting" data-bs-backdrop="static">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">สร้างการประชุม</h5>

                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <CreateMeetRoomTopicFormComponent @canceled="CreateMeetingTopics(false)" @submit="CreateMeetingTopics" />
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup>
    import { ref, reactive, defineProps, defineEmits, watch, computed, onMounted } from 'vue';
    import { useStore } from 'vuex';
    import gsap from 'gsap';
    import my_modules from '@/lib/it_system_module';
    import Swal from 'sweetalert2';
    import { Modal } from 'bootstrap/dist/js/bootstrap.bundle';

    import TableTopicComponent from '../TopicTableComponent/TableTopicComponent.vue';
    import CreateMeetRoomTopicFormComponent from '../FormComponents/CreateMeetRoomTopicFormComponent.vue';
    import axios from 'axios';


    const props = defineProps({
        meeting_topic_id: {
            type: Number
        },
        meeting_name: {
            type: String
        },
        meeting_room_name: {
            type: String
        },
        can_vote: {
            type: Boolean
        }
    });
    const emits = defineEmits(['submit', 'topic-selected']);
    const store = useStore();

    const radioEls = ref();
    const tbodyEl = ref();
    const tweened = reactive({
        number: 0
    });
    const totalScore = ref(0);
    const checkedUp = ref({});

    const modalSelectMeeting = ref();
    const modalCreateMeeting = ref();

    const inputMeetingName = ref();
    const _formEl = ref();


    // props computed
    const meeting_name = computed(() => props.meeting_name);

    const can_vote = computed(() => {
        return props.can_vote;
    });

    const getMeetingMetaData = computed(() => {
        return store.getters.getMeetingMetaData;
    });

    const getSimpleQuestions = computed(() => {
        return store.getters.getSimpleQuestionData ? store.getters.getSimpleQuestionData : [];
    });

    const getTotalScoreChecked = computed(() => {
        return Object.values(checkedUp.value).reduce((curr, row) => {
            curr += row;
            return curr;
        }, 0);
    });

    const ChangeTopic = (e) => emits('topic-selected', {cb: (response_data) => {
        if (response_data.status)
        {
            Modal.getOrCreateInstance(modalSelectMeeting.value).hide();
            _formEl.value.reset();
        }

    }, topic_id: e});

    const CreateMeetingTopics = (is_create=true) =>
    {
        console.log("Clicked!");
        if (!is_create)
        {
            Modal.getOrCreateInstance(modalCreateMeeting.value).hide();
            Modal.getOrCreateInstance(modalSelectMeeting.value).show();
            
            return 0;
        }

        
        const e = is_create;
        
        const formData = new FormData(e.target);
        
        
        axios({
            url: import.meta.env.VITE_VUE_API_URL + "meeting_topic/create_topic",
            method: "POST",
            data: formData
        }).then((response) => {
            my_modules.sweetAlertReport(response.data, (err_data) => {
                // errors ...
            }, (succ_data) => {
                // success ...

                // clear form
                console.log("Clear => ");
                is_create.target.reset();

                // console.log("Response Data => ");
                store.commit('updateMeetingMetaData');
                
                my_modules.ShareQrCodeTopicIdUrl(succ_data.data.topic_id, () => {
                    Modal.getOrCreateInstance(modalCreateMeeting.value).hide();
                    Modal.getOrCreateInstance(modalSelectMeeting.value).show();
                });
                
            }, false, (warn_data) => {
                // warning ...
            });
        }).catch((err) => {
            console.error(err);


            my_modules.sweetAlertServerError();
        });
    }

    const MeetingChange = (e) => 
    {
        e.target.blur();
        Modal.getOrCreateInstance(modalSelectMeeting.value).show();
    }

    const Submit = (e) => 
    {

        my_modules.toggleSubmitButtonDisabledWithFormEl(e.target);

        const _form = e.target;
        const result = radioEls.value.filter((row) => {
            return row.checked;
        }).map((row) => {
            console.log(row);
            const questionId = Number.parseInt(row.getAttribute('data-question-id'));
            const score = Number.parseInt(row.getAttribute('data-score'));
            
            return {
                questionId,
                score
            };
        });


        return emits('submit', {
            form: _form,
            values: result,
            cb_toggle_submit_disabled: () => my_modules.toggleSubmitButtonDisabledWithFormEl(e.target)
        });
    }

    

    const SelectAllRowOfCol = (col) =>
    {
        tbodyEl.value.querySelectorAll("input[type=radio]").forEach((row) => {
            if (row.getAttribute('data-score') === col.toString())
            {
                row.click();
                row.focus();
            }
        });
    }

    const checkUpScore = (e) => 
    {
        const dataQuestionId = Number.parseInt(e.target.getAttribute('data-question-id'));
        const dataScore = Number.parseInt(e.target.getAttribute('data-score'));
        
        checkedUp.value[dataQuestionId] = dataScore;
    }

    const tdClickOnRadioFrame = (e) => 
    {
        const _radioBtn = e.target.querySelector('input[type=radio]');

        if (_radioBtn)
        {
            _radioBtn.focus();
            _radioBtn.click();
        }
    }

    watch(getTotalScoreChecked, (n) => {
        gsap.to(tweened, { duration: 0.5, number: Number(n) || 0});
    });

    watch(getSimpleQuestions, (newVal) => {
        totalScore.value = 0;

        Object.values(newVal).forEach((row) => {
            totalScore.value += 5;
        });
    });

    onMounted(() => {

        my_modules.addFirstFocusInputWithModalDomEl(modalCreateMeeting.value);

        store.commit('updateSimpleQuestionData', function(data){
            console.log(data);
        });

        store.commit('firstUpdateMeetingMetaData', (response_data) => {
            my_modules.sweetAlertReport(response_data, (err_data) => {
                // errors ...
            }, (succ_data) => {
                // succ ...
            }, false, (warn_data) => {
                // warning ...
            }, false, true);
        });
    });

</script>
<style scoped>
    input[type=radio].form-check-input
    {
        cursor: pointer;
    }
</style>