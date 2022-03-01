import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';
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
    path: '/bus/:city/:route/:id',
    name: 'bus-detail',
    props: true,
    component: () => import('@/views/BusDetail'),
  },
  {
    path: '/network-error',
    name: 'network-error',
    component: () => import('@/views/NetWorkError'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound'),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach(() => {
  store.commit('SET_MAP_ACTIVE', false);
});

export default router;
