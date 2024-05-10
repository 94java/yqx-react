import React from "react";

import { SearchOutline } from "antd-mobile-icons";
import { Avatar, Tabs, Button } from "antd-mobile";

import "./index.less";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const userInfo = useSelector((state) => state.user.userInfo);

  const setRouteActive = (value) => {
    navigate(value);
  };

  const tabs = [
    {
      key: "/home/recommend",
      title: "推荐",
    },
    {
      key: "/home/note",
      title: "笔记",
    },
    {
      key: "/home/video",
      title: "视频",
    },
    {
      key: "/home/resource",
      title: "资源",
    },
  ];

  function goSearch() {
    navigate("/search");
  }

  return (
    <div className="home">
      {/* 顶部导航栏 */}
      <div className="nav">
        <div className="search" onClick={goSearch}>
          <SearchOutline />
          <span>请输入搜索关键词</span>
        </div>
        <div className="avatar">
          {localStorage.getItem("userInfo") ? (
            <Avatar
              src={JSON.parse(localStorage.getItem("userInfo"))?.avatar}
              onClick={() => {
                navigate(
                  "/user/home?id=" +
                    JSON.parse(localStorage.getItem("userInfo"))?.id
                );
              }}
            />
          ) : (
            <Button
              size="small"
              onClick={() => {
                navigate("/login");
              }}
            >
              登录
            </Button>
          )}
        </div>
      </div>

      {/* 首页Tabs */}
      <Tabs
        className="home-tabs"
        activeKey={pathname}
        onChange={(value) => setRouteActive(value)}
      >
        {tabs.map((item) => (
          <Tabs.Tab title={item.title} key={item.key} />
        ))}
      </Tabs>

      {/* 子组件占位 */}
      <Outlet />
    </div>
  );
}
