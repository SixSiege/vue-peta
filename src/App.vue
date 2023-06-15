<template>
  <div class="container">
    <MainApp />
  </div>
</template>

<script>
import MainApp from "./components/MainApp.vue"

import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/js/bootstrap.bundle.js';

export default {
  name: 'App',
  components: {
    MainApp
  }
}
</script>

<style>
  body {
    margin: 0;
  }
</style>
