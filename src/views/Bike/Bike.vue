<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

import MapLayout from '@/layouts/MapLayout';
import AppSearchBar from '@/components/AppSearchBar';
import CitySelector from '@/components/CitySelector';
import CityKeywordInput from '@/components/CityKeywordInput';
import BikeSearchList from '@/components/BikeSearchList';

const { state, dispatch } = useStore();

const searchedCity = ref('');
const keyword = ref('');
const renderStationsResults = ref([]);

const bikeCities = computed(() => state.bike.bikeCities);
const bikeStations = computed(() => state.bike.bikeStations);
const searchedCityName = computed(
  () => bikeCities.value.find((itm) => itm.City === searchedCity.value).CityName
);

async function searchCityBikeStations() {
  if (!searchedCity.value) return;
  dispatch('showLoader', true);
  keyword.value = '';
  await dispatch('bike/fetchBikeStationData', searchedCity.value);
  await dispatch('map/setBikeMarkers', bikeStations.value);
  await dispatch('map/setLocationOfCityOnMap', searchedCityName.value);
  renderStationsResults.value = bikeStations.value;
  dispatch('showLoader', false);
}

function keywordSearch() {
  if (keyword.value === '') {
    return (renderStationsResults.value = bikeStations.value);
  }
  renderStationsResults.value = bikeStations.value.filter(
    (itm) => itm.StationName.Zh_tw.indexOf(keyword.value) !== -1
  );
}
</script>

<template>
  <MapLayout>
    <div class="bike">
      <AppSearchBar title="YouBike即時車位">
        <CitySelector
          v-model="searchedCity"
          :cities="bikeCities"
          :searchHandler="searchCityBikeStations"
        />
        <CityKeywordInput
          v-model="keyword"
          :disabled="!searchedCity"
          :result="renderStationsResults"
          :keywordSearch="keywordSearch"
        />
      </AppSearchBar>

      <div class="page-search-content">
        <div
          v-if="renderStationsResults.length === 0"
          class="page-search-remind"
        >
          請選擇城市
        </div>
        <BikeSearchList v-else :bikeResult="renderStationsResults" />
      </div>
    </div>
  </MapLayout>
</template>

<style lang="scss" scoped>
@import './Bike.scss';
</style>
