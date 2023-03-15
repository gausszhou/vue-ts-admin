import i18n from '@/i18n';
import store from "@/store";
import message from "@/utils/element/message";
import axios from "axios";

const instance = axios.create({
  timeout: 10 * 1000,
  withCredentials: true
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    /*返回错误信息*/
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    if (res.data.result == "error") {
      if (res.data.code) {
        processErrorCode(res.data.code);
      } else if (res.data.msg) {
        processErrorMsg(res.data.msg);
      }
      return Promise.reject(res);
    }
    return Promise.resolve(res);
  },
  (error) => {
    return Promise.reject(error);
  }
);

function processErrorCode(code: string | number) {
  switch (code) {
    case 1101:
      store.dispatch("logout");
      break;
    default:
      break;
  }
  const msg = i18n.t(`errorCode.${code}`)
  message.error(msg);
}

function processErrorMsg(msg: string) {
  message.error(msg);
}

export default instance;
