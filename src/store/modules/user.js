// 用户相关的状态管理

import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "../../api/user";

const userStore = createSlice({
  // 当前模块名
  name: "user",
  // 数据状态：
  initialState: {
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
  },
  // 同步修改方法
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.userInfo = {};
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
    },
  },
});

// 解构出 actionCreater
const { setUserInfo, clearUserInfo } = userStore.actions;

// 获取reducer函数
const userReducer = userStore.reducer;

// 获取用户信息异步方法
const getCurrentUserInfo = () => {
  return async (dispatch) => {
    const res = await getCurrentUser();
    dispatch(setUserInfo(res.data));
  };
};

export { getCurrentUserInfo, setUserInfo, clearUserInfo };

export default userReducer;
