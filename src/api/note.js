import request from "../utils/request";

// 获取笔记分页
export function getNotePage(data) {
  return request({
    url: `/note/page`, //请求的接口地址
    method: "post", //请求的方式
    data: { ...data, status: "1" },
  });
}

// 获取笔记列表
export function getNoteList(data) {
  return request({
    url: `/note/list`, //请求的接口地址
    method: "post", //请求的方式
    data: { ...data, status: "1" },
  });
}

// 获取笔记详情
export function getNoteById(id) {
  return request({
    url: `/note/get`, //请求的接口地址
    method: "get", //请求的方式
    params: { id },
  });
}
