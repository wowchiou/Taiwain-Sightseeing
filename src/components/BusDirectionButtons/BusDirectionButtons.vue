<template>
  <ul class="direction">
    <li :class="{ active: currentDirection === 0 }" @click="changeDirection(0)">
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
</template>

<script>
export default {
  props: {
    currentDirection: {
      type: Number,
      required: true,
    },
    changeDirection: {
      type: Function,
      required: true,
    },
    startName: {
      type: String,
    },
    endName: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
@import './BusDirectionButtons.scss';
</style>
