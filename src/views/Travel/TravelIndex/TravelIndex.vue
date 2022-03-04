<template>
  <div class="travelIndex">
    <div class="page-top">
      <h1 class="pageTitle">{{ title }}</h1>
      <form class="search-form" @submit.prevent>
        <CitySelector
          v-model="city"
          :cities="cityData"
          :searchHandler="searchHandler"
        />
        <CityKeywordInput
          v-model="keyword"
          :disabled="!city"
          :result="searchResult"
          :keywordSearch="keywordSearch"
        />
      </form>
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
import CitySelector from '@/components/CitySelector';
import CityKeywordInput from '@/components/CityKeywordInput';
import TravelSearchList from '@/components/TravelSearchList';
import cityData from '@/utils/city.json';

export default {
  props: ['page'],

  components: { CitySelector, CityKeywordInput, TravelSearchList },

  setup(props) {
    const store = useStore();

    const city = ref('');
    const keyword = ref('');
    const searchResult = ref([]);
    const citySearchResult = ref([]);

    const hasSearchResult = computed(() => searchResult.value.length !== 0);
    const selectCity = computed(() => store.state.travel.selectCity);
    const title = computed(() => props.page.toUpperCase());

    let travelData = [];

    watch(
      () => props.page,
      async () => {
        store.dispatch('showLoader', true);
        // 換頁時清除之前搜尋紀錄
        city.value = '';
        searchResult.value = [];

        // 清空marker
        store.dispatch('map/clearMarkersCluster');

        // 獲取景點、餐飲、旅宿資料
        travelData = await store.dispatch('travel/fetchTravelData', props.page);

        // 從詳細頁回來重新搜尋之前縣市資料
        if (selectCity.value) {
          city.value = selectCity.value;
          keyword.value = store.state.travel.keywords;
          searchResult.value = store.state.travel.travelData;
          setMarkers(store.state.travel.travelData);
        }
        store.dispatch('showLoader', false);
      },
      { immediate: true }
    );

    async function searchHandler() {
      store.dispatch('showLoader', true);
      resetSearchHistory();

      // 儲存目前選擇的城市，從詳細頁回來時以此重抓資料
      store.commit('travel/SET_SELECT_CITY', city.value);

      // 抓取市中心位置
      const cityName = cityData.find((itm) => itm.City === city.value).CityName;
      const cityPosition = await store.dispatch('fetchCityAddress', cityName);

      // 讀取市中心經緯度
      await store
        .dispatch('map/readCityGeometry', cityPosition[0].Geometry)
        .then((res) => store.state.map.OSM.setView(res, 12));

      const result = travelData.filter((itm) => itm.City === cityName);
      citySearchResult.value = result;
      setSearchResult(result);

      // 繪製地圖marker
      setMarkers(result);

      store.dispatch('showLoader', false);
    }

    function setMarkers(result) {
      const page = props.page;
      const markersData = result.map((itm) => {
        return {
          name: itm[`${page}Name`],
          position: [itm.Position.PositionLat, itm.Position.PositionLon],
          id: itm[`${page}ID`],
        };
      });
      store.dispatch('map/setTravelMarkers', { page, markers: markersData });
    }

    function keywordSearch() {
      store.commit('travel/SET_KEYWORDS', keyword.value);
      store.dispatch('travel/fetchTravelData', props.page).then((res) => {
        if (keyword.value === '') {
          return setSearchResult(res);
        }
        const result = res.filter(
          (itm) => itm[`${props.page}Name`].indexOf(keyword.value) !== -1
        );
        setSearchResult(result);
      });
    }

    function setSearchResult(result) {
      searchResult.value = result;
      store.commit('travel/SET_TRAVEL_DATA', result);
    }

    function resetSearchHistory() {
      keyword.value = '';
      store.commit('travel/SET_KEYWORDS', '');
      store.commit('travel/SET_ACTIVE_ID', '');
    }

    return {
      city,
      cityData,
      searchHandler,
      searchResult,
      hasSearchResult,
      title,
      keyword,
      keywordSearch,
    };
  },
};
</script>

<style lang="scss" scoped>
@import './TravelIndex.scss';
</style>
