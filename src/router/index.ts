import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth'
import TrainingListForUser from "@/views/training/TrainingList.vue";
import Dashboard from "@/views/Dashboard.vue";
import  TrainingDetailForUsers from "@/views/training/TrainingDetail.vue";
import Profile from "@/views/user/Profile.vue";
import ContentDetail from "@/views/training/ContentDetail.vue";
import Login from '@/views/auth/Login.vue';
import RegisterUser from '@/views/auth/RegisterUser.vue';
import LandingPage from '@/views/LandingPage.vue';




const routes: Array<RouteRecordRaw> = [

  {
    path: '/auth/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: RegisterUser,
  },
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/trainings',
    name: 'TrainingList',
    component: TrainingListForUser
  },
  {
    path: '/trainings/:trainingId',
    name: 'TrainingDetail',
    component: TrainingDetailForUsers
  },
  {
    path: "/trainings/content/:trainingId",
    name: "ContentDetail",
    component: ContentDetail
  },
  {
    path: "/user",
    name: "Profile",
    component: Profile
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const { isAuthenticated } = authStore;

  if (!isAuthenticated && !to.path.startsWith('/auth')) {
    return next('/auth/login');
  }

  next();
})




export default router;