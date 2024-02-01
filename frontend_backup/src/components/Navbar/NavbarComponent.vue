<template>
    <nav class="navbar navbar-expand-sm bg-light my-2 shadow">
        <div class="container">
            <a href="#" class="navbar-brand"><h4 class="text-secondary">Meeting Room Vote</h4></a>

            <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item me-1">
                        <input class="btn-check" name="page" id="page1" type="radio" :checked="$route.name === 'home'" @click="$router.push('/')" />
                        <label for="page1" class="btn btn-outline-primary border-0">หน้าแรก</label>
                    </li>
                    <li class="nav-item me-1">
                        <input class="btn-check" name="page" id="page2" type="radio" :checked="$route.name === 'topic table'" @click="$router.push('/topics')" />
                        <label for="page2" class="btn btn-outline-primary border-0">ชุดแบบประเมิน</label>
                    </li>
                    <li class="nav-item me-1">
                        <input class="btn-check" name="page" id="page3" type="radio" :checked="$route.name === 'topic vote'" disabled />
                        <label for="page3" class="btn btn-outline-primary border-0">แบบประเมิน</label>
                    </li>
                    <li class="nav-item me-1" v-if="$store.getters.getAuthed">
                        <UserProfileComponent />
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script setup>
    import UserProfileComponent from './UserProfileComponent.vue';
</script>