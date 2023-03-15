import { PlainObject } from "@/types";
import { AxiosRequestConfig } from "axios";

export interface LoginParams extends AxiosRequestConfig<any> {
  username: string;
  password: string;
}

export interface GetListQuery extends PlainObject {
  page: number;
  limit: number;
}

export type GetUserListQuery = GetListQuery;
export type GetRoleListQuery = GetListQuery;

export interface GetItemQuery extends PlainObject {
  id: number | string;
}

export type GetUserItemQuery = GetItemQuery;
export type GetRoleItemQuery = GetItemQuery;

export interface DeleteItemParams extends AxiosRequestConfig<any> {
  id: number | string;
}

export type DeleteUserParams = DeleteItemParams;
export type DeleteRoleParams = DeleteUserParams;

export interface AddUserParams {
  username: string;
  password: string;
  alias: string; // 展示名称
  roleId: string;
}

export interface SetUserParams {
  id: string;
  username: string;
  password: string;
  alias: string; // 展示名称
  roleId: string;
}

export interface AddRoleParams {
  rolename: string;
  alias: string; // 展示名称
  permission: string[];
}

export interface SetRoleParams {
  id: string;
  rolename: string;
  alias: string; // 展示名称
  permission: string[];
}
