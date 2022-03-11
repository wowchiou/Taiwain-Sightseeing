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
import { ref } from "vue";
import { useStore } from "vuex";
import CitySelector from "@/components/CitySelector";
import CityKeywordInput from "@/components/CityKeywordInput";
import BusSearchList from "@/components/BusSearchList";
import cityData from "@/utils/city.json";

export default {
  components: {
    CitySelector,
    CityKeywordInput,
    BusSearchList,
  },
  setup() {
    const store = useStore();
    const city = ref("");
    const keyword = ref("");
    const busResult = ref([]);
    const busCityResult = ref([]);

    if (store.state.map.OSM) {
      store.dispatch("map/clearBusMap");
    }

    if (store.state.bus.busRoutes) {
      busCityResult.value = store.state.bus.busRoutes;
      city.value = store.state.bus.busCity;
      if (store.state.bus.busKeyWords) {
        keyword.value = store.state.bus.busKeyWords;
        keywordSearch();
      } else {
        busResult.value = store.state.bus.busRoutes;
      }
    }

    async function searchHandler() {
      store.dispatch("showLoader", true);
      keyword.value = "";
      store.commit("bus/SET_BUS_KEYWORDS", "");

      const busRoute = await store.dispatch(
        "bus/fetchBusCityRoute",
        city.value
      );
      const busStopRoute = await store.dispatch(
        "bus/fetchBusCityStopOfRoute",
        city.value
      );
      const busTotalResult = busRoute.map((bus) => {
        const stopRoute = busStopRoute.find(
          (stop) => stop.RouteUID === bus.RouteUID
        );
        return { ...bus, detail: stopRoute };
      });
      busCityResult.value = busTotalResult;
      busResult.value = busTotalResult;

      store.commit("bus/SET_BUS_CITY", city.value);
      store.commit("bus/SET_BUS_ROUTES", busTotalResult);

      store.dispatch("showLoader", false);
    }

    function keywordSearch() {
      store.commit("bus/SET_BUS_KEYWORDS", keyword.value);
      if (keyword.value === "") {
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
@import "./BusIndex.scss";
</style>
