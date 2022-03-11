// import { mount } from '@vue/test-utils';
// import { createRouter, createWebHashHistory } from 'vue-router';
// import { createStore } from '@/store/index.js';
// import { routes } from '@/router';
// import TheNavigationList from './TheNavigationList.vue';

// const router = createRouter({
//   history: createWebHashHistory(process.env.BASE_URL),
//   routes,
// });

// function mountComponent(config = {}) {
//   config.mountOptions = config.mountOptions || {};
//   config.plugins = config.plugins || {};
//   return mount(TheNavigationList, {
//     global: {
//       plugins: [createStore(config.plugins.store), router],
//     },
//     ...config.mountOptions,
//   });
// }

// let wrapper;

// describe('TheNavigationList', () => {
//   beforeEach(() => {
//     wrapper = mountComponent();
//   });

//   it('TheNavigationList is exist', () => {
//     expect(wrapper.exists()).toBeTruthy();
//   });
// });
