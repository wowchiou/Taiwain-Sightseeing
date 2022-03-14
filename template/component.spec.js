import { mount } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createVuexStore } from '@/store';
import { routes } from '@/router';
import COMPONENT_NAME from './COMPONENT_NAME.vue';

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

function mountComponent(config = {}) {
  config.mountOptions = config.mountOptions || {};
  config.plugins = config.plugins || {};
  return mount(COMPONENT_NAME, {
    global: {
      plugins: [createVuexStore(config.plugins.store), router],
    },
    ...config.mountOptions,
  });
}

let wrapper;

describe('COMPONENT_NAME', () => {
  beforeEach(() => {
    wrapper = mountComponent();
  });

  it('COMPONENT_NAME is exist', () => {
    expect(true).toBe(true);
  });
});
