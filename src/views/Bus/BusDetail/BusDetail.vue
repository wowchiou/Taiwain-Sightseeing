<script setup>
import { ref, computed, watch, defineProps } from 'vue';
import { useStore } from 'vuex';
import CITY from '@/utils/city.json';

import BusStationCard from '@/components/BusStationCard';
import BusDirectionButtons from '@/components/BusDirectionButtons';
import BusStopsList from '@/components/BusStopsList';
import ButtonBackToFrontPage from '@/components/ButtonBackToFrontPage';
import RefreshButton from '@/components/RefreshButton';

const props = defineProps({
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
});

const { state, dispatch } = useStore();
const currentDirection = ref(0);
const timeOfBusStops = ref(null);
const busStopsResults = ref([]);

const busCurrentDirectionStops = computed(() => {
  const filterResults = busStopsResults.value.find(
    (itm) => itm.Direction === currentDirection.value
  );
  return filterResults.Stops;
});

const busStopName = computed(() => {
  const [endStop, startStop] = busStopsResults.value;
  const end = endStop.Stops[0].StopName.Zh_tw;
  const start = startStop ? startStop.Stops[0].StopName.Zh_tw : null;
  return { start, end };
});

const cityName = CITY.find((city) => city.City === props.city).CityName;

const apiPostData = {
  city: props.city,
  route: props.route,
};

watch(
  () => state.map.OSM,
  async (OSM) => {
    if (!OSM) return;
    getBusStopsData();
  },
  { immediate: true }
);

function getBusStopsData() {
  dispatch('showLoader', true);
  dispatch('bus/fetchBusStopOfRoute', apiPostData).then(async (stops) => {
    busStopsResults.value = stops.filter((stop) => stop.RouteUID === props.id);
    await setMap();
  });
}

async function setMap() {
  dispatch('showLoader', true);
  await getBusEstimatedTime();
  await setBusShape();
  dispatch('map/setBusStopsMarker', busCurrentDirectionStops.value);
  setBusMarker();
  dispatch('showLoader', false);
}

function getBusEstimatedTime() {
  dispatch('bus/fetchEstimatedTimeOfArrival', apiPostData).then(
    (estimatedTimeRes) => {
      const estimatedTimeData = estimatedTimeRes.filter(
        (bus) => bus.RouteName.Zh_tw === props.route
      );
      timeOfBusStops.value = formateBusEstimatedTime(estimatedTimeData);
    }
  );
}

function formateBusEstimatedTime(estimatedTime) {
  return busCurrentDirectionStops.value.map((stop) => {
    const directionStopName = stop.StopName.Zh_tw;

    return {
      ...stop,
      detail: estimatedTime.filter(({ StopName, Direction }) => {
        return isCurrentDirectionStop(StopName.Zh_tw, Direction);
      }),
    };

    function isCurrentDirectionStop(estimatedStopName, direction) {
      return (
        estimatedStopName === directionStopName &&
        (String(direction) === 'undefined' ||
          direction === currentDirection.value)
      );
    }
  });
}

function setBusShape() {
  dispatch('bus/fetchBusShape', apiPostData).then((shapeResponse) => {
    for (let i = 0; i < shapeResponse.length; i++) {
      const shape = shapeResponse[i];
      if (isCurrentDirectionShape(shape.RouteUID, shape.Direction)) {
        dispatch('map/setBusRouteShape', shape);
        break;
      }
    }

    function isCurrentDirectionShape(shapeID, shapeDirection) {
      return (
        (shapeID === props.id && String(shapeDirection) === 'undefined') ||
        shapeDirection === currentDirection.value
      );
    }
  });
}

function setBusMarker() {
  dispatch('bus/fetchRealTimeOfArrival', apiPostData).then(
    (busTimeResponse) => {
      dispatch(
        'map/setBusMarker',
        busTimeResponse.filter(
          (itm) => itm.Direction === currentDirection.value
        )
      );
    }
  );
}

async function changeDirection(direction) {
  if (!busStopName.value.end) return;
  currentDirection.value = direction;
  await setMap();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <div v-if="busStopsResults.length !== 0" class="busDetail">
    <div class="top">
      <div class="title">
        <ButtonBackToFrontPage />
        <div class="city">{{ cityName }}</div>
        <div class="route-name">
          <span>{{ route }}</span>
        </div>
      </div>
      <BusStationCard
        :startName="busStopName.start"
        :endName="busStopName.end"
      />
      <BusDirectionButtons
        :currentDirection="currentDirection"
        :changeDirection="changeDirection"
        :startName="busStopName.start"
        :endName="busStopName.end"
      />
    </div>
    <BusStopsList :busStops="timeOfBusStops" />
    <RefreshButton :refreshHandler="setMap" />
  </div>
</template>

<style lang="scss">
@import './BusDetail.scss';
</style>
