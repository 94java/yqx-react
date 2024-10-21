import request from "../utils/request";

// 获取题库分页
export function getBankPage(data) {
  return request({
    url: `/questionBank/page`, //请求的接口地址
    method: "post", //请求的方式
    data: { ...data, status: "1" },
  });
}
// 获取题库列表
export function getBankList(data) {
  return request({
    url: `/questionBank/list`, //请求的接口地址
    method: "post", //请求的方式
    data: { ...data, status: "1" },
  });
}
// 获取题库详情
export function getBankById(id) {
  return request({
    url: `/questionBank/get`, //请求的接口地址
    method: "get", //请求的方式
    params: { id },
  });
}
