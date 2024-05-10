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


// 改变关注状态
export function changeFollow(data) {
  return request({
    url: `/follow/changeFollow`, //请求的接口地址
    method: "post", //请求的方式
    data,
  });
}