import { mount } from '@vue/test-utils';
import { createVuexStore } from '@/store/index.js';
import AppLoader from '@/components/AppLoader';

function mountComponent(config = {}) {
  config.mountOptions = config.mountOptions || {};
  config.plugins = config.plugins || {};
  return mount(AppLoader, {
    global: {
      plugins: [createVuexStore(config.plugins.store)],
    },
    ...config.mountOptions,
  });
}

let wrapper;

describe('App', () => {
  beforeEach(() => {
    wrapper = mountComponent();
  });

  it('map init & loader is true, show loader', () => {
    wrapper = mountComponent({
      plugins: {
        store: {
          modules: { map: { state: { OSM: {} } } },
          state: () => ({ loader: true }),
        },
      },
    });
    expect(wrapper.isVisible()).toBe(true);
  });

  it('map is not init & loader is false, show loader', () => {
    wrapper = mountComponent({
      plugins: {
        store: {
          modules: { map: { state: { OSM: null } } },
          state: () => ({ loader: true }),
        },
      },
    });
    expect(wrapper.isVisible()).toBe(true);
  });

  it('map is not init & loader is true, show loader', () => {
    wrapper = mountComponent({
      plugins: {
        store: {
          modules: { map: { state: { OSM: null } } },
          state: () => ({ loader: false }),
        },
      },
    });
    expect(wrapper.isVisible()).toBe(true);
  });

  it('do not show loader', () => {
    wrapper = mountComponent({
      plugins: {
        store: {
          modules: { map: { state: { OSM: {} } } },
          state: () => ({ loader: false }),
        },
      },
    });
    expect(wrapper.isVisible()).toBe(false);
  });
});
