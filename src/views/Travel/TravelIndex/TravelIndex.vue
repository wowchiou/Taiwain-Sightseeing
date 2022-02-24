<template>
  <div class="travel">
    <h1>{{ title }}</h1>

    <TravelSearcher v-model="cityName" :searchHandler="searchHandler" />

    <div class="content">
      <p v-if="!hasSearchResult" class="remind">請選擇城市/輸入關鍵字查詢</p>

      <TravelSearchList v-else :searchResult="searchResult" :page="page" />
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import TravelSearcher from '@/components/TravelSearcher';
import TravelSearchList from '@/components/TravelSearchList';

export default {
  props: ['page'],

  components: { TravelSearcher, TravelSearchList },

  setup(props) {
    const store = useStore();
    const router = useRouter();
    const cityName = ref('');
    const searchResult = ref([]);
    const hasSearchResult = computed(() => searchResult.value.length !== 0);
    const selectCity = computed(() => store.state.travel.selectCity);
    const title = computed(() => props.page.toUpperCase());

    let travelData = null;

    watch(
      () => props.page,
      async (page, prevPage) => {
        if (page !== prevPage) {
          cityName.value = '';
          searchResult.value = [];
          travelData = await store
            .dispatch('travel/fetchTravelData', props.page)
            .catch((err) => console.log(err));

          if (store.state.map.layerGroup) {
            store.state.map.layerGroup.clearLayers();
          }

          if (selectCity.value) {
            cityName.value = selectCity.value;
            searchHandler();
          }
        }
      },
      { immediate: true }
    );

    async function searchHandler() {
      store.dispatch('showLoader', true);
      const result = travelData.filter((itm) => itm.City === cityName.value);
      searchResult.value = result;

      // 抓取市中心位置
      store.commit('travel/SET_SELECT_CITY', cityName.value);
      const cityPosition = await store
        .dispatch('fetchCityAddress', cityName.value)
        .catch((err) => {
          console.log(err);
          router.push({ name: 'network-error' });
        });

      store.dispatch('map/setCityCenter', cityPosition);

      // 繪製地圖marker
      const markerData = result.map((itm) => {
        return {
          name: itm[`${props.page}Name`],
          position: [itm.Position.PositionLat, itm.Position.PositionLon],
          id: itm[`${props.page}ID`],
        };
      });
      store.dispatch('map/setTravelMarkers', { page: props.page, markerData });
      store.dispatch('showLoader', false);
    }

    return {
      cityName,
      searchHandler,
      searchResult,
      hasSearchResult,
      title,
    };
  },
};
</script>

<style lang="scss" scoped>
@import './TravelIndex.scss';
</style>
