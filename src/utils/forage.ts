import localforage from "localforage";

const forageInstance = localforage.createInstance({
  name: "admin"
});

const debug = process.env.NODE_ENV !== "production";

const get = (key: string) => {
  const json = forageInstance.getItem(key);
  if (typeof json === 'string') {
    try {
      const result = JSON.parse(json);
      return result;
    } catch (error) {
      return null
    }
  }
  return null;
};

const set = (key: string, data: any) => {
  let json = JSON.stringify(data);
  if (debug) console.log("[debug] forage.set", key, data);
  return forageInstance.setItem(key, json);
};

const remove = (key: string) => {
  if (debug) console.log("[debug] forage.remove", key);
  return forageInstance.removeItem(key);
};

const clear = () => {
  if (debug) console.log("[debug] forage.clear");
  return forageInstance.clear();
};

export default { get, set, remove, clear };
