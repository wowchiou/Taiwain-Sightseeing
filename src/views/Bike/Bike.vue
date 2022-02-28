<template>
  <MapLayout>
    <div class="bike">
      <div class="page-top">
        <h1 class="pageTitle">YouBike即時車位</h1>
        <TravelSearcher
          v-model="city"
          :cities="cityStation"
          :searchHandler="searchHandler"
        />
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
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import MapLayout from '@/layouts/MapLayout';
import TravelSearcher from '@/components/TravelSearcher';
import BikeSearchList from '@/components/BikeSearchList';
import cityStation from '@/utils/bikeCityStations.json';

export default {
  components: {
    MapLayout,
    TravelSearcher,
    BikeSearchList,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const city = ref('');
    const bikeResult = ref([]);

    async function searchHandler() {
      if (!city.value) return;

      store.dispatch('showLoader', true);
      const bikeStation = await store
        .dispatch('bike/fetchBikeStation', city.value)
        .catch((err) => {
          console.log(err);
          store.dispatch('showLoader', false);
          router.push({ name: 'network-error' });
        });
      const bikeAvailability = await store
        .dispatch('bike/fetchBikeAvailability', city.value)
        .catch((err) => {
          console.log(err);
          store.dispatch('showLoader', false);
          router.push({ name: 'network-error' });
        });
      const bikeTotalData = bikeStation.map((station) => {
        const bikeDetail = bikeAvailability.find(
          (bike) => bike.StationUID === station.StationUID
        );
        return { ...station, detail: bikeDetail };
      });

      store.dispatch('map/setBikeMarkers', bikeTotalData);

      // 抓取市中心位置
      const cityName = cityStation.find(
        (itm) => itm.City === city.value
      ).CityName;
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
        .then((res) => {
          store.state.map.OSM.setView(res, 12);
        });
      bikeResult.value = bikeTotalData;
      store.dispatch('showLoader', false);
    }

    return { city, bikeResult, cityStation, searchHandler };
  },
};
</script>

<style lang="scss" scoped>
@import './Bike.scss';
</style>
