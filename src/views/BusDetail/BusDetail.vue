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
          <div v-if="endName" class="station-arrow">&#8693;</div>
          <div v-if="endName" class="end-name">{{ endName }}</div>
        </div>
        <ul class="direction">
          <li
            :class="{ active: currentDirection === 0 }"
            @click="changeDirection(0)"
          >
            前往<span>{{ startName }}</span>
          </li>
          <li
            :class="{ active: currentDirection === 1 }"
            @click="changeDirection(1)"
          >
            前往<span>{{ endName || '無返程' }}</span>
          </li>
        </ul>
      </div>

      <ul v-if="busStopTime" class="bus-result">
        <li
          class="bus-stop"
          v-for="(stop, stopIDX) in busStopTime"
          :key="stop.StopUID"
        >
          <div class="stop-number">{{ stopIDX + 1 }}</div>
          <div class="stop-status" v-if="stop.detail.length > 0">
            <div
              class="stop-detail"
              v-for="(detail, detailIDX) in stop.detail"
              :key="`${id}${stopIDX}${detailIDX}`"
              v-html="formateEstimateTime(detail)"
            ></div>
          </div>
          <div v-else class="stop-status"><span>尚未發車</span></div>
          <div class="stop-name">{{ stop.StopName.Zh_tw }}</div>
        </li>
      </ul>
    </div>
  </MapLayout>
</template>

<script>
import { ref, computed, watch } from 'vue';
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
    const busStopTime = ref(null);

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
      () => {
        if (store.state.map.OSM) {
          getBusData();
        }
      },
      { immediate: true }
    );

    function formateEstimateTime(bus) {
      if (typeof bus === 'undefined') {
        return '<span>尚未發車</span>';
      }
      if (bus.StopStatus === 0) {
        const minutes = Math.floor(bus.EstimateTime / 60);
        return `<span>${minutes}分鐘</span>`;
      }
      if (bus.StopStatus === 1) {
        console.log(bus.Estimates);
        return '<span>尚未發車</span>';
      }
      // switch (bus.StopStatus) {
      //   case 0:
      //     const minutes = Math.floor(bus.EstimateTime / 60);
      //     return `<span>${minutes}分鐘</span>`;
      //   case 1:
      //     return '<span>尚未發車</span>';
      //   default:
      //     break;
      // }
    }

    function setStopsMarker() {
      store.dispatch('map/setBusStopsMarker', busStops.value.Stops);
    }

    async function setBusMarker() {
      const busTimeResponse = await store
        .dispatch('bus/fetchRealTimeOfArrival', apiPostData)
        .catch((err) => {
          console.log(err);
        });
      const busData = busTimeResponse.filter(
        (itm) => itm.Direction === currentDirection.value
      );
      store.dispatch('map/setBusMarker', busData);
    }

    async function setBusShape() {
      const shapeResponse = await store
        .dispatch('bus/fetchBusShape', apiPostData)
        .catch((err) => {
          console.log(err);
        });
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
      console.log('busEstimatedTime', busEstimatedTime);

      console.log(busStops.value);
      const result = busStops.value.Stops.map((stop) => {
        let busTime = busEstimatedTime.filter(
          (bus) =>
            bus.StopName.Zh_tw === stop.StopName.Zh_tw &&
            (String(bus.Direction) === 'undefined' ||
              bus.Direction === currentDirection.value) &&
            bus.PlateNumb
        );
        return { ...stop, detail: busTime };
      });
      console.log(result);
      busStopTime.value = result;
    }

    async function getBusData() {
      const busStopsResponse = await store
        .dispatch('bus/fetchBusStopOfRoute', apiPostData)
        .catch((err) => {
          console.log(err);
        });
      busStopsResult.value = busStopsResponse.filter(
        (bus) => bus.RouteUID === props.id
      );
      console.log(busStopsResult.value);
      getBusEstimatedTime();
      setBusShape();
      setStopsMarker();
      setBusMarker();
    }

    function changeDirection(direction) {
      if (!endName.value) return;
      currentDirection.value = direction;
      getBusEstimatedTime();
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
      formateEstimateTime,
    };
  },
};
</script>

<style lang="scss" scoped>
@import './BusDetail.scss';
</style>
