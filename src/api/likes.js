import request from "../utils/request";

// 保存点赞信息
export function saveLikes(data) {
  return request({
    url: `/likes/add`, //请求的接口地址
    method: "post", //请求的方式
    data,
  });
}

// 获取点赞信息(数目)
export function getLikesCount(data) {
  return request({
    url: `/likes/count`, //请求的接口地址
    method: "post", //请求的方式
    data,
  });
}

// 获取点赞列表
export function getLikesList(data) {
  return request({
    url: `/likes/list`, //请求的接口地址
    method: "post", //请求的方式
    data,
  });
}

// 改变点赞状态
export function changeLikes(data) {
  return request({
    url: `/likes/changeLikes`, //请求的接口地址
    method: "post", //请求的方式
    data,
  });
}
