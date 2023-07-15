<template lang="">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 p-3">
                <Navbar />
            </div>
            <div class="col-12">
                <keep-alive>
                    <router-view :key="$route.fullPath"/>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>

import Navbar from '../components/NavbarMap.vue';

export default {
    name: "MainApp",
    components: {
        Navbar
    },
}
</script>

<style scoped>

</style>