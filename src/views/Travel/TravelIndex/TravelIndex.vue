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
          // 換頁時清除之前搜尋紀錄
          cityName.value = '';
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
            cityName.value = selectCity.value;
            searchHandler();
          }
        }
      },
      { immediate: true }
    );

    async function searchHandler() {
      store.dispatch('showLoader', true);

      // 儲存目前選擇的城市，從詳細頁回來時以此重抓資料
      store.commit('travel/SET_SELECT_CITY', cityName.value);

      // 抓取市中心位置
      const cityPosition = await store
        .dispatch('fetchCityAddress', cityName.value)
        .catch((err) => {
          console.log(err);
          router.push({ name: 'network-error' });
        });

      // 讀取市中心經緯度
      await store
        .dispatch('map/readCityGeometry', cityPosition[0].Geometry)
        .then((res) => {
          store.dispatch('map/setMapView', { position: res, zoom: 12 });
        });

      // 設定地圖中心位

      // 繪製地圖marker
      const page = props.page;
      const result = travelData.filter((itm) => itm.City === cityName.value);
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
