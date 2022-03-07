<template>
  <div class="netWorkError">
    <div class="wrap">
      <h1>Network Error</h1>
      <p>抱歉！網路連結異常，請稍後再試！</p>
      <p><a :href="baseUrl" target="_self">返回首頁</a>繼續瀏覽。</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    baseUrl() {
      return process.env.NODE_ENV === 'production'
        ? '/Taiwain-Sightseeing/'
        : '/';
    },
  },
};
</script>

<style lang="scss" scoped>
@import './NetWorkError.scss';
</style>
