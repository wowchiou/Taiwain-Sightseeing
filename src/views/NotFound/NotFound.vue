<template>
  <div class="notFound">
    <div class="wrap">
      <h1>404 Page Not Found</h1>
      <p>抱歉！您查詢的頁面不存在！</p>
      <p>
        <AppLink :to="{ name: 'home' }" replace>返回首頁</AppLink>繼續瀏覽。
      </p>
    </div>
  </div>
</template>

<script>
import AppLink from "@/components/AppLink";

export default {
  components: {
    AppLink,
  },
};
</script>

<style lang="scss" scoped>
@import "./NotFound.scss";
</style>
