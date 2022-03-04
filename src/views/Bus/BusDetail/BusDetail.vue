<template>
  <div class="busDetail" v-if="busStopsResult.length > 0">
    <div class="top">
      <div class="title">
        <ButtonBackToFrontPage />
        <div class="city">{{ cityName }}</div>
        <div class="route-name">
          <span>{{ route }}</span>
        </div>
      </div>
      <div class="station-name">
        <div class="start-name">{{ startName || endName }}</div>
        <div class="station-arrow">&#8693;</div>
        <div class="end-name">{{ endName }}</div>
      </div>
      <ul class="direction">
        <li
          :class="{ active: currentDirection === 0 }"
          @click="changeDirection(0)"
        >
          前往<span>{{ startName || endName }}</span>
        </li>
        <li
          v-if="startName"
          :class="{ active: currentDirection === 1 }"
          @click="changeDirection(1)"
        >
          前往<span>{{ endName || '無返程' }}</span>
        </li>
      </ul>
    </div>

    <BusStopsList :busStopTime="busStopTime" />
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import cityData from '@/utils/city.json';
import BusStopsList from '@/components/BusStopsList';
import ButtonBackToFrontPage from '@/components/ButtonBackToFrontPage';

export default {
  components: { BusStopsList, ButtonBackToFrontPage },
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
    const busStopTime = ref(null);
    const busStopsResult = ref([]);
    const busStops = computed(() =>
      busStopsResult.value.find(
        (itm) => itm.Direction === currentDirection.value
      )
    );
    const startName = computed(() => {
      return busStopsResult.value[1]
        ? busStopsResult.value[1].Stops[0].StopName.Zh_tw
        : null;
    });
    const endName = computed(
      () => busStopsResult.value[0].Stops[0].StopName.Zh_tw
    );
    const cityName = cityData.find((city) => city.City === props.city).CityName;
    const apiPostData = {
      city: props.city,
      route: props.route,
    };

    watch(
      () => store.state.map.OSM,
      (OSM) => {
        if (OSM) {
          getBusData();
        }
      },
      { immediate: true }
    );

    function setStopsMarker() {
      store.dispatch('map/setBusStopsMarker', busStops.value.Stops);
    }

    async function setBusMarker() {
      const busTimeResponse = await store.dispatch(
        'bus/fetchRealTimeOfArrival',
        apiPostData
      );
      const busData = busTimeResponse.filter(
        (itm) => itm.Direction === currentDirection.value
      );
      store.dispatch('map/setBusMarker', busData);
    }

    async function setBusShape() {
      const shapeResponse = await store.dispatch(
        'bus/fetchBusShape',
        apiPostData
      );
      for (let i = 0; i < shapeResponse.length; i++) {
        const shape = shapeResponse[i];
        if (shape.RouteUID === props.id) {
          if (
            String(shape.Direction) === 'undefined' ||
            shape.Direction === currentDirection.value
          ) {
            store.dispatch('map/setBusRouteShape', shape);
            break;
          }
        }
      }
    }

    async function getBusEstimatedTime() {
      const busEstimatedTime = await store
        .dispatch('bus/fetchEstimatedTimeOfArrival', apiPostData)
        .catch((err) => {
          console.log(err);
        });
      const result = busStops.value.Stops.map((stop) => {
        let busTime = busEstimatedTime.filter(
          (bus) =>
            bus.StopName.Zh_tw === stop.StopName.Zh_tw &&
            (String(bus.Direction) === 'undefined' ||
              bus.Direction === currentDirection.value)
        );
        return { ...stop, detail: busTime };
      });
      busStopTime.value = result;
    }

    async function getBusData() {
      const busStopsResponse = await store.dispatch(
        'bus/fetchBusStopOfRoute',
        apiPostData
      );
      busStopsResult.value = busStopsResponse.filter(
        (bus) => bus.RouteUID === props.id
      );
      await getBusEstimatedTime();
      setMap();
    }

    async function changeDirection(direction) {
      if (!endName.value) return;
      currentDirection.value = direction;
      await getBusEstimatedTime();
      setMap();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function setMap() {
      setBusShape();
      setStopsMarker();
      setBusMarker();
    }

    return {
      busStopsResult,
      currentDirection,
      cityName,
      changeDirection,
      busStopTime,
      startName,
      endName,
    };
  },
};
</script>

<style lang="scss">
@import './BusDetail.scss';
</style>
