import {
  AddRoleParams,
  AddUserParams,
  DeleteRoleParams,
  DeleteUserParams,
  GetRoleItemQuery,
  GetRoleListQuery,
  GetUserItemQuery,
  GetUserListQuery,
  LoginParams,
  SetRoleParams,
  SetUserParams
} from "@/types/user";
import axios from "@/utils/axios";
import { serialize } from "@/utils/url";

const serverUrl = "/api/";

const userService = {
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

export default userService;
