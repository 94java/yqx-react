import request from "../utils/request";

// 发表评论
export function saveComment(data) {
  return request({
    url: `/comment/add`, //请求的接口地址
    method: "post", //请求的方式
    data,
  });
}

// 获取评论列表
export function getCommentList(data) {
  return request({
    url: `/comment/list`, //请求的接口地址
    method: "post", //请求的方式
    data,
  });
}

// 获取评论数量
export function getCommentCount(data) {
  return request({
    url: `/comment/count`, //请求的接口地址
    method: "post", //请求的方式
    data,
  });
}

