import Cookies from "js-cookie";

const debug = process.env.NODE_ENV != "production";

const get = (key:string) => {
  return Cookies.get(key);
};

const set = (key:string, data:string) => {
  if (debug) console.log("[debug] cookie.set", key, data);
  return Cookies.set(key, data);
};

const remove = (key:string):void => {
  if (debug) console.log("[debug] cookie.remove", key);
  return Cookies.remove(key);
};

export default {get ,set, remove};
