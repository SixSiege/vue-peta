<template>
    <div class="map">
        <l-map 
            @update:zoom="zoomUpdate"
            @update:center="centerUpdate"
            :zoom="zoom" 
            :center="center">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-marker 
                :key="index" 
                v-for="(koor, index) in data" 
                :lat-lng="latLng(koor.latitude, koor.longitude)"
                @click="showStatistics(koor)" 
            >
            <l-icon
                :icon-url="setMarker(koor.t_kejahatan)"
                :icon-size="iconSize"
            ></l-icon>
            </l-marker>
            <!-- <l-marker :lat-lng="currentCenter"></l-marker> -->
        </l-map>

        <div class="details" :class="{ 'show': selectedMarker }">
            <button class="close-button" @click="hideStatistics">×</button>
            <h2>{{ selectedMarker?.t_kejahatan }}</h2>
            <p>Alamat: {{ selectedMarker?.alamat }}, {{ selectedMarker?.kelurahan }}, {{ selectedMarker?.kecamatan }}, {{ selectedMarker?.kab_kota }}</p>
        </div>
    </div>
</template>

<script>
import L from 'leaflet';
import { LMap, LTileLayer, LMarker, LIcon } from 'vue2-leaflet';

import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
    name: 'CrimeMap',
    props: {
        data: Array
    },
    data: function () {
        return {
            zoom: 12,
            center: L.latLng(0.499523, 101.449814),
            currentCenter: L.latLng(0.499523, 101.449814),
            currentZoom: 13,
            url: 'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=9d575d1b92fa423a8280fb4e72e29d89',
            attribution: '&copy; <a href="https://www.thunderforest.com/terms/">Thunderforest</a> contributors',
            iconSize: [32,32],
            selectedMarker: null,
        }
    },
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LIcon,
    },
    methods: {
        latLng: function (lat, lng) {
            return L.latLng(lat, lng);
        },
        centerUpdate: function (center) {
            this.currentCenter = center;
        },
        zoomUpdate: function (zoom) {
            this.currentZoom = zoom;
        },
        setMarker: function(tCrime) {
            return require(`@/assets/${tCrime}.png`);
        },
        showStatistics: function(marker) {
            this.selectedMarker = marker;
        },
        hideStatistics: function() {
            this.selectedMarker = null;
        },
    }
}
</script>

<style scoped>
    .map {
        height: 85vh;
        width: 100%;
    }

    .details {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 1000;
        background-color: #ffffff;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }
    .details.show {
        opacity: 1;
    }

    .details h2 {
        text-align: center;
    }

    .close-button {
        position: absolute;
        top: 5px;
        left: 5px;
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: 16px;
        color: #888;
    }
</style>