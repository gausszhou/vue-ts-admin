import Vue from 'vue';
import type { Route, RouteConfig } from 'vue-router';
import VueRouter from 'vue-router';
import NProgress from "@/utils/nprogress";
import userService from "@/services/user";
import i18n from "@/i18n";
import store from "@/store";
import cookie from "@/utils/cookie";
import config, { setSubTitle } from "@/config";
import Login from "@/layouts/Login.vue";
import Default from "@/layouts/Default.vue";
import Dashboard from "@/views/dashboard/index.vue";

Vue.use(VueRouter)

export const constantRoutes: Array<RouteConfig> = [
  {
    path: "",
    redirect: { name: "home" }
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/",
    component: Default,
    name: "home",
    meta: { title: "nav.dashboard", icon: "icon-dashboard" },
    redirect: { name: "dashboard" },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: { title: "nav.dashboard", icon: "icon-dashboard" }
      }
    ]
  },
  // {
  //   path: "/user",
  //   name: "userManage",
  //   meta: { title: "nav.userManage", icon: "icon-user" },
  //   component: Default,
  //   children: [
  //     {
  //       path: "list",
  //       name: "userList",
  //       meta: { title: "nav.userList" },
  //       component: (resolve) => require(["@/views/user/userList"], resolve)
  //     },
  //     {
  //       path: "roles",
  //       name: "roleList",
  //       meta: { title: "nav.roleList" },
  //       component: (resolve) => require(["@/views/user/userRoles"], resolve)
  //     },
  //     {
  //       path: "departments",
  //       name: "departmentList",
  //       meta: { title: "nav.departmentList" },
  //       component: (resolve) => require(["@/views/user/userDepartments"], resolve)
  //     }
  //   ]
  // },
  { path: "*", redirect: "/", meta: { hidden: true } }
];

const router = new VueRouter({
  mode: "hash",
  // scrollBehavior: () => ({ y: 0 }),
  //   base: process.env.BASE_URL,
  routes: constantRoutes
});

// 配置路由钩子
router.beforeEach(async (to: Route, from: Route, next: Function) => {
  NProgress.start();
  // 标题栏
  await documentTitleMiddleware(to, from, next);
  // await getUserPermission();
  // 登录检测中间件
  // await loginMiddleWare(to, from, next);
  next();
});

router.afterEach(() => {
  NProgress.done();
});

function documentTitleMiddleware(to: Route, from: Route, next: Function) {
  setSubTitle(i18n.t(`${to.meta?.title}`) as  string);
}

function getUserPermission(){

}

function loginMiddleWare(to: Route, from: Route, next: Function) {

}

export default router
