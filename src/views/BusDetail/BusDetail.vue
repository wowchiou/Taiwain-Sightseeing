<template>
  <MapLayout>
    <div class="busDetail" v-if="busStopsResult.length > 0">
      <div class="top">
        <div class="title">
          <div class="city">{{ cityName }}</div>
          <div class="route-name">
            <span>{{ route }}</span>
          </div>
        </div>
        <div class="station-name">
          <div class="start-name">{{ startName }}</div>
          <div class="station-arrow">&#8693;</div>
          <div class="end-name">{{ endName }}</div>
        </div>
        <ul class="direction">
          <li
            :class="{ active: currentDirection === 0 }"
            @click="changeDirection(0)"
          >
            去程<span>{{ startName }}</span>
          </li>
          <li
            :class="{ active: currentDirection === 1 }"
            @click="changeDirection(1)"
          >
            返程<span>{{ endName }}</span>
          </li>
        </ul>
      </div>

      <ul class="bus-result"></ul>
    </div>
  </MapLayout>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import MapLayout from '@/layouts/MapLayout';
import cityData from '@/utils/city.json';

export default {
  components: {
    MapLayout,
  },
  props: {
    city: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const currentDirection = ref(0);
    const busStopsResult = ref([]);
    const busResult = computed(() => busStopsResult[currentDirection]);
    const startName = computed(
      () => busStopsResult.value[0].Stops[0].StopName.Zh_tw
    );
    const endName = computed(
      () => busStopsResult.value[1].Stops[0].StopName.Zh_tw
    );

    const cityName = cityData.find((city) => city.City === props.city).CityName;

    const apiPostData = {
      city: props.city,
      route: props.route,
    };

    getBusData();

    async function getBusData() {
      const busStopsResponse = await store.dispatch(
        'bus/fetchBusStopOfRoute',
        apiPostData
      );
      const busStops = busStopsResponse.filter(
        (bus) => bus.RouteUID === props.id
      );
      console.log(busStops);
      busStopsResult.value = busStops;

      // const busTimeResponse = await store.dispatch(
      //   'bus/fetchBusTimeOfArrival',
      //   apiPostData
      // );
      // console.log('fetchBusTimeOfArrival', busTimeResponse);

      const busEstimatedTime = await store.dispatch(
        'bus/fetchEstimatedTimeOfArrival',
        apiPostData
      );
      console.log('busEstimatedTime', busEstimatedTime);
    }

    function changeDirection(direction) {
      currentDirection.value = direction;
    }

    return {
      busStopsResult,
      currentDirection,
      cityName,
      changeDirection,
      busResult,
      startName,
      endName,
    };
  },
};
</script>

<style lang="scss" scoped>
@import './BusDetail.scss';
</style>
