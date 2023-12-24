<template>
  <div class="tableData border border-white rounded-5 p-4 shadow p-3 bg-white">
    <h2>Titik Terkini</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Jenis Kejahatan</th>
          <th>Waktu Kejadian</th>
          <th>Alamat</th>
          <th>Aparat Pengurus</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in markersData" :key="item.id_koor">
          <td>{{ item.t_kejahatan }}</td>
          <td>{{ editTime(item.tanggal) }}</td>
          <td>{{ item.alamat }}</td>
          <td>{{ item.nama_aparat }}</td>
          <td>
            <p>
            <router-link
              :to="{
                name: 'Peta',
                query: {
                  lat: item.latitude,
                  lng: item.longitude,
                }
              }"
              class="btn btn-primary m-1"
            >
              Check Location
            </router-link>
          </p>
          </td>
        </tr>
      </tbody>
    </table>

    <nav>
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button
            class="page-link"
            @click="previousPage"
            :disabled="currentPage === 1"
          >
            Previous
          </button>
        </li>
        <li
          class="page-item"
          :class="{ active: currentPage === page }"
          v-for="page in totalPages"
          :key="page"
        >
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button
            class="page-link"
            @click="nextPage"
            :disabled="currentPage === totalPages"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import moment from "moment";
import axios from "axios";
export default {
  name: "DataPagination",
  data: function () {
    return {
      markersData: [],
      currentPage: 1, // Current page number
      itemsPerPage: 10, // Number of items to display per page
    };
  },
  methods: {
    editTime: function (time) {
      return moment(time).format("MMMM Do, YYYY");
    },
    fetchData: function () {
      axios
        .get("http://localhost:8080/api/koordinat/", {
          params: {
            sortBy: "tanggal",
            sortOrder: "desc",
          },
        })
        .then((r) => {
          this.markersData = r.data;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  mounted: function () {
    this.fetchData();
  },
  computed: {
    totalItems() {
      return this.markersData.length;
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.markersData.slice(startIndex, endIndex);
    },
  },
};
</script>
<style>

</style>
