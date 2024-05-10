import React, { useEffect, useState } from "react";
import {
  NavBar,
  Grid,
  Avatar,
  Space,
  List,
  Dialog,
  Toast,
  Button,
} from "antd-mobile";
import {
  RightOutline,
  FileWrongOutline,
  HeartOutline,
  ClockCircleOutline,
  ExclamationCircleFill,
} from "antd-mobile-icons";

import "./index.less";
import { getCurrentUser, logout } from "../../api/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "../../store/modules/user";
export default function Profile() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const dialog = async () => {
      const result = await Dialog.confirm({
        content: "未登录，请先登录",
      });
      if (result) {
        navigate("/login");
      }
    };
    // 判断是否登录
    if (!localStorage.getItem("token")) {
      // 未登录，提示登录
      dialog();
    }
    getCurrentUser().then((resp) => {
      setUserData(resp.data);
    });
  }, []);
  return (
    <div className="profile">
      <NavBar backArrow={false}>个人信息</NavBar>
      <div
        className="base-info"
        onClick={() => {
          navigate("/user/home?id=" + userData?.id);
        }}
      >
        <div className="user">
          <Avatar src={userData?.avatar} />
          {userData?.nickname}
        </div>
        <Space className="user-home">
          <span>个人主页</span>
          <RightOutline />
        </Space>
      </div>
      {/* 统计数据 */}
      <Grid className="stats" columns={4} gap={2}>
        <Grid.Item>
          <div>12</div>关注
        </Grid.Item>
        <Grid.Item>
          <div>122</div>粉丝
        </Grid.Item>
        <Grid.Item>
          <div>{userData?.visitorCount}</div>访问
        </Grid.Item>
        <Grid.Item>
          <div>1</div>排名
        </Grid.Item>
      </Grid>
      {/* 用户菜单-错题本、点赞、历史记录 */}
      <Grid className="user-nav" columns={3} gap={2}>
        <Grid.Item>
          <FileWrongOutline />
          <div>错题本</div>
        </Grid.Item>
        <Grid.Item>
          <HeartOutline />
          <div>点赞</div>
        </Grid.Item>
        <Grid.Item>
          <ClockCircleOutline />
          <div>历史</div>
        </Grid.Item>
      </Grid>
      {/* 列表 */}
      <List mode="card" className="user-more">
        <List.Item
          onClick={() => {
            Dialog.alert({
              header: (
                <ExclamationCircleFill
                  style={{
                    fontSize: 64,
                    color: "var(--adm-color-warning)",
                  }}
                />
              ),
              title: "注意",
              content: (
                <>
                  <div style={{ marginBottom: "10px" }}>
                    为了便于更好的内容创作和数据展示
                  </div>
                  <div>
                    请前往电脑端
                    <a
                      onClick={() => {
                        navigator.clipboard
                          .writeText("自媒体后台管理系统")
                          .then(() => {
                            Toast.show({ content: "已复制网址到剪切板" });
                          })
                          .catch((error) => {
                            console.error(
                              "Failed to write to clipboard:",
                              error
                            );
                          });
                      }}
                    >
                      自媒体中心
                    </a>
                    进行操作操作指引
                  </div>
                </>
              ),
            });
          }}
        >
          自媒体中心
        </List.Item>
        <List.Item onClick={() => {}}>意见反馈</List.Item>
        <List.Item onClick={() => {}}>帮助中心</List.Item>
        <List.Item
          onClick={() => {
            logout().then((resp) => {
              if (resp.code === 0) {
                Toast.show({ icon: "success", content: "退出成功" });
                // 清除用户数据
                dispatch(clearUserInfo());
                // 跳转到首页
                navigate("/");
              }
            });
          }}
        >
          退出登录
        </List.Item>
      </List>
    </div>
  );
}
