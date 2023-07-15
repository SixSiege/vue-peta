<template lang="">
  <form @submit.prevent="register">
    <div class="mb-3">
      <label for="nik" class="form-label">NIK:</label>
      <input
        v-model="nik"
        type="text"
        class="form-control"
        id="nik"
      />
    </div>
    <div class="mb-3">
      <label for="nama" class="form-label">Nama</label>
      <input
        type="text"
        class="form-control"
        id="nama"
        v-model="nama"
        required
      />
    </div>
    <div class="mb-3">
      <label for="username" class="form-label">Username</label>
      <input
        type="text"
        class="form-control"
        id="username"
        v-model="usernameRegis"
        required
      />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input
        type="password"
        class="form-control"
        id="password"
        v-model="passwordRegis"
        required
      />
    </div>
    <button type="submit" class="btn btn-primary">Register</button>
    <div class="form-text">
      Sudah punya akun?
      <router-link class="link-underline-primary" to="/laporan/"
        >Silakan login</router-link
      >
    </div>
  </form>
</template>
<script>
import axios from "axios";

export default {
  data: function () {
    return {
      nama: "",
      usernameRegis: "",
      passwordRegis: "",
      nik: "",
    };
  },
  methods: {
    register: function () {
      const params = new URLSearchParams();
      params.append("nama", this.nama);
      params.append("username", this.usernameRegis);
      params.append("password", this.passwordRegis);
      params.append("nik", this.nik);

      axios
        .post("http://localhost:8080/api/auth/register", params)
        .then((r) => {
          const msg = r.data.message;
          const status = r.data.status;

          if (status == 200) {
            this.$emit("changeMsg", msg);
            this.name = "";
            this.usernameRegis = "";
            this.passwordRegis = "";
            this.$router.push("/laporan");
          }
        })
        .catch((e) => {
          this.$emit("changeMsg", e.response.data.message);
          console.log(e);
        });
    },
  },
};
</script>
<style scoped></style>
