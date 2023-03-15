import dayjs from 'dayjs';

// 定义全局的过滤器
export default {
  install: (Vue:any) => {
    // 大小写转换 也可以使用CSS控制
    Vue.filter("uppercase", (string:string) => string.toUpperCase());    
    Vue.filter("lowercase", (string:string) => string.toLowerCase());
    Vue.filter("upperFirst", (string:string) => string.charAt(0).toUpperCase() + string.slice(1));
    Vue.filter("lowerFirst", (string:string) => string.charAt(0).toLowerCase() + string.slice(1));
    // 处理时间戳 时间戳 ==> 时分秒
    Vue.filter("timestamp", (value:string) => dayjs(value).format("yyyy-MM-DD hh:ss"));
    // 存储单位转换
    Vue.filter("convertBps", (params:string, unit = "bps", fix = 2) => {
      let num = Number(params);
      if (typeof num != "number") return "unknown";
      let arr = ["bps", "Kbps", "Mbps", "Gbps"];
      let index = arr.findIndex((item) => item == unit);
      if (index == -1) return "invalid unit";
      let length = arr.length;
      for (let i = 1; i < length; i++) {
        if (num / Math.pow(2, 10) > 1) {
          num = num / Math.pow(2, 10);
          index++;
        }
      }
      return {number: num.toFixed(fix) , unit: arr[index]};
    });
    Vue.filter("convertByte", (params:string, unit = "Byte", fix = 2) => {
      let num = Number(params);
      if (typeof num != "number") return "unknown";
      let arr = ["Byte", "KB", "MB", "GB", "TB"];
      let index = arr.findIndex((item) => item == unit);
      if (index == -1) return "invalid unit";
      let length = arr.length;
      for (let i = 1; i < length; i++) {
        if (num / Math.pow(2, 10) > 1) {
          num = num / Math.pow(2, 10);
          index++;
        }
      }
      num.toFixed(fix) + arr[index]
    });
  }
};
