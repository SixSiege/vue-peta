import Vue from 'vue'
import App from './App.vue'
import 'leaflet/dist/leaflet.css';
import router from './router/router';

import VueSessionStorage from 'vue-sessionstorage';
Vue.use(VueSessionStorage);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
