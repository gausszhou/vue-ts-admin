// sessionStorage
const debug = process.env.NODE_ENV != "production";

const get = (key:string) => {
  let json = sessionStorage.getItem(key);
  let result;
  if(typeof json ==='string'){
    try { 
      result = JSON.parse(json);
    } catch (error) {
      result = false;
    }
  }
  return result;
};

const set = (key:string, data:string) => {
  let value = JSON.stringify(data);
  if (debug) console.log("[debug] local.set", key, data);
  return sessionStorage.setItem(key, value);
};

const remove = (key:string) => {
  if (debug) console.log("[debug] local.remove", key);
  return sessionStorage.removeItem(key);
};

const clear = () => {
  if (debug) console.log("[debug] local.clear");
  return sessionStorage.clear();
};

export default { get ,set ,remove, clear};
