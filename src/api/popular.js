import request from "../utils/request";

// 获取动态分页
export function getPopularList(data) {
  return request({
    url: `/popular/list`, //请求的接口地址
    method: "post", //请求的方式
    data,
  });
}

// 查询当前用户关注用户的动态列表
export function getCurrentFollowPopularList() {
  return request({
    url: `/popular/currentFollow`, //请求的接口地址
    method: "get", //请求的方式
  });
}

// 发布动态信息
export function savePopular(data) {
  return request({
    url: `/popular/add`, //请求的接口地址
    method: "post", //请求的方式
    data,
  });
}

// 发布动态信息
export function getPopularDetails(id) {
  return request({
    url: `/popular/get`, //请求的接口地址
    method: "get", //请求的方式
    params: { id },
  });
}
