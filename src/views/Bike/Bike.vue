<template>
  <MapLayout>
    <div class="bike">
      <div class="page-top">
        <h1 class="pageTitle">YouBike即時車位</h1>
        <form class="search-form" @submit.prevent>
          <CitySelector
            v-model="city"
            :cities="cityStation"
            :searchHandler="searchHandler"
          />
          <CityKeywordInput
            v-model="keyword"
            :disabled="!city"
            :result="bikeResult"
            :keywordSearch="keywordSearch"
          />
        </form>
      </div>

      <div class="page-search-content">
        <div v-if="bikeResult.length < 1" class="page-search-remind">
          請選擇城市
        </div>
        <BikeSearchList v-else :bikeResult="bikeResult" />
      </div>
    </div>
  </MapLayout>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import MapLayout from "@/layouts/MapLayout";
import CitySelector from "@/components/CitySelector";
import CityKeywordInput from "@/components/CityKeywordInput";
import BikeSearchList from "@/components/BikeSearchList";
import cityStation from "@/utils/bikeCityStations.json";

export default {
  components: {
    MapLayout,
    CitySelector,
    CityKeywordInput,
    BikeSearchList,
  },
  setup() {
    const store = useStore();

    const city = ref("");
    const keyword = ref("");
    const cityBikeResult = ref([]);
    const bikeResult = ref([]);

    async function searchHandler() {
      if (!city.value) return;
      keyword.value = "";

      store.dispatch("showLoader", true);
      const bikeStation = await store.dispatch(
        "bike/fetchBikeStation",
        city.value
      );
      const bikeAvailability = await store.dispatch(
        "bike/fetchBikeAvailability",
        city.value
      );
      const bikeTotalData = bikeStation.map((station) => {
        const bikeDetail = bikeAvailability.find(
          (bike) => bike.StationUID === station.StationUID
        );
        return { ...station, detail: bikeDetail };
      });

      await store.dispatch("map/setBikeMarkers", bikeTotalData);

      // 抓取市中心位置
      const cityName = cityStation.find(
        (itm) => itm.City === city.value
      ).CityName;
      const cityPosition = await store.dispatch("fetchCityAddress", cityName);

      // 讀取市中心經緯度
      await store
        .dispatch("map/readCityGeometry", cityPosition[0].Geometry)
        .then((res) => {
          store.state.map.OSM.setView(res, 12);
        });
      cityBikeResult.value = bikeTotalData;
      bikeResult.value = bikeTotalData;
      store.dispatch("showLoader", false);
    }

    function keywordSearch() {
      if (keyword.value === "") {
        return (bikeResult.value = cityBikeResult.value);
      }
      const result = cityBikeResult.value.filter(
        (itm) => itm.StationName.Zh_tw.indexOf(keyword.value) !== -1
      );
      bikeResult.value = result;
    }

    return {
      city,
      bikeResult,
      keyword,
      cityStation,
      searchHandler,
      keywordSearch,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./Bike.scss";
</style>
