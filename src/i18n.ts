import Vue from 'vue';;
import VueI18n from 'vue-i18n';

import ElementLocale from 'element-ui/lib/locale';
import ElementZhLocaleMessage from 'element-ui/lib/locale/lang/zh-CN';
import ElementEnLocaleMessage from 'element-ui/lib/locale/lang/en';

import SystemZhLocale from '@/assets/lang/zh/index.json';
import SystemEnLocale from '@/assets/lang/en/index.json';

Vue.use(VueI18n)

const messages = {
  zh: {
    ...SystemZhLocale,
    ...ElementZhLocaleMessage
  },
  en: {
    ...SystemEnLocale,
    ...ElementEnLocaleMessage
  },
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'zh', // set locale
  messages, // set locale messages
})

ElementLocale.i18n((key:string, value:any) => i18n.t(key, value))

export default i18n;