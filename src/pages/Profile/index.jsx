import React, { useEffect, useState } from "react";
import { NavBar, Grid, Avatar, Space, List, Dialog, Toast } from "antd-mobile";
import {
  RightOutline,
  FileWrongOutline,
  HeartOutline,
  ClockCircleOutline,
  ExclamationCircleFill,
} from "antd-mobile-icons";

import "./index.less";
import { getCurrentUser, getUserRange, logout } from "../../api/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "../../store/modules/user";
import { getFollowCount } from "../../api/follow";
export default function Profile() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fansCount, setFansCount] = useState(0);
  const [range, setRange] = useState(0);
  const [followCount, setFollowCount] = useState(0);
  const dialog = async () => {
    const result = await Dialog.confirm({
      content: "未登录，请先登录",
    });
    if (result) {
      navigate("/login");
    } else {
      navigate(-1);
    }
  };
  useEffect(() => {
    getCurrentUser().then((resp) => {
      // 判断是否登录
      if (!resp.data) {
        // 未登录，提示登录
        dialog();
        return;
      }
      setUserData(resp.data);
      // 获取用户粉丝数和关注数
      getFollowCount({ uid: resp.data?.id }).then((resp) => {
        setFollowCount(resp.data);
      });
      getFollowCount({ refUid: resp.data?.id }).then((resp) => {
        setFansCount(resp.data);
      });
      // 获取用户排名
      getUserRange(resp.data?.id).then((resp) => {
        setRange(resp.data);
      });
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
        <Grid.Item onClick={() => navigate("/user/follow")}>
          <div>{followCount}</div>关注
        </Grid.Item>
        <Grid.Item onClick={() => navigate("/user/fans")}>
          <div>{fansCount}</div>粉丝
        </Grid.Item>
        <Grid.Item onClick={() => navigate("/user/visitor")}>
          <div>{userData?.visitorCount}</div>访客
        </Grid.Item>
        <Grid.Item>
          <div>{range}</div>排名
        </Grid.Item>
      </Grid>
      {/* 用户菜单-错题本、点赞、历史记录 */}
      <Grid className="user-nav" columns={3} gap={2}>
        <Grid.Item
          onClick={() => {
            navigate("/question-bank/wrong");
          }}
        >
          <FileWrongOutline />
          <div>错题本</div>
        </Grid.Item>
        <Grid.Item
          onClick={() => {
            navigate("/user/likes");
          }}
        >
          <HeartOutline />
          <div>点赞</div>
        </Grid.Item>
        <Grid.Item
          onClick={() => {
            navigate("/user/history");
          }}
        >
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
                          .writeText("http://admin.jiusi.cc")
                          .then(() => {
                            Toast.show({
                              content: "已复制网址到剪切板，请前往电脑端访问",
                            });
                          })
                          .catch((error) => {
                            console.error(
                              "Failed to write to clipboard:",
                              error
                            );
                          });
                      }}
                    >
                      创作者中心
                    </a>
                    进行操作
                  </div>
                </>
              ),
            });
          }}
        >
          创作者中心
        </List.Item>
        <List.Item
          onClick={() => {
            navigator.clipboard
              .writeText("lh668667")
              .then(() => {
                Toast.show({ content: "已复制开发者微信到剪切板" });
              })
              .catch((error) => {
                console.error("Failed to write to clipboard:", error);
              });
          }}
        >
          意见反馈
        </List.Item>
        <List.Item
          onClick={() => {
            navigator.clipboard
              .writeText("lh668667")
              .then(() => {
                Toast.show({ content: "已复制开发者微信到剪切板" });
              })
              .catch((error) => {
                console.error("Failed to write to clipboard:", error);
              });
          }}
        >
          帮助中心
        </List.Item>
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
