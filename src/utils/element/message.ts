// 重置 message，防止重复点击重复弹出 message 弹框
// this.$message.success("add some message")
import type { TranslateResult } from "vue-i18n";
import { Message } from "element-ui";

// 唯一实例
let messageInstance: any = null;
const singletonMessage = function (options: any) {
  //如果弹窗已存在先关闭
  if (messageInstance) {
    messageInstance.close();
  }
  messageInstance = Message(options);
};

// 简化使用方法
const messageTypes = ["success", "warning", "info", "error"];
const simpleMessage: any = {};
messageTypes.forEach(function (type) {
  simpleMessage[type] = function (options: any) {
    if (typeof options === "string") {
      options = {
        message: options
      };
    }
    options.type = type;
    return singletonMessage(options);
  };
});

export default simpleMessage;
