import { PlainObject } from "@/types";
import axios from "@/utils/axios";
import { serialize } from "@/utils/url";
import { AxiosRequestConfig } from "axios";

const serverUrl = "/api/";

interface LoginParams extends AxiosRequestConfig<any> {
  username: string;
  password: string;
}

interface GetListQuery extends PlainObject {
  page: number;
  limit: number;
}

type GetUserListQuery = GetListQuery;
type GetRoleListQuery = GetListQuery;

interface GetItemQuery extends PlainObject {
  id: number | string;
}

type GetUserItemQuery = GetItemQuery;
type GetRoleItemQuery = GetItemQuery;

interface DeleteItemParams extends AxiosRequestConfig<any> {
  id: number | string;
}

type DeleteUserParams = DeleteItemParams;
type DeleteRoleParams = DeleteUserParams;

interface AddUserParams {
  username: string;
  password: string;
  alias: string; // 展示名称
  roleId: string;
}

interface SetUserParams {
  id: string;
  username: string;
  password: string;
  alias: string; // 展示名称
  roleId: string;
}

interface AddRoleParams {
  rolename: string;
  alias: string; // 展示名称
  permission: string[];
}

interface SetRoleParams {
  id: string;
  rolename: string;
  alias: string; // 展示名称
  permission: string[];
}

export default {
  //---------------------login/logout----------------------
  login: (params: LoginParams) => axios.post(serverUrl + "user/login", params),
  logout: () => axios.post(serverUrl + "user/logout"),

  //---------------------permission----------------------
  getPermList: () => axios.get(serverUrl + "permission"),

  //---------------------user----------------------
  getUserList: (query: GetUserListQuery) => axios.get(serverUrl + "user/list" + serialize(query)),
  addUser: (params: AddUserParams) => axios.post(serverUrl + "user/add", params),
  delUser: (params: DeleteUserParams) => axios.delete(serverUrl + "user/del", params),
  //
  getUser: (params: GetUserItemQuery) => axios.get(serverUrl + "user/detail" + serialize(params)),
  setUser: (params: SetUserParams) => axios.patch(serverUrl + "user/set", params),

  //---------------------role----------------------
  getRoleList: (query: GetRoleListQuery) => axios.get(serverUrl + "role/list" + serialize(query)),
  addRole: (params: AddRoleParams) => axios.post(serverUrl + "role/add", params),
  delRole: (params: DeleteRoleParams) => axios.post(serverUrl + "role/del", params),
  //
  getRoleData: (query: GetRoleItemQuery) => axios.get(serverUrl + "role/detail" + serialize(query)),
  setRoleData: (params: SetRoleParams) => axios.patch(serverUrl + "role/set", params)
};
