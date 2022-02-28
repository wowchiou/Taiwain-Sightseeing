<template>
  <div class="notFound">
    <div class="wrap">
      <h1>404 Page Not Found</h1>
      <p>抱歉！您查詢的頁面不存在！</p>
      <p>
        您可嘗試回到<span @click="$router.go(-1)">上一頁</span>或<AppLink
          :to="{ name: 'home' }"
          >返回首頁</AppLink
        >繼續瀏覽。
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
@import './NotFound.scss';
</style>
