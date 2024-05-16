import request from "../utils/request";

// 获取视频分页
export function getVideoPage(data) {
  return request({
    url: `/video/page`, //请求的接口地址
    method: "post", //请求的方式
    data: { ...data, status: "1" },
  });
}

// 获取视频列表
export function getVideoList(data) {
  return request({
    url: `/video/list`, //请求的接口地址
    method: "post", //请求的方式
    data: { ...data, status: "1" },
  });
}
// 获取视频详情
export function getVideoById(id) {
  return request({
    url: `/video/get`, //请求的接口地址
    method: "get", //请求的方式
    params: { id },
  });
}

// 获取推荐视频信息
export function getVideoByUserCF(id) {
  return request({
    url: `/video/getVideoByUserCF`, //请求的接口地址
    method: "get", //请求的方式
    params: { videoId: id },
  });
}
