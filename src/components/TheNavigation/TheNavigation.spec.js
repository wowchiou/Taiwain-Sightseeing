import { mount } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createStore } from '@/store/index.js';
import { routes } from '@/router';
import TheNavigation from './TheNavigation.vue';
import menuList from '@/utils/menu-list.json';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

function mountComponent(config = {}) {
  config.mountOptions = config.mountOptions || {};
  config.plugins = config.plugins || {};
  return mount(TheNavigation, {
    global: {
      plugins: [createStore(config.plugins.store), router],
    },
    ...config.mountOptions,
  });
}

let wrapper;

describe('TheNavigation', () => {
  beforeEach(() => {
    wrapper = mountComponent();
  });

  it('toggleNavigation open', async () => {
    await wrapper.vm.toggleNavigation(true);
    expect(wrapper.classes('active')).toBe(true);
  });

  it('toggleNavigation close', async () => {
    await wrapper.vm.toggleNavigation(false);
    expect(wrapper.classes('active')).toBe(false);
  });

  it('render navigation menu list', () => {
    const MENU_LIST = wrapper.findAll('[data-testId="menu-list"]');
    expect(MENU_LIST).toHaveLength(menuList.length);
  });
});
