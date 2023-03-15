// Element UI

import Message from "./message";
import Notify from "./notify";
import Validation from "./validation";


export default {
  install: (Vue: any) => {

    Vue.use(Validation);
    Vue.prototype.$message = Message;
    Vue.prototype.$notify = Notify;
  }
};

// 按需引入 Element UI
// import EleComponents from '@/components';
// Vue.use(EleComponents)

// 语言配置
// import ElementLocale from 'element-ui/lib/locale';
// ElementLocale.i18n((key, value) => i18n.t(key, value));
