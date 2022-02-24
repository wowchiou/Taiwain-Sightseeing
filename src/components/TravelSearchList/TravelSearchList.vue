<template>
  <ul class="travelSearchList">
    <li
      v-for="result in searchResult"
      class="search-item"
      :key="result[`${page}ID`]"
    >
      <AppLink
        :to="{
          name: 'travel-detail',
          params: { id: result[`${page}ID`], name: result[`${page}Name`] },
        }"
      >
        {{ result[`${page}Name`] }}
      </AppLink>
    </li>
  </ul>
</template>

<script>
import AppLink from '@/components/AppLink';

export default {
  components: {
    AppLink,
  },
  props: {
    searchResult: {
      type: Array,
      required: true,
    },
    page: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import './TravelSearchList.scss';
</style>
