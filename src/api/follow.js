import request from "../utils/request";

// 保存关注信息
export function saveFollow(data) {
  return request({
    url: `/follow/add`, //请求的接口地址
    method: "post", //请求的方式
    data,
  });
}

// 获取关注信息(数目)
export function getFollowCount(data) {
  return request({
    url: `/follow/count`, //请求的接口地址
    method: "post", //请求的方式
    data,
  });
}

// 获取当前登录用户关注列表
export function getCurrentFollows() {
  return request({
    url: `/follow/getCurrentFollows`, //请求的接口地址
    method: "get", //请求的方式
  });
}

// 查询当前登录用户关注列表（最近活跃 TOP10-动态）
export function getCurrentFollowsActivity() {
  return request({
    url: `/follow/getCurrentFollowsActivity`, //请求的接口地址
    method: "get", //请求的方式
  });
}

// 获取当前登录用户粉丝列表
export function getCurrentFans() {
  return request({
    url: `/follow/getCurrentFans`, //请求的接口地址
    method: "get", //请求的方式
  });
}

// 改变关注状态
export function changeFollow(data) {
  return request({
    url: `/follow/changeFollow`, //请求的接口地址
    method: "post", //请求的方式
    data,
  });
}
