import { mount } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createVuexStore } from '@/store/index.js';
import { routes } from '@/router';
import App from '@/App.vue';

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

function mountComponent(config = {}) {
  config.mountOptions = config.mountOptions || {};
  config.plugins = config.plugins || {};
  return mount(App, {
    global: {
      plugins: [createVuexStore(config.plugins.store), router],
    },
    ...config.mountOptions,
  });
}

let wrapper;

describe('App', () => {
  beforeEach(() => {
    // create teleport target
    const el = document.createElement('div');
    el.id = 'portal-loader';
    document.body.appendChild(el);
    wrapper = mountComponent();
  });

  afterEach(() => {
    // clean up
    document.body.outerHTML = '';
  });

  it('App initial route', async () => {
    router.push('/');
    await router.isReady();

    const homeTitle = wrapper.find('[data-test="home-title"]');
    expect(homeTitle.text()).toContain('歡迎來到台灣觀光查詢網');
  });

  it('App teleport loader is exist', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
