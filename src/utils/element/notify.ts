// 通知提示，看情况是否做处理
import { Notification } from "element-ui";

let notifyInstance: any = null;
const proxyNotification = (options: any) => {
  notifyInstance = Notification(options);
};

export default proxyNotification;
