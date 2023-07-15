<template>
  <div class="container border border-white rounded-5 shadow p-3 bg-white">
    <div class="row justify-content-between">
      <div class="col">
        <h2>Peta Kejahatan</h2>
      </div>
      <div class="col d-flex justify-content-end">
        <div class="btn btn-primary my-2" @click="toggleSearch">
          <i class="bi bi-search"></i>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="map">
          <l-map
            ref="map"
            class="rounded-5"
            @update:zoom="zoomUpdate"
            @update:center="centerUpdate"
            :zoom="zoom"
            :center="center"
          >
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-marker
              :key="koor.id_koor"
              v-for="koor in markersData"
              :lat-lng="latLng(koor.latitude, koor.longitude)"
              @click="showStatistics(koor)"
            >
              <l-icon
                :icon-url="setMarker(koor.t_kejahatan)"
                :icon-size="iconSize"
                :icon-anchor="iconAnchor"
              ></l-icon>
            </l-marker>
            <!-- <l-marker :lat-lng="currentCenter"></l-marker> -->
          </l-map>

          <div
            class="details shadow"
            :class="{ show: selectedMarker }"
            @click="hideStatistics"
          >
            <small>Tekan popup ini untuk menutupnya</small>
            <p></p>
            <h2>
              <img :src="setMarker(selectedMarker?.t_kejahatan)" alt="" />{{
                selectedMarker?.t_kejahatan
              }}
            </h2>
            <p>Alamat: {{ selectedMarker?.alamat }}</p>
            <p>Kelurahan: {{ selectedMarker?.kelurahan }}</p>
            <p>Kecamatan: {{ selectedMarker?.kecamatan }}</p>
            <p>Kabupaten/Kota: {{ selectedMarker?.kab_kota }}</p>
            <p>Waktu Kejadian: {{ editTime(selectedMarker?.tanggal) }}</p>
            <p>Aparat: {{ selectedMarker?.nama_aparat }}</p>
          </div>
        </div>
      </div>
      <div :class="searchColumnClass" v-if="showSearch">
        <h2>Cari & Filter</h2>
        <div class="form-group">
          <label for="t_kejahatan">Jenis Kejahatan</label>
          <select
            class="form-select mb-3"
            v-model="selectedCrimeType"
            id="t_kejahatan"
          >
            <option disabled value="">Pilih Jenis Kejahatan</option>
            <option
              v-for="crimeType in crimeTypes"
              :value="crimeType"
              :key="crimeType"
            >
              {{ crimeType }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="kecamatan">Kecamatan</label>
          <select
            class="form-select mb-3"
            v-model="selectedKecamatan"
            id="kecamatan"
          >
            <option disabled value="">Pilih Kecamatan</option>
            <option
              v-for="kecamatan in listKecamatan"
              :value="kecamatan"
              :key="kecamatan"
            >
              {{ kecamatan }}
            </option>
          </select>
        </div>
        <div class="btn btn-primary" @click="searchMarkers">Filter Map</div>
        <div class="btn btn-primary" @click="resetMarkers">Reset Map</div>
      </div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import { LMap, LTileLayer, LMarker, LIcon } from "vue2-leaflet";
import moment from "moment";
import { Icon } from "leaflet";
import axios from "axios";
// import store from "../stores/store.js"

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default {
  name: "CrimeMap",
  data: function () {
    return {
      zoom: 12,
      center: L.latLng(0.499523, 101.449814),
      currentCenter: L.latLng(0.499523, 101.449814),
      currentZoom: 13,
      url: "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=9d575d1b92fa423a8280fb4e72e29d89",
      attribution:
        '&copy; <a href="https://www.thunderforest.com/terms/">Thunderforest</a>',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      selectedMarker: null,
      markersData: [],
      originalData: [],
      isFiltered: false,
      crimeTypes: ["Kemalingan", "Pembacokan", "Pencurian", "Perampokan"],
      listKecamatan: [],
      selectedCrimeType: "",
      selectedKecamatan: "",
      showSearch: false,
    };
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
    setMarker: function (tCrime) {
      if (tCrime != undefined) {
        return require(`@/assets/${tCrime}.png`);
      } else {
        return require(`@/assets/none.png`);
      }
    },
    showStatistics: function (marker) {
      this.selectedMarker = marker;
    },
    hideStatistics: function () {
      this.selectedMarker = null;
    },
    editTime: function (time) {
      return moment(time).format("MMMM Do, YYYY");
    },
    toggleSearch: function () {
      this.showSearch = !this.showSearch;
    },

    fetchData: function () {
      axios
        .get("http://localhost:8080/api/koordinat/")
        .then((r) => {
          this.markersData = r.data;
          this.originalData = r.data;
          const kecamatan = [
            ...new Set(this.markersData.map((item) => item.kecamatan)),
          ];
          this.listKecamatan = kecamatan;
        })
        .catch((e) => {
          console.error(e);
        });
    },

    searchMarkers: function () {
      let filteredMarkers;
      axios
        .get("http://localhost:8080/api/koordinat/", {
          params: {
            t_kejahatan: this.selectedCrimeType,
            kecamatan: this.selectedKecamatan,
          },
        })
        .then((r) => {
          filteredMarkers = r.data;
          this.updateMapMarkers(filteredMarkers);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getBoundingBox: function (markers) {
      const filtered = markers;

      // Initialize min and max latitude/longitude values
      let minLat = Number.POSITIVE_INFINITY;
      let maxLat = Number.NEGATIVE_INFINITY;
      let minLng = Number.POSITIVE_INFINITY;
      let maxLng = Number.NEGATIVE_INFINITY;

      // Calculate the min and max latitude/longitude values
      filtered.forEach((coord) => {
        minLat = Math.min(minLat, coord.latitude);
        maxLat = Math.max(maxLat, coord.latitude);
        minLng = Math.min(minLng, coord.longitude);
        maxLng = Math.max(maxLng, coord.longitude);
      });

      // Return the bounding box coordinates as an array: [southwest, northeast]
      return [
        [minLat, minLng],
        [maxLat, maxLng],
      ];
    },

    updateMapMarkers: function (filteredMarkers) {
      const map = this.$refs.map;
      this.markersData = filteredMarkers;
      this.isFiltered = true;
      const boundingBox = this.getBoundingBox(filteredMarkers);
      map.fitBounds(boundingBox);
    },

    resetMarkers: function () {
      this.selectedCrimeType = "";
      this.selectedKecamatan = "";
      return (this.markersData = this.originalData);
    },
  },
  mounted: function () {
    this.fetchData();
    if (this.$route.query.lat != null && this.$route.query.lng != null) {
      this.center =
        L.latLng(this.$route.query.lat, this.$route.query.lng) || this.center;

      this.$nextTick(() => {
        const map = this.$refs.map.mapObject;
        map.setView(this.center, 18, { animate: false });
      });
    }
  },
  computed: {
    searchColumnClass() {
      return {
        "col-3": this.showSearch, // Apply the class 'col-4' when showSearch is true
        "col-12": !this.showSearch, // Apply the class 'col-0' when showSearch is false
      };
    },
  },
};
</script>

<style scoped>
.map {
  position: relative;
  height: 70vh;
  width: 100%;
  border-width: 3px !important;
}

.details {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-20px, 20px);
  z-index: 1000;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 10px;
  opacity: 0;
  pointer-events: none;
}
.details.show {
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
  pointer-events: initial;
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
