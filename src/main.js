import Vue from 'vue'
import App from './App.vue'
import 'leaflet/dist/leaflet.css';
import router from './router/router.js';

import 'bootstrap/dist/css/bootstrap.css';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
