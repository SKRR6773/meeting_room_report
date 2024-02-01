<template>
    <div class="card h-100 shadow">
        <div class="header">
            
        </div>
        {{ props.data }}
    </div>
</template>
<script setup>
    import { defineProps } from 'vue';


    const props = defineProps({
        data: {
            type: Object
        }
    });
</script>