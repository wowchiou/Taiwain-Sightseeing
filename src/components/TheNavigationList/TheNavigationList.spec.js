import { mount } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createVuexStore } from '@/store';
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
      plugins: [createVuexStore(config.plugins.store), router],
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

  it('list has menu icon', async () => {
    const ICON = wrapper.find('[data-test="icon"]');
    expect(ICON.classes()).toEqual(menuData.iconClass.split(' '));
  });

  it('list show menu title', () => {
    const TITLE = wrapper.find('[data-test="title"]');
    expect(TITLE.isVisible()).toBe(true);
  });

  it('list do not show menu title', async () => {
    await wrapper.setProps({ menuActive: false });
    const TITLE = wrapper.find('[data-test="title"]');
    expect(TITLE.exists()).toBe(false);
  });
});
