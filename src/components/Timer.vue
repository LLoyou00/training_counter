<template>
  <div class="timer_component" :style="{ 'font-size': fontSize }">
    <template v-if="hours_str !== '00'">
      <span class="needle">
        {{ hours_str }}
      </span>
      <span class="divide">:</span>
    </template>

    <span class="needle">{{ minutes_str }}</span>

    <span class="divide">:</span>

    <span class="needle">{{ seconds_str }}</span>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Timer",
  props: {
    seconds: Number,
    fontSize: String,
  },
  computed: {
    hours_str() {
      return ("0" + Math.floor(this.seconds / 3600)).slice(-2);
    },
    minutes_str() {
      return ("0" + Math.floor((this.seconds % 3600) / 60)).slice(-2);
    },
    seconds_str() {
      return ("0" + Math.floor((this.seconds % 3600) % 60)).slice(-2);
    },
  },
});
</script>

<style scoped>
.timer_component {
  display: flex;
  align-content: center;
  font-weight: bolder;
  font-family: Menlo, Monaco, "Courier New", monospace;
}
</style>
