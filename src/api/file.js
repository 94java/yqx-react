import request from "../utils/request";

// 上传文件
export function upload(data) {
  return request({
    url: `/file/upload`, //请求的接口地址
    method: "post", //请求的方式
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
