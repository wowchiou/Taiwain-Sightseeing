<template>
  <div class="bus-index">
    <div class="page-top">
      <h1 class="pageTitle">公車/客運時刻表</h1>
      <form class="search-form" @submit.prevent>
        <CitySelector
          v-model="city"
          :cities="cityData"
          :searchHandler="searchHandler"
        />
        <CityKeywordInput
          v-model="keyword"
          :disabled="!city"
          :result="busResult"
          :keywordSearch="keywordSearch"
        />
      </form>
    </div>

    <div class="page-search-content">
      <div v-if="busResult.length < 1" class="page-search-remind">
        請選擇城市
      </div>
      <BusSearchList v-else :busResult="busResult" :city="city" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import CitySelector from '@/components/CitySelector';
import CityKeywordInput from '@/components/CityKeywordInput';
import BusSearchList from '@/components/BusSearchList';
import cityData from '@/utils/city.json';

export default {
  components: {
    CitySelector,
    CityKeywordInput,
    BusSearchList,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const city = ref('');
    const keyword = ref('');
    const busResult = ref([]);
    const busCityResult = ref([]);

    if (store.state.map.OSM) {
      store.dispatch('map/clearBusMap');
    }

    async function searchHandler() {
      store.dispatch('showLoader', true);
      const busRoute = await store
        .dispatch('bus/fetchBusCityRoute', city.value)
        .catch((err) => {
          console.log(err);
          router.push({ name: 'network-error' });
        });
      const busStopRoute = await store
        .dispatch('bus/fetchBusCityStopOfRoute', city.value)
        .catch((err) => {
          console.log(err);
          router.push({ name: 'network-error' });
        });
      const busTotalResult = busRoute.map((bus) => {
        const stopRoute = busStopRoute.find(
          (stop) => stop.RouteUID === bus.RouteUID
        );
        return { ...bus, detail: stopRoute };
      });
      busCityResult.value = busTotalResult;
      busResult.value = busTotalResult;

      store.dispatch('showLoader', false);
    }

    function keywordSearch() {
      if (keyword.value === '') {
        return (busResult.value = busCityResult.value);
      }
      let result = [];
      busCityResult.value.forEach((itm) => {
        if (itm.RouteName.Zh_tw.indexOf(keyword.value) !== -1) {
          return result.push(itm);
        }
        if (
          itm.DepartureStopNameZh &&
          itm.DepartureStopNameZh.indexOf(keyword.value) !== -1
        ) {
          return result.push(itm);
        }
        if (
          itm.DestinationStopNameZh &&
          itm.DestinationStopNameZh.indexOf(keyword.value) !== -1
        ) {
          return result.push(itm);
        }
      });
      busResult.value = result;
    }

    return {
      city,
      cityData,
      keyword,
      busResult,
      searchHandler,
      keywordSearch,
    };
  },
};
</script>

<style lang="scss" scoped>
@import './BusIndex.scss';
</style>
