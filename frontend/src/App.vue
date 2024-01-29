<template>
    <div class="container-fluid">
        <header>
            <!-- <RouterLink to="/">Home</RouterLink> -->
            <Navbar />
        </header>
        <section class="container mt-4">
            <router-view v-slot="{ Component }">
                <Transition name="fade" mode="out-in">
                    <component :is="Component" />
                </Transition>
            </router-view>
        </section>
    </div>
</template>
<script setup>
    import { RouterLink, RouterView } from 'vue-router';
    import '@/socket';


    import Navbar from './components/Navbar/NavbarComponent.vue';
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
</style>
