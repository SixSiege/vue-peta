<template>
  <div class="app">
    <div class="container">
      <MainApp />
    </div>
    <FooterApp />
  </div>
</template>

<script>
import MainApp from "./views/MainApp.vue"
import FooterApp from "./components/FooterApp.vue"

import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/js/bootstrap.bundle.js';



export default {
  name: 'App',
  components: {
    MainApp,
    FooterApp
  }
}
</script>

<style>
  .app {
    background-color: rgb(230, 230, 230);
  }
</style>
