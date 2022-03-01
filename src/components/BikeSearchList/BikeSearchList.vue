<template>
  <ul class="bikeSearchList">
    <li
      v-for="bike in bikeResult"
      :class="{ active: itemActive === bike.StationUID }"
      :key="bike.stationUID"
      @click="clickHandler(bike)"
    >
      <div class="top">
        <span
          class="status"
          :class="stationStatus(bike.detail.ServiceStatus).class"
          >{{ stationStatus(bike.detail.ServiceStatus).text }}</span
        >
        <div class="total">
          <span class="type">{{ bikeType(bike.ServiceType) }}</span>
          <p class="capacity">
            可容納車位<span>{{ bike.BikesCapacity }}</span
            >輛
          </p>
        </div>
      </div>
      <p class="name">{{ formateStationName(bike.StationName.Zh_tw) }}</p>
      <p class="address">{{ bike.StationAddress.Zh_tw }}</p>
      <div class="available">
        <div class="rent">
          可出借<span>{{ bike.detail.AvailableRentBikes }}</span
          >輛
        </div>
        <div class="return">
          可歸還<span>{{ bike.detail.AvailableReturnBikes }}</span
          >輛
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    bikeResult: {
      type: Array,
    },
  },
  setup(props) {
    const store = useStore();
    const itemActive = ref(false);

    watch(
      () => props.bikeResult,
      () => {
        window.scrollTo({ top: 0 });
      }
    );

    function clickHandler(bike) {
      const lat = bike.StationPosition.PositionLat;
      const lng = bike.StationPosition.PositionLon;
      itemActive.value = bike.StationUID;
      store.state.map.OSM.setView([lat, lng], 18);
      store.state.map.markersCluster.eachLayer((layer) => {
        const layerPosition = layer._latlng;
        if (layerPosition.lat === lat && layerPosition.lng === lng) {
          layer.openPopup();
        }
      });
      store.commit('SET_MAP_ACTIVE', true);
    }

    function formateStationName(name) {
      const stationName = name.split('_');
      return stationName.length > 1
        ? stationName[stationName.length - 1]
        : stationName[0];
    }

    function stationStatus(status) {
      switch (status) {
        case 0:
          return { class: 'error', text: '停止營運' };
        case 1:
          return { class: 'success', text: '正常營運' };
        case 2:
          return { class: 'warn', text: '暫停營運' };
      }
    }

    function bikeType(type) {
      switch (type) {
        case 1:
          return 'YouBike1.0';
        case 2:
          return 'YouBike2.0';
      }
    }

    return {
      itemActive,
      formateStationName,
      stationStatus,
      bikeType,
      clickHandler,
    };
  },
};
</script>

<style lang="scss" scoped>
@import './BikeSearchList.scss';
</style>
