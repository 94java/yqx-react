//引入axios
import axios from "axios";
import { Toast } from "antd-mobile";

// // cdn域名
// const baseFileUrl = 'http://images.jiusi.cc'
// // 文件字段集合
// const fields = ["coverImg","url","avatar","contentImg"]
// 创建axios实例
const axiosEp = axios.create({
  //base接口，表示请求URL的公共部分
  baseURL: "http://127.0.0.1:8866/api/",
  // 超时
  timeout: 30000,
  withCredentials: true,
  //还可以进行一些其他的配置
});

// 请求拦截器
axiosEp.interceptors.request.use(
  (config) => {
    //配置请求头，以下是一个示例，设置语言为简体中文
    config.headers.lang = "zh-CN";
    // 请求头携带token信息
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Token = token;
    }
    //对请求数据进行处理

    return config;
  },
  (error) => {
    console.log("请求拦截器错误", error);
    //请求拦截错误处理
  }
);

// 响应拦截器
axiosEp.interceptors.response.use(
  async (res) => {
    //根据自己的需求进行代码的编写，以下是一些示例

    // 获取错误信息
    const { code, message } = res.data;
    //通过响应码的不同进行不同的处理
    if (code !== 0) {
      // 错误
      Toast.show({
        icon: "fail",
        content: message,
      });
      return false;
    } else {
      // 成功
      // // 对含有图片的数据添加前缀
      // if (data instanceof Array) {
      //   for (let i = 0; i < data.length; i++) {
      //     for (let key in data[i]) {
      //       if (fields.includes(key)) {
      //         data[i][key] = baseFileUrl + data[i][key];
      //       }
      //       // 针对含二级对象的链接添加前缀
      //       if (key === 'user') {
      //         data[i][key]['avatar'] = baseFileUrl + data[i][key]['avatar'];
      //       }
      //     }
      //   }
      // }
      return res.data;
    }
  },
  async (error) => {
    //响应发生错误时的处理
    // 错误
    Toast.show({
      icon: "fail",
      content: error.message,
    });
    return false;
  }
);

export default axiosEp;
