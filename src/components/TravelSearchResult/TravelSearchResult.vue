<template>
  <div class="content">
    <p v-if="!hasResult" class="remind">請選擇城市/輸入關鍵字查詢</p>
    <ul v-else class="search-list">
      <li
        v-for="result in searchResult"
        class="search-item"
        :key="result.ScenicSpotID"
      >
        <AppLink
          :to="{
            name: 'travel-detail',
            params: { id: result.ScenicSpotID, name: result.ScenicSpotName },
          }"
          @click="showPosition(result.Position)"
        >
          {{ result.ScenicSpotName }}
        </AppLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import './TravelSearchResult.scss';
</style>
