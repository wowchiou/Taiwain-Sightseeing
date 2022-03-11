import { mount } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createStore } from '@/store/index.js';
import { routes } from '@/router';
import TheNavigation from './TheNavigation.vue';

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
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

  it('Navigation full page', () => {
    wrapper.setData({ menuActive: true });
    // const navigation = wrapper.find('[data-testId="navigation"]');
    expect(wrapper.classes('active')).toBe(true);
  });
});
