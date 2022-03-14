import { mount } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createVuexStore } from '@/store';
import { routes } from '@/router';
import AppLink from './AppLink.vue';

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

function mountComponent(config = {}) {
  config.mountOptions = config.mountOptions || {};
  config.plugins = config.plugins || {};
  return mount(AppLink, {
    global: {
      plugins: [createVuexStore(config.plugins.store), router],
    },
    propsData: {
      to: 'https://test.com',
    },
    ...config.mountOptions,
  });
}

let wrapper;

describe('AppLink', () => {
  beforeEach(() => {
    wrapper = mountComponent();
  });

  describe('AppLink is external', () => {
    it('[external-link] exists', () => {
      const external_link = wrapper.find('[data-test="external-link"]');
      expect(external_link.exists()).toBeTruthy();
    });

    it('[internal-link] do not exist', () => {
      const internal_link = wrapper.find('[data-test="internal-link"]');
      expect(internal_link.exists()).toBeFalsy();
    });

    it('attribute target is _blank', () => {
      const external_link = wrapper.find('[data-test="external-link"]');
      expect(external_link.html()).toContain('_blank');
    });
  });

  describe('AppLink is internal', () => {
    it('[external-link] do not exist, ', async () => {
      await wrapper.setProps({ to: '/' });
      const external_link = wrapper.find('[data-test="external-link"]');
      expect(external_link.exists()).toBeFalsy();
    });

    it('[internal-link] exists', async () => {
      await wrapper.setProps({ to: '/' });
      const internal_link = wrapper.find('[data-test="internal-link"]');
      expect(internal_link.exists()).toBeTruthy();
    });
  });

  describe('AppLink is false', () => {
    it('[external-link] exists', async () => {
      await wrapper.setProps({ to: 'false' });
      const external_link = wrapper.find('[data-test="external-link"]');
      expect(external_link.exists()).toBeTruthy();
    });

    it('[internal-link] do not exist', async () => {
      await wrapper.setProps({ to: 'false' });
      const internal_link = wrapper.find('[data-test="internal-link"]');
      expect(internal_link.exists()).toBeFalsy();
    });

    it(`attribute href is javascript:;`, async () => {
      await wrapper.setProps({ to: 'false' });
      const external_link = wrapper.find('[data-test="external-link"]');
      expect(external_link.html()).toContain('javascript:;');
    });

    it('attribute target is _self', async () => {
      await wrapper.setProps({ to: 'false' });
      const external_link = wrapper.find('[data-test="external-link"]');
      expect(external_link.html()).toContain('_self');
    });
  });
});
