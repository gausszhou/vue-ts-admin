<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import "echarts/theme/macarons";
const animationDuration = 6000;
const optionBar = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    top: 10,
    left: "2%",
    right: "2%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: [
    {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: "value",
      axisTick: {
        show: false
      }
    }
  ],
  series: [
    {
      name: "pageA",
      type: "bar",
      stack: "vistors",
      barWidth: "60%",
      data: [79, 52, 200, 334, 390, 330, 220],
      animationDuration
    },
    {
      name: "pageB",
      type: "bar",
      stack: "vistors",
      barWidth: "60%",
      data: [80, 52, 200, 334, 390, 330, 220],
      animationDuration
    },
    {
      name: "pageC",
      type: "bar",
      stack: "vistors",
      barWidth: "60%",
      data: [30, 52, 200, 334, 390, 330, 220],
      animationDuration
    }
  ]
};
export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "300px"
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      this.chartInstance && debounce(this.chartInstance.resize(), 1, true);
    },
    initChart() {
      this.chartInstance = echarts.init(this.$el, "macarons");
      this.chartInstance.setOption(optionBar);
    }
  }
};
</script>
