import request from "../utils/request";

// 获取错题列表
export function getWrongList(data) {
  return request({
    url: `/wrong/list`, //请求的接口地址
    method: "post", //请求的方式
    data,
  });
}

// 获取错题列表
export function getCurWrongBanks() {
  return request({
    url: `/wrong/currentWrongBanks`, //请求的接口地址
    method: "get", //请求的方式
  });
}

// 保存错题信息
export function saveWrong(data) {
  return request({
    url: `/wrong/add`, //请求的接口地址
    method: "post", //请求的方式
    data,
  });
}

// 删除错题记录
export function deleteWrong(data) {
  return request({
    url: `/wrong/delete`, //请求的接口地址
    method: "post", //请求的方式
    data,
  });
}

// 修改错题次数
export function changeWrongCount(data) {
  return request({
    url: `/wrong/changeWrongCount`, //请求的接口地址
    method: "post", //请求的方式
    data,
  });
}
