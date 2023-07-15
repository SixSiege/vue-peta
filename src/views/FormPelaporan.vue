<template>
  <div class="container border border-white rounded-5 shadow p-3 bg-white">
    <h2>Form Pelaporan</h2>
    <div class="row justify-content-evenly py-4">
      <div class="col-4 p-3">
        <form
          @submit.prevent="submitForm"
          class="border border-2 rounded border-primary p-3"
        >
          <div class="mb-3">
            <input
              v-model="userID"
              type="hidden"
              class="form-control"
              id="id_user"
            />
          </div>
          <div class="mb-3">
            <label for="tanggal_kejadian" class="form-label"
              >Tanggal Kejadian:</label
            >
            <input
              v-model="date"
              type="date"
              id="tanggal_kejadian"
              class="form-control"
              :disabled="!isLoggedIn"
              required
            />
          </div>
          <div class="mb-3">
            <label for="alamat_kejadian" class="form-label"
              >Alamat Kejadian:</label
            >
            <input
              v-model="alamatKejadian"
              type="text"
              id="alamat_kejadian"
              class="form-control"
              :disabled="!isLoggedIn"
              placeholder="Jl. Pramuka"
              required
            />
          </div>
          <div class="mb-3">
            <label for="keterangan" class="form-label">Keterangan:</label>
            <textarea
              class="form-control"
              rows="3"
              v-model="keterangan"
              :disabled="!isLoggedIn"
              id="keterangan"
              placeholder="Deskripsikan kejadiannya disini..."
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary" :disabled="!isLoggedIn">
            Submit
          </button>
          <div class="form-text text-danger">{{ loginStatusText }}</div>
        </form>
      </div>
      <div class="col-4">
        <p>Anda harus login untuk memasukkan laporan</p>
        <div :class="alertStatus">
          {{ serverMsg }}
        </div>
        <router-view
          :key="$route.fullPath"
          @enableForm="enableForm"
          @changeMsg="changeMsg"
          @disableForm="disableForm"
        ></router-view>
        <h3 class="my-4">atau</h3>
        <p>
          Pilih dan telepon aparat berikut sesuai dengan wilayah hukum setempat
        </p>
        <select
          class="form-select mb-3"
          v-model="selectedAparat"
          id="nama_aparat"
        >
          <option value=""></option>
          <option
            v-for="aparat in listAparat"
            :value="aparat"
            :key="aparat.id_aparat"
          >
            {{ aparat.nama_aparat }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      date: "",
      alamatKejadian: "",
      keterangan: "",
      userID: "",
      isLoggedIn: false, // Initially set to false
      serverMsg: "",
      selectedAparat: "",
      listAparat: [],
      listTipeKejahatan: [
        "Kemalingan",
        "Pembacokan",
        "Pencurian",
        "Perampokan",
      ],
      selectedCrimeType: "",
    };
  },
  computed: {
    loginStatusText() {
      return this.isLoggedIn ? "You are logged on." : "You are not logged on.";
    },
    alertStatus() {
      return {
        "d-none": this.serverMsg == "",
        "alert alert-warning": !this.isLoggedIn, // Apply the class 'col-4' when showSearch is true
        "alert alert-success": this.isLoggedIn, // Apply the class 'col-0' when showSearch is false
      };
    },
  },
  mounted: function () {
    this.fetchAparat();
    this.checkSession();
  },
  methods: {
    submitForm() {
      // Handle form submission logic only if user is logged in
      if (this.isLoggedIn) {
        axios
          .post("http://localhost:8080/api/pelaporan", {
            id_user: this.$session.get("user_id"),
            alamat_kejadian: this.alamatKejadian,
            tanggal_kejadian: this.date,
            keterangan: this.keterangan,
            status: "pending"
          })
          .then((this.serverMsg = "Laporan sudah di submit"))
          .catch((error) => {
            console.error(error);
          });
        // Access the form values using this.date, this.name, this.email, this.file
        console.log("Form submitted");
      } else {
        console.log("User not logged in");
      }
    },
    enableForm(message, userid) {
      this.isLoggedIn = !this.isLoggedIn;
      this.serverMsg = message;
      this.userID = userid;
    },
    disableForm() {
      this.isLoggedIn = false;
    },
    changeMsg(msg) {
      this.serverMsg = msg;
    },
    fetchAparat() {
      axios.get("http://localhost:8080/api/aparat/").then((r) => {
        this.listAparat = r.data;
      });
    },
    checkSession() {
      if (this.$session.exists("username")) {
        this.enableForm("You are logged in");
        this.userID = this.$session.get("user_id");
        console.log("session exists", this.$session.get("user_id"));
      } else {
        console.log("session not found");
      }
    },
  },
};
</script>

<style scoped></style>
