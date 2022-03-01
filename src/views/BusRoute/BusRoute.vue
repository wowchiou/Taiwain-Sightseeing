<template>
  <MapLayout></MapLayout>
</template>

<script>
import { useStore } from 'vuex';
import MapLayout from '@/layouts/MapLayout';

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
  async setup(props) {
    const store = useStore();
    const apiPostData = {
      city: props.city,
      route: props.route,
    };

    const busTimeResponse = await store.dispatch(
      'bus/fetchBusTimeOfArrival',
      apiPostData
    );

    console.log('fetchBusTimeOfArrival', busTimeResponse);

    const busStopResponse = await store.dispatch(
      'bus/fetchBusStopOfRoute',
      apiPostData
    );

    console.log('fetchBusStopOfRoute', busStopResponse);

    const cityStopResponse = await store.dispatch(
      'bus/fetchBusCityStop',
      props.city
    );

    console.log(cityStopResponse);

    const busStop = cityStopResponse.filter((bus) => bus.RouteUID === props.id);

    console.log('busStop', busStop);

    const displayStopResponse = await store.dispatch(
      'bus/fetchDisplayStopOfRoute',
      apiPostData
    );

    console.log('fetchDisplayStopOfRoute', displayStopResponse);
  },
};
</script>

<style lang="scss" scoped>
@import './BusRoute.scss';
</style>
