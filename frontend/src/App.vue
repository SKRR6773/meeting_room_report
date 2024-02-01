<template>
    <div class="container-fluid">
        <header>
            <!-- <RouterLink to="/">Home</RouterLink> -->
            <Navbar />
        </header>
        <section class="container mt-4">
            <hr>
            <router-view v-slot="{ Component }">
                <Transition name="fade" mode="out-in">
                    <component :is="Component" />
                </Transition>
            </router-view>
        </section>
        <footer class="container mb-4">
            <hr>
            <section class="text-center text-secondary">
                <h6>wiraphat@footer</h6>
            </section>
        </footer>
    </div>
</template>
<script setup>
    import { onMounted } from 'vue';
    import { RouterLink, RouterView } from 'vue-router';
    import { useStore } from 'vuex';
    import '@/socket';


    import Navbar from './components/Navbar/NavbarComponent.vue';


    const store = useStore();


    onMounted(() => {
        if (!!localStorage.getItem('user_details') && !!localStorage.getItem('user_token'))
        {
            const user_details = localStorage.getItem('user_details');
            const user_token = localStorage.getItem('user_token');


            store.commit('updateUserDetails', user_details);
            store.commit('updateUserToken', user_token);

            store.commit('verifyUserTokenAndUpdateUser');
        }
    });
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
