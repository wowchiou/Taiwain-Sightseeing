<script setup>
import { ref, computed, watch, defineProps } from 'vue';
import { useStore } from 'vuex';
import CITY from '@/utils/city.json';
import helper from '@/helpers/components/BusDetail.helper.js';

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

const apiPostData = {
  city: props.city,
  route: props.route,
};

watch(
  () => state.map.OSM,
  async (OSM) => {
    if (!OSM) return;
    dispatch('showLoader', true);
    dispatch('bus/fetchBusStopOfRoute', apiPostData).then((stops) => {
      busStopsResults.value = helper.getCurrentRouteBusStops(stops, props.id);
      setMap();
    });
  },
  { immediate: true }
);

async function setMap() {
  dispatch('showLoader', true);
  await getBusEstimatedTime();
  await setBusShape();
  dispatch('map/setBusStopsMarker', busCurrentDirectionStops.value);
  setBusMarker();
  dispatch('showLoader', false);
}

function getBusEstimatedTime() {
  dispatch('bus/fetchEstimatedTimeOfArrival', apiPostData).then((res) => {
    const currentRoute = props.route;
    const estimatedData = helper.getCurrentRouteEstimateTime(res, currentRoute);
    timeOfBusStops.value = formateBusEstimatedTime(estimatedData);
  });
}

function formateBusEstimatedTime(estimatedTime) {
  return busCurrentDirectionStops.value.map((stop) => {
    return {
      ...stop,
      detail: estimatedTime.filter(({ StopName, Direction }) => {
        return helper.isCurrentDirectionStop({
          estimatedStopName: StopName.Zh_tw,
          estimatedDirection: Direction,
          currentStopName: stop.StopName.Zh_tw,
          currentDirection: currentDirection.value,
        });
      }),
    };
  });
}

function setBusShape() {
  dispatch('bus/fetchBusShape', apiPostData).then((shapeResponse) => {
    for (let i = 0; i < shapeResponse.length; i++) {
      const shape = shapeResponse[i];
      if (
        helper.isCurrentDirectionShape({
          shapeRouteID: shape.RouteUID,
          shapeDirection: shape.Direction,
          currentRouteID: props.id,
          currentDirection: currentDirection.value,
        })
      ) {
        dispatch('map/setBusRouteShape', shape);
        break;
      }
    }
  });
}

function setBusMarker() {
  dispatch('bus/fetchRealTimeOfArrival', apiPostData).then(
    (busTimeResponse) => {
      const currentBusTime = helper.getCurrentDirectionBusTime(
        busTimeResponse,
        currentDirection.value
      );
      dispatch('map/setBusMarker', currentBusTime);
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
        <div class="city">{{ helper.getCityChineseName(CITY, city) }}</div>
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
