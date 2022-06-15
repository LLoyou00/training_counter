<template>
  <div class="training_counter">
    <Countdown
      v-if="countdown_switch"
      :count="section_time"
      @cancel="countdown_switch = 0"
      @finish="(countdown_switch = 0), section_count++"
    />

    <div class="header">
      <Timer :seconds="training_time" fontSize="80pt" />

      <div class="operation">
        <el-button v-if="!timing" type="primary" @click="beginHandle">
          开 始
        </el-button>

        <el-button v-else type="primary" @click="pauseHandle">
          暂 停
        </el-button>

        <el-button type="primary" @click="finishHandle"> 结 束 </el-button>
      </div>
    </div>

    <div class="row">
      <div class="label">小节时长(秒):</div>
      <div class="value">
        <el-input-number v-model="section_time" />
      </div>
    </div>

    <div class="row">
      <div class="label">每轮小节数:</div>
      <div class="value">
        <el-input-number v-model="round_section" />
      </div>
    </div>

    <div class="row">
      <div class="label">小节计数:</div>
      <div class="value">
        <el-input-number v-model="section_count" />
      </div>
    </div>

    <div class="row">
      <div class="label">轮次计数:</div>
      <div class="value">
        <span class="number"> {{ round_count }}</span>
      </div>
    </div>

    <div class="operation">
      <el-button type="primary" size="large" @click="sectionTimingHandle">
        小 节 计 时
      </el-button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Timer from "./components/Timer.vue";
import Countdown from "./components/Countdown.vue";

export default defineComponent({
  name: "App",
  components: {
    Timer,
    Countdown,
  },
  data() {
    return {
      timer: null,
      timing: false,
      training_time: 0,
      countdown_switch: 0,
      section_time: 10,
      section_count: 0,
      round_section: 2,
    };
  },
  computed: {
    round_count() {
      return Math.floor(this.section_count / this.round_section);
    },
  },
  created() {},
  methods: {
    beginHandle() {
      this.timer = setInterval(() => {
        this.training_time++;
      }, 1000);

      this.timing = true;
    },
    pauseHandle() {
      clearInterval(this.timer);

      this.timing = false;
    },
    finishHandle() {
      clearInterval(this.timer);

      this.timing = false;
    },
    sectionTimingHandle() {
      this.countdown_switch = 1;

      if (!this.timing) {
        this.beginHandle();
      }
    },
  },
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<style scoped>
.training_counter {
  padding: 0 20px;
}

.header {
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.row {
  display: flex;
  align-items: center;
  padding: 10px 0;
}

.row .label {
  font-size: 15pt;
  font-weight: bolder;
  width: 150px;
  text-align: right;
}

.row .value {
  margin-left: 20px;
}

.row .value .number {
  font-size: 20pt;
  font-weight: bolder;
}

.training_counter .operation {
  padding: 20px;
  display: flex;
  justify-content: center;
}
</style>
