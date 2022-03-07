<template>
  <div class="netWorkError">
    <div class="wrap">
      <h1>Network Error</h1>
      <p>抱歉！網路連結異常，請稍後再試！</p>
      <p>
        <AppLink :to="{ name: 'home' }" replace>返回首頁</AppLink>繼續瀏覽。
      </p>
    </div>
  </div>
</template>

<script>
import AppLink from '@/components/AppLink';

export default {
  components: {
    AppLink,
  },
};
</script>

<style lang="scss" scoped>
@import './NetWorkError.scss';
</style>
