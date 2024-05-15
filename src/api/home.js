import request from '../utils/request'

// 获取轮播图信息
export function getSwipper() {
  return request({
    url: `/video/swipper`, //请求的接口地址
    method: 'get', //请求的方式
  })
}

// 获取推荐视频信息
export function getRecommendVideo() {
  return request({
    url: `/video/recommend`, //请求的接口地址
    method: "get", //请求的方式
  });
}

// 获取活跃用户信息
export function getActivityUser() {
  return request({
    url: `/user/activityUser`, //请求的接口地址
    method: 'get', //请求的方式
  })
}

// 获取推荐笔记信息
export function getRecommendNote() {
  return request({
    url: `/note/recommend`,  //请求的接口地址
    method: 'get',     //请求的方式
  })
}