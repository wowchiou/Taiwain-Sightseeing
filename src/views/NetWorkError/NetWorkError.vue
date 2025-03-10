<template>
  <div class="netWorkError">
    <div class="wrap">
      <h1>{{ title }}</h1>
      <p>{{ msg }}</p>
      <p><a :href="baseUrl" target="_self">返回首頁</a>繼續瀏覽。</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    baseUrl() {
      return process.env.NODE_ENV === 'production'
        ? '/Taiwain-Sightseeing/'
        : '/';
    },
  },
  props: {
    title: {
      type: String,
      default: 'Network Error',
    },
    msg: {
      type: String,
      default: '抱歉！網路連結異常，請稍後再試！',
    },
  },
  methods: {
    ...mapActions(['showLoader']),
  },
  mounted() {
    this.showLoader(false);
  },
};
</script>

<style lang="scss" scoped>
@import './NetWorkError.scss';
</style>
