<template>
  <div class="dashboard-container" v-resize="resize">
    <el-row>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <ChartRaddar ref="ChartRaddar" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <ChartPie ref="ChartPie" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <ChartBar ref="ChartBar" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChartRaddar from "./components/ChartRaddar";
import ChartPie from "./components/ChartPie";
import ChartBar from "./components/ChartBar";
export default {
  name: "Dashboard",
  components: {
    ChartRaddar,
    ChartPie,
    ChartBar
  },
  methods: {
    resize() {
      this.$refs.ChartRaddar.resize();
      this.$refs.ChartPie.resize();
      this.$refs.ChartBar.resize();
    }
  }
};
</script>

<style lang="scss" scoped>
.chart-wrapper {
  background: #ffffff;
  padding: 16px 16px;
}
</style>
