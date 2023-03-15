import i18n from "@/i18n";
import local from "@/utils/local";

const ui = {
  namespaced: true,
  state: {
    title: "",
    locale: "zh",
    titlebar: {
      title: ""
    },
    sidebar: {
      title: "", // title
      fold: true // 展开
    }
  },
  mutations: {
    SET_TITLE(state: any, payload: string) {
      state.title = payload;
    },
    SET_SIDEBAR(state: any, payload: any) {
      state.sidebar = payload;
    },
    SET_LOCALE(state: any, payload: "zh" | "en") {
      state.locale = payload;
      i18n.locale = payload;
      local.set("locale", payload);
    }
  },
  actions: {}
};

export default ui;
