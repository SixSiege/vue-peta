import Vue from 'vue';
import VueRouter from 'vue-router';
import Map from '../components/CrimeMap.vue'; // Import the Map component
import DataPagination from '../components/DataPagination.vue';
import ChartMap from '../views/ChartMap.vue';
import FormPelaporan from '../views/FormPelaporan.vue';
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import AuthSuccess from '../components/AuthSuccess.vue'

Vue.use(VueRouter);

const routes = [
    {
      path: '/',
      name: 'Peta',
      component: Map, // Set the Map component as the component for the '/' route
    },
    // Add other routes as needed
    {
      path: '/titikTerkini',
      name: 'DataTerkini',
      component: DataPagination,
    },
    {
      path: '/statistik',
      name: 'Statistik',
      component: ChartMap,
    },
    {
      path: '/laporan',
      name: 'Laporan',
      component: FormPelaporan,
      children: [
        {
          path: '',
          name: 'LoginPelaporan',
          component: LoginForm,
        },
        {
          path: 'register',
          name: 'RegisterPelaporan',
          component: RegisterForm,
        },
        {
          path: 'loginSuccess',
          name: 'LoginSuccessPelaporan',
          component: AuthSuccess,
        }
      ]
    }
];
  
const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
  