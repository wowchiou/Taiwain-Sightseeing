<template>
  <div class="container">
    <TheNavigation v-if="$route.meta.requireMenu" />
    <router-view></router-view>
  </div>
</template>

<script>
// import { useStore } from 'vuex';
import TheNavigation from '@/components/TheNavigation';
import { http } from '@/service';

export default {
  components: {
    TheNavigation,
  },
  async created() {
    http
      .get('https://gist.motc.gov.tw/gist_api/V3/Map/Basic/City')
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    await this.$store.dispatch('fetchCity').catch((err) => console.log(err));
  },
  setup() {
    // const store = useStore();
    // store.dispatch('fetchCity').catch((err) => console.log(err));
  },
};
</script>
