import i18n from "@/i18n";
import router from "@/router";
import userService from "@/services/user";
import { LoginParams } from "@/types/user";
import message from "@/utils/element/message";

interface UserInfo {
  username: string;
  alias: string;
}

const ui = {
  namespaced: true,
  state: {
    userInfo: {
      username: "",
      alias: ""
    }
  },
  mutations: {
    SET_USER_INFO(state: any, userInfo: UserInfo) {
      state.userInfo = userInfo;
    }
  },
  actions: {
    login(store: any, userInfo: LoginParams) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        userService.login({ username: username.trim(), password: password.trim() }).then((res) => {
          store.commit("SET_USER_INFO", res.data.data as UserInfo);
          message.success(i18n.t("tips.loginSuccess"));
          setTimeout(() => {
            router.replace({ name: "home" });
          }, 300);
          resolve(res);
        });
      });
    },
    logout(store: any) {
      return new Promise((resolve, reject) => {
        userService.logout().finally(() => {
          store.commit("SET_USER_INFO", {});
          message.success(i18n.t("tips.logoutSuccess"));
          setTimeout(() => {
            router.push({ name: "login" });
          }, 300);
        });
      });
    }
  }
};

export default ui;
