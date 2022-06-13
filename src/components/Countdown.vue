<template>
  <div class="countdown_component">
    <div class="display">
      <div class="content" :style="{ 'font-size': fontSize }">
        {{ remind_count }}
      </div>
    </div>
    <div class="operation">
      <el-button type="primary" size="large" @click="cancelHandle">
        取 消
      </el-button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Countdown",
  props: {
    count: Number,
    interval: {
      type: Number,
      default: 1000,
    },
    fontSize: {
      type: String,
      default: "150pt",
    },
  },
  data() {
    return {
      remind_count: 0,
      timer: null,
    };
  },
  created() {
    this.remind_count = this.count;

    this.timer = setInterval(() => {
      this.remind_count--;

      if (this.remind_count == 0) {
        clearInterval(this.timer);

        this.$emit("finish");
      }
    }, this.interval);
  },
  methods: {
    cancelHandle() {
      clearInterval(this.timer);

      this.$emit("cancel");
    },
  },
});
</script>

<style scoped>
.countdown_component {
  position: fixed;
  z-index: 1024;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
}

.countdown_component .display {
  flex: 1;
}

.countdown_component .content {
  font-size: 150pt;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.countdown_component .operation {
  display: flex;
  justify-content: center;
  padding: 200px 0;
}
</style>
