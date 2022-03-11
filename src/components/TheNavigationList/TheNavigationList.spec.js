import { mount } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createStore } from '@/store/index.js';
import { routes } from '@/router';
import TheNavigationList from './TheNavigationList.vue';
import menuList from '@/utils/menu-list.json';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const menuData = menuList[0];

const propsData = {
  title: menuData.title,
  path: menuData.path,
  iconClass: menuData.iconClass,
  menuActive: true,
};

function mountComponent(config = {}) {
  config.mountOptions = config.mountOptions || {};
  config.plugins = config.plugins || {};
  return mount(TheNavigationList, {
    global: {
      plugins: [createStore(config.plugins.store), router],
    },
    propsData,
    ...config.mountOptions,
  });
}

let wrapper;

describe('TheNavigationList', () => {
  beforeEach(() => {
    wrapper = mountComponent({ propsData });
  });

  describe('render TheNavigationList', () => {
    it('TheNavigationList has icon', async () => {
      const ICON = wrapper.find('[data-testId="icon"]');
      expect(ICON.classes()).toEqual(menuData.iconClass.split(' '));
    });

    it('TheNavigation show title', () => {
      const TITLE = wrapper.find('[data-testId="title"]');
      expect(TITLE.isVisible()).toBe(true);
    });

    it('TheNavigation do not show title', async () => {
      await wrapper.setProps({ menuActive: false });
      const TITLE = wrapper.find('[data-testId="title"]');
      expect(TITLE.exists()).toBe(false);
    });
  });
});
