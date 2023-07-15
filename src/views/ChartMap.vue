<template>
    <div class="container border border-white rounded-5 shadow p-3 bg-white">
        <div class="row">
            <div class="col-4">
                <h3>Total Kejahatan Yang Terjadi</h3>
                <TotalChart />
            </div>
            <div class="col">
                <h3>Total Kejahatan 1 Pekan Terakhir</h3>
                <LatestChart />
            </div>
        </div>
    </div>
</template>
<script>
import TotalChart from '../components/TotalChart.vue';
import LatestChart from '../components/LatestChart.vue';

export default {
    components: {
        TotalChart,
        LatestChart,
    },
}
</script>
<style>
    
</style>