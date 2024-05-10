import request from "../utils/request";

// 获取题目列表
export function getSubjectList(data) {
  return request({
    url: `/subject/list`, //请求的接口地址
    method: "post", //请求的方式
    data
  });
}
