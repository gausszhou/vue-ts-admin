/**
 * auth指令 v-auth="Array or String"
 * 传入的权限码可以是数组或者是字符串
 * 此外还有两个修饰符 some 和 every
 * v-auth.some="Array" 表示满足其中一个资源即可（不设置修饰符情况下默认为some）
 * v-auth.every= "Array" 表示列表的所资源必须存在
 * 调用实例：
 *  1. <button v-auth="'module1'"></button>
 *  2. <button v-auth="['module1', 'module2']"></button>
 *  3. <button v-auth.some="['module1', 'module2']"></button>
 *  4. <button v-auth.every="['module1', 'module2']"></button> 同时拥有 module1 和 module2 权限
 *  其中 2、3 等价
 */

import { DirectiveBinding } from "@/types";
import { hasPermissionSome, hasPermissionEvery } from "@/utils/permission";

// 删除节点
const remove = (el: HTMLElement) => el.parentNode?.removeChild(el);

export default {
  inserted: (el: HTMLElement, binding: DirectiveBinding) => {
    // 获取传入的权限码 value（string or array）和修饰符modifiers
    let { value, modifiers } = binding;

    // 判断条件：当传入的值不是数组或者字符串时，直接隐藏元素
    if (!(typeof value === "string" || value instanceof Array) || !value) {
      remove(el);
      return console.error("please set the value to a string or array.");
    }

    // 判断条件：如果传入的权限码是string则转化成数组
    if (typeof value === "string") {
      value = [value];
    }
    // 判断条件
    // 当使用 every 修饰符时，需要通过 hasPermissionEvery 检验，否则移除
    // 当没有 every 修饰符时，需要通过 hasPermissionSome 检验，否则移除
    if ((modifiers.every && !hasPermissionEvery(value)) || (!modifiers.every && !hasPermissionSome(value))) {
      remove(el);
    }
  }
};
