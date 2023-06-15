import Vue from 'vue';
import VueRouter from 'vue-router';
import Map from '../components/CrimeMap.vue'; // Import the Map component

Vue.use(VueRouter);

const routes = [
    {
      path: '/',
      name: 'Peta',
      component: Map, // Set the Map component as the component for the '/' route
    },
    // Add other routes as needed
];
  
const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
  