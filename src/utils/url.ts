/**
 * 将一个 Object 转为 URLString
 * @param {Object} params
 * @returns {String}
 */

import type { PlainObject } from "@/types";

export function serialize(params: PlainObject) {
  if (!params || Object.prototype.toString.call(params) != "[object Object]") {
    return "";
  }
  const list: string[] = []
  Object.entries(params).forEach(([k, v]) => {
    if (
      Object.prototype.toString.call(v) === "[object Object]" ||
      Object.prototype.toString.call(v) === "[object Array]"
    ) {
      throw new Error("value should be simple data type");
    } else {
      list.push(`${k}=${v}`)
    }
  });
  return '?' + list.join('&');
}

/**
 * 递归的将一个 Object 的 String 进行 encodeURIComponent
 * @param { Object } obj
 * @returns { Object }
 */

export function encodeURIDeep(obj: any) {

  function encodeURIRecursion(obj: any) {
    if (typeof obj == "object") {
      for (let key in obj) {
        obj[key] = encodeURIRecursion(obj[key]);
      }
    }
    if (typeof obj == "string") {
      return encodeURIComponent(obj);
    }
    return obj;
  }

  const objEncode = encodeURIRecursion(obj);
  return objEncode;
}