<template>
  <div class="travelIndex">
    <div class="page-top">
      <h1 class="pageTitle">{{ title }}</h1>
      <TravelSearcher
        v-model="city"
        :cities="cityData"
        :searchHandler="searchHandler"
      />
    </div>

    <div class="page-search-content">
      <p v-if="!hasSearchResult" class="page-search-remind">請選擇城市</p>
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
import cityData from '@/utils/city.json';

export default {
  props: ['page'],

  components: { TravelSearcher, TravelSearchList },

  setup(props) {
    const store = useStore();
    const router = useRouter();

    const city = ref('');
    const searchResult = ref([]);

    const hasSearchResult = computed(() => searchResult.value.length !== 0);
    const selectCity = computed(() => store.state.travel.selectCity);
    const title = computed(() => props.page.toUpperCase());

    let travelData = [];

    watch(
      () => props.page,
      async (page, prevPage) => {
        if (page !== prevPage) {
          // 換頁時清除之前搜尋紀錄
          city.value = '';
          searchResult.value = [];
          // 清空marker
          store.dispatch('map/clearMarkersCluster');

          // 獲取景點、餐飲、旅宿資料
          travelData = await store
            .dispatch('travel/fetchTravelData', page)
            .catch((err) => {
              console.log(err);
              router.push({ name: 'network-error' });
            });

          // 從詳細頁回來重新搜尋之前縣市資料
          if (selectCity.value) {
            city.value = selectCity.value;
            console.log(2);
            searchHandler();
          }
        }
      },
      { immediate: true }
    );

    async function searchHandler() {
      store.dispatch('showLoader', true);

      // 儲存目前選擇的城市，從詳細頁回來時以此重抓資料
      store.commit('travel/SET_SELECT_CITY', city.value);

      // 抓取市中心位置
      const cityName = cityData.find((itm) => itm.City === city.value).CityName;
      const cityPosition = await store
        .dispatch('fetchCityAddress', cityName)
        .catch((err) => {
          console.log(err);
          store.dispatch('showLoader', false);
          router.push({ name: 'network-error' });
        });

      // 讀取市中心經緯度
      await store
        .dispatch('map/readCityGeometry', cityPosition[0].Geometry)
        .then((res) => store.state.map.OSM.setView(res, 12));

      // 繪製地圖marker
      const page = props.page;
      const result = travelData.filter((itm) => itm.City === cityName);
      searchResult.value = result;
      const markersData = result.map((itm) => {
        return {
          name: itm[`${page}Name`],
          position: [itm.Position.PositionLat, itm.Position.PositionLon],
          id: itm[`${page}ID`],
        };
      });
      store.dispatch('map/setTravelMarkers', { page, markers: markersData });

      store.dispatch('showLoader', false);
    }

    return {
      city,
      cityData,
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
