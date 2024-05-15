import request from "../utils/request";

// 账号密码登录
export function login(data) {
  return request({
    url: `/user/login`, //请求的接口地址
    method: "post", //请求的方式
    data,
  });
}

// 发送邮箱验证码
export function sendEmailCode(data) {
  return request({
    url: `/user/sendEmailCode`, //请求的接口地址
    method: "post", //请求的方式
    params: data,
  });
}

// 邮箱快捷登录
export function loginByEmail(data) {
  return request({
    url: `/user/loginByEmail`, //请求的接口地址
    method: "post", //请求的方式
    data,
  });
}

// 用户注册
export function register(data) {
  return request({
    url: `/user/register`, //请求的接口地址
    method: "post", //请求的方式
    data,
  });
}

// 获取当前用户信息
export function getCurrentUser() {
  return request({
    url: `/user/currentUser`, //请求的接口地址
    method: "get", //请求的方式
  });
}

// 获取用户排名
export function getUserRange(id) {
  return request({
    url: `/user/getRange`, //请求的接口地址
    method: "get", //请求的方式
    params: { id },
  });
}

// 获取当前用户访客信息
export function getCurrentVistor() {
  return request({
    url: `/user/currentVistor`, //请求的接口地址
    method: "get", //请求的方式
  });
}

// 修改用户信息
export function updateUserInfo(data) {
  return request({
    url: `/user/update`, //请求的接口地址
    method: "post", //请求的方式
    data,
  });
}

// 获取用户详情
export function getUserById(id) {
  return request({
    url: `/user/get`, //请求的接口地址
    method: "get", //请求的方式
    params: { id },
  });
}

// 退出登录
export function logout() {
  return request({
    url: `/user/logout`, //请求的接口地址
    method: "post", //请求的方式
  });
}
