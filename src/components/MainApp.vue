<template lang="">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <Navbar />
            </div>
            <div class="col-12">
                <router-view :data="data" />
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import Navbar from './NavbarMap.vue';

export default {
    name: "MainApp",
    data: function() {
        return {
            data: [],
            qData: []
        }
    },
    components: {
        Navbar
    },
    mounted: function() {
        axios.get('http://localhost:8080/api/koordinat/')
        .then((r) => {
            this.data = r.data;
        })
    }
}
</script>

<style scoped>

</style>