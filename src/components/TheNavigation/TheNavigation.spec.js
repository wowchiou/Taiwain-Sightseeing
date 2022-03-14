import { mount } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createVuexStore } from '@/store/index.js';
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
      plugins: [createVuexStore(config.plugins.store), router],
    },
    ...config.mountOptions,
  });
}

let wrapper;

describe('TheNavigation', () => {
  beforeEach(() => {
    wrapper = mountComponent();
  });

  it('click [active-button] toggle navigation open or close', async () => {
    const ACTIVE_BUTTON = wrapper.find('[data-test="active-button"]');
    await ACTIVE_BUTTON.trigger('click');
    expect(wrapper.classes('active')).toBe(true);

    await ACTIVE_BUTTON.trigger('click');
    expect(wrapper.classes('active')).toBe(false);
  });

  it('render navigation [menu-list]', () => {
    const MENU_LIST = wrapper.findAll('[data-test="menu-list"]');
    expect(MENU_LIST).toHaveLength(menuList.length);
  });

  it('click [menu-list] navigation close', async () => {
    const MENU_LIST = wrapper.find('[data-test="menu-list"]');
    await MENU_LIST.trigger('click');
    expect(wrapper.classes('active')).toBe(false);
  });
});
