<template>
  <nav class="navbar navbar-expand-lg rounded-pill p-3 fs-5" data-bs-theme="dark" style="background-color: #2B2D42;">
    <router-link class="nav-link" to="/">
      <a class="navbar-brand">
        <img src="../assets/logotxt.png" height="40" alt="Pekanbaru Crime Map">
      </a>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse nav justify-content-center" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Peta</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/statistik">Statistik</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="checkSession()">Laporan</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/titikTerkini"
            >Titik Terkini</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarMap",
  methods: {
    checkSession() {
      if(this.$session.exists('username')) {
        return '/laporan/loginSuccess'
      } else {
        return '/laporan'
      }
    }
  }
};
</script>

<style scoped>

</style>
