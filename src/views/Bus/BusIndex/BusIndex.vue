<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import CITY from '@/utils/city.json';

import AppSearchBar from '@/components/AppSearchBar';
import CitySelector from '@/components/CitySelector';
import CityKeywordInput from '@/components/CityKeywordInput';
import BusSearchList from '@/components/BusSearchList';

const { state, commit, dispatch } = useStore();
const searchedCity = ref('');
const keyword = ref('');
const busResults = ref([]);

const OSM = computed(() => state.map.OSM);
const busRoutes = computed(() => state.bus.busRoutes);
const busCity = computed(() => state.bus.busCity);
const busKeyWords = computed(() => state.bus.busKeyWords);

if (OSM.value) dispatch('map/clearBusMap');
if (busRoutes.value) {
  setBusSearchedRecord();
}

function setBusSearchedRecord() {
  searchedCity.value = busCity.value;
  if (busKeyWords.value) {
    keyword.value = busKeyWords.value;
    keywordSearch();
  } else {
    busResults.value = busRoutes.value;
  }
}

async function searchHandler() {
  dispatch('showLoader', true);
  resetKeywords();
  await dispatch('bus/getBusTotalData', searchedCity.value);
  recordBusSearchedCity();
  busResults.value = busRoutes.value;
  dispatch('showLoader', false);
}

function recordBusSearchedCity() {
  commit('bus/SET_BUS_CITY', searchedCity.value);
}

function recordBusSearchKeywords() {
  commit('bus/SET_BUS_KEYWORDS', keyword.value);
}

function resetKeywords() {
  keyword.value = '';
  commit('bus/SET_BUS_KEYWORDS', '');
}

function keywordSearch() {
  recordBusSearchKeywords();
  busResults.value = filterBusSearchKeywords();
}

function filterBusSearchKeywords() {
  let results = [];
  busRoutes.value.forEach((bus) => {
    const { RouteName, DepartureStopNameZh, DestinationStopNameZh } = bus;
    checkRouteName(RouteName.Zh_tw);
    checkRouteName(DepartureStopNameZh);
    checkRouteName(DestinationStopNameZh);

    function checkRouteName(routeName) {
      if (isRouteNameContainKeywords(routeName)) {
        return results.push(bus);
      }
    }

    function isRouteNameContainKeywords(routeName) {
      return routeName && routeName.indexOf(keyword.value) !== -1;
    }
  });
  return results;
}
</script>

<template>
  <div class="bus-index">
    <AppSearchBar title="公車/客運時刻表">
      <CitySelector
        v-model="searchedCity"
        :cities="CITY"
        :searchHandler="searchHandler"
      />
      <CityKeywordInput
        v-model="keyword"
        :disabled="!searchedCity"
        :result="busResults"
        :keywordSearch="keywordSearch"
      />
    </AppSearchBar>

    <div class="page-search-content">
      <div v-if="busResults.length === 0" class="page-search-remind">
        請選擇城市
      </div>
      <BusSearchList v-else :busResult="busResults" :city="searchedCity" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './BusIndex.scss';
</style>
