import request from "../utils/request";

// 获取笔记分页
export function getNotePage(data) {
  return request({
    url: `/note/page`, //请求的接口地址
    method: "post", //请求的方式
    data: { ...data, status: "1" },
  });
}
