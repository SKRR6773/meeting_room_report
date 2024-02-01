<template>
    <div class="mt-3">
        <form method="post" @submit.prevent="Submit">
            <div class="bg-light px-3 py-4">
                <header>
                    <div class="header d-flex mb-3">
                        <h1 class="mx-auto text-secondary header-title">ประเมินความพึงพอใจ</h1>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        <div>
                            <div class="form">
                                <div class="mb-1 input-group">
                                    <span class="input-group-text">ชื่อประชุม: </span>
                                    <input type="text" class="form-control" :value="props.meeting_name" disabled />
                                </div>
                                <div class="input-group" hidden>
                                    <span class="input-group-text">ชื่อห้องประชุม: </span>
                                    <input type="text" class="form-control" :value="props.meeting_room_name" disabled />
                                </div>
                            </div>
                        </div>
                        <div class="d-flex">
                            <h3 class="ms-auto mt-auto"> 
                                {{ tweened.number.toFixed(0) }}/{{ totalScore }} คะแนน
                            </h3>
                        </div>
                    </div>
                </header>
    
                <section>
                    <table class="table table-light table-bordered">
                        <thead>
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
                                <td class="text-center" @click="tdClickOnRadioFrame"><input type="radio" :name="'radio_' + index.toString()" class="form-check-input fs-5" :data-question-id="row.id" :data-score="1" :value="row.id" @click="checkUpScore" ref="radioEls" required /></td>
                                <td class="text-center" @click="tdClickOnRadioFrame"><input type="radio" :name="'radio_' + index.toString()" class="form-check-input fs-5" :data-question-id="row.id" :data-score="2" :value="row.id" @click="checkUpScore" ref="radioEls" required /></td>
                                <td class="text-center" @click="tdClickOnRadioFrame"><input type="radio" :name="'radio_' + index.toString()" class="form-check-input fs-5" :data-question-id="row.id" :data-score="3" :value="row.id" @click="checkUpScore" ref="radioEls" required /></td>
                                <td class="text-center" @click="tdClickOnRadioFrame"><input type="radio" :name="'radio_' + index.toString()" class="form-check-input fs-5" :data-question-id="row.id" :data-score="4" :value="row.id" @click="checkUpScore" ref="radioEls" required /></td>
                                <td class="text-center" @click="tdClickOnRadioFrame"><input type="radio" :name="'radio_' + index.toString()" class="form-check-input fs-5" :data-question-id="row.id" :data-score="5" :value="row.id" @click="checkUpScore" ref="radioEls" required /></td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="__secret__ d-none">
                        <input type="hidden" name="topic_id" :value="props.meeting_topic_id">
                    </div>

                </section>
                <footer class="d-flex">
                    <button type="submit" class="btn btn-primary ms-auto" autofocus>
                        <span class="spinner-grow spinner-grow-sm spinner visually-hidden"></span>
                        ส่งแบบฟอร์ม
                    </button>
                </footer>
            </div>
        </form>
    </div>
</template>
<script setup>
    import { ref, reactive, defineProps, defineEmits, watch, computed, onMounted } from 'vue';
    import { useStore } from 'vuex';
    import gsap from 'gsap';
    import my_modules from '@/lib/it_system_module';


    const props = defineProps({
        meeting_topic_id: {
            type: Number
        },
        meeting_name: {
            type: String
        },
        meeting_room_name: {
            type: String
        }
    });
    const emits = defineEmits(['submit']);
    const store = useStore();

    const radioEls = ref();
    const tbodyEl = ref();
    const tweened = reactive({
        number: 0
    });
    const totalScore = ref(0);
    const checkedUp = ref({});

    const getSimpleQuestions = computed(() => {
        return store.getters.getSimpleQuestionData ? store.getters.getSimpleQuestionData : [];
    });

    const getTotalScoreChecked = computed(() => {
        return Object.values(checkedUp.value).reduce((curr, row) => {
            curr += row;
            return curr;
        }, 0);
    });


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
        store.commit('updateSimpleQuestionData', function(data){
            console.log(data);
        });
    });

</script>
<style scoped>
    input[type=radio].form-check-input
    {
        cursor: pointer;
    }
</style>