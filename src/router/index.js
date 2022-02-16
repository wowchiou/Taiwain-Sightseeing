import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requireMenu: false,
    },
  },
  {
    path: '/travel',
    name: 'travel',
    component: () => import('@/views/Travel'),
    meta: {
      requireMenu: true,
    },
  },
  {
    path: '/bike',
    name: 'bike',
    component: () => import('@/views/Bike'),
    meta: {
      requireMenu: true,
    },
  },
  {
    path: '/bus',
    name: 'bus',
    component: () => import('@/views/Bus'),
    meta: {
      requireMenu: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
