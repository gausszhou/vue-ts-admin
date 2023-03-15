import store from "@/store";

function getAccessMap(): Record<string, boolean> {
  const access: string[] = store.getters.perm;
  const accessMap: any = {}
  access.forEach(item => {
    accessMap[item] = true
  })
  return accessMap
}

export function hasPermission(value: string) {
  const accessMap = getAccessMap();
  return accessMap[value];
}

export function hasPermissionEvery(value: string | string[]) {
  const accessMap = getAccessMap();
  if (typeof value === "string") {
    value = [value];
  }
  return value.every((v) => accessMap[v]);
}

export function hasPermissionSome(value: string | string[]) {
  const accessMap = getAccessMap();
  if (typeof value === "string") {
    value = [value];
  }
  return value.some((v) => accessMap[v]);
}
