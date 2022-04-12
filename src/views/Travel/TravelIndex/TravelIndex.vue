<script setup>
import { ref, watch, computed, defineProps } from 'vue';
import { useStore } from 'vuex';
import CITY from '@/utils/city.json';

import AppSearchBar from '@/components/AppSearchBar';
import CitySelector from '@/components/CitySelector';
import CityKeywordInput from '@/components/CityKeywordInput';
import TravelSearchList from '@/components/TravelSearchList';

const props = defineProps({
  page: { type: String, required: true },
});

const { state, commit, dispatch } = useStore();

const searchedCity = ref('');
const keyword = ref('');
const searchedResults = ref([]);

const title = computed(() => props.page.toUpperCase());
const travelData = computed(() => state.travel.travelData);
const selectedCityRecord = computed(() => state.travel.selectCity);
const searchedCityName = computed(
  () => CITY.find((itm) => itm.City === searchedCity.value).CityName
);

watch(
  () => props.page,
  async () => {
    dispatch('showLoader', true);
    clearSearchedData();

    await dispatch('travel/fetchTravelData', props.page);
    dispatch('travel/setTravelData', props.page);

    // 如從詳細頁回來並且搜尋過城市、關鍵字
    // 復原原來搜尋過的紀錄
    if (selectedCityRecord.value) setSearchedRecords();

    dispatch('showLoader', false);

    function clearSearchedData() {
      searchedCity.value = '';
      keyword.value = '';
      searchedResults.value = [];
      dispatch('map/clearMarkersCluster');
    }

    function setSearchedRecords() {
      searchedCity.value = selectedCityRecord.value;
      keyword.value = state.travel.keywords;
      let filterSearchData = filterSearchCity();
      searchedResults.value = filterSearchData;
      if (keyword.value) {
        filterSearchData = filterSearchCityKeywords(keyword.value);
        searchedResults.value = filterSearchData;
      }
      setMarkers(filterSearchData);
    }
  },
  { immediate: true }
);

function setMarkers(locations) {
  const page = props.page;
  dispatch('map/setTravelMarkers', {
    page,
    markers: locations.map((location) => {
      return {
        name: location[`${page}Name`],
        position: [
          location.Position.PositionLat,
          location.Position.PositionLon,
        ],
        id: location[`${page}ID`],
      };
    }),
  });
}

async function searchHandler() {
  dispatch('showLoader', true);
  searchedResults.value = filterSearchCity(travelData.value);
  setMarkers(searchedResults.value);
  await dispatch('map/setLocationOfCityOnMap', searchedCityName.value);
  recordSelectedCity();
  resetKeywords();
  dispatch('showLoader', false);
}

function keywordSearch() {
  searchedResults.value = filterSearchCityKeywords(keyword.value);
  recordSearchKeywords();
}

function filterSearchCity() {
  return travelData.value.filter((itm) => itm.City === searchedCityName.value);
}

function filterSearchCityKeywords(keywords) {
  return searchedResults.value.filter(
    (itm) => itm[`${props.page}Name`].indexOf(keywords) !== -1
  );
}

function recordSelectedCity() {
  commit('travel/SET_SELECT_CITY', searchedCity.value);
}

function recordSearchKeywords() {
  commit('travel/SET_KEYWORDS', keyword.value);
}

function resetKeywords() {
  keyword.value = '';
  commit('travel/SET_KEYWORDS', '');
}
</script>

<template>
  <div class="travelIndex">
    <AppSearchBar :title="title">
      <CitySelector
        v-model="searchedCity"
        :cities="CITY"
        :searchHandler="searchHandler"
      />
      <CityKeywordInput
        v-model="keyword"
        :disabled="!searchedCity"
        :result="searchedResults"
        :keywordSearch="keywordSearch"
      />
    </AppSearchBar>

    <div class="page-search-content">
      <p v-if="searchedResults.length === 0" class="page-search-remind">
        請選擇城市
      </p>
      <TravelSearchList v-else :searchResult="searchedResults" :page="page" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './TravelIndex.scss';
</style>
