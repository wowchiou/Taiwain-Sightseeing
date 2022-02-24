import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/travel/:page',
    name: 'travel',
    component: () => import('@/views/Travel'),
    props: true,
    children: [
      {
        path: '',
        name: 'travel-index',
        props: true,
        component: () => import('@/views/Travel/TravelIndex'),
      },
      {
        path: ':id/:name',
        name: 'travel-detail',
        props: true,
        component: () => import('@/views/Travel/TravelDetail'),
      },
    ],
  },
  {
    path: '/bike',
    name: 'bike',
    component: () => import('@/views/Bike'),
  },
  {
    path: '/bus',
    name: 'bus',
    component: () => import('@/views/Bus'),
  },
  {
    path: '/network-error',
    name: 'network-error',
    component: () => import('@/views/NetWorkError'),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
