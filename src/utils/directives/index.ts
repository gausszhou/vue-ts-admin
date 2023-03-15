import resize from 'vue-resize-directive';
import visible from './visible';

export default {
  install: (Vue: any) => {
    Vue.directive("resize", resize);
    Vue.directive("visible", visible); 
  }
};