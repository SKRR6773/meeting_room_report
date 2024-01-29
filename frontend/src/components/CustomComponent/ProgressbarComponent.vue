<template>
    <div class="progress">
        <div class="progress-bar" ref="progres_el">{{ props.text }}</div>
    </div>
</template>
<script setup>
    import { ref, defineProps, onMounted } from 'vue';


    const props = defineProps({
        curr_progre: {
            type: Number,
            default: 0
        },
        full_progre: {
            type: Number,
            default: 100
        },
        text: {
            type: String
        }
    });


    const progres_el = ref();


    const Calculater = () => 
    {
        let _result = 0;

        try
        {
            _result = 100 / (props.full_progre / props.curr_progre);
        }
        catch (err)
        {
            console.error(err);
        }

        console.log(_result);
        
        progres_el.value.style.width = `${_result}%`;
    }


    onMounted(() => {
        console.log(props.curr_progre);
        console.log(props.full_progre);

        Calculater();
    });

</script>