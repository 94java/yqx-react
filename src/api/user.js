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


// 退出登录
export function logout() {
  return request({
    url: `/user/logout`, //请求的接口地址
    method: "post", //请求的方式
  });
}