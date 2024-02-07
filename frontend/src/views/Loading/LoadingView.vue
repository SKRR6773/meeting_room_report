<template>
    <div>
        <Transition name="fade">
            <div class="container-fluid d-flex" style="height: 100vh;" v-show="is_show">

                <section class="logo m-auto">
                    <div class="container">
                        <div class="row">
                            <div class="col-4 col-md-5"></div>
                            <div class="col-4 col-md-2">

                                <header>
                                    <img :src="mrgLogo" alt="mrg-logo" class="logo-image" />
                                </header>
                                <section class="mt-3">
                                    <h5 align="center" class="text-secondary">Loading...</h5>
                                </section>

                            </div>
                            <div class="col-4 col-md-5"></div>
                        </div>
                    </div>
                </section>

            </div>
        </Transition>
    </div>
</template>
<script setup>
    import { defineProps, computed } from 'vue';
    import mrgLogo from '../../assets/mrg-logo.png';


    const props = defineProps({
        is_show: {
            type: Boolean,
            default: false
        }
    });

    const is_show = computed(() => props.is_show);
</script>
<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }


    .logo
    {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .logo-image
    {
        width: 100%;
    }
</style>