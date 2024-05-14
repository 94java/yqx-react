import React, { useEffect, useState } from "react";
import {
  NavBar,
  Avatar,
  List,
  Image,
  FloatingBubble,
  Selector,
  ErrorBlock,
  Dialog,
} from "antd-mobile";
import Wrap from "../../components/Wrap";
import LateralSlip from "../../components/LateralSlip";
import { EditSFill } from "antd-mobile-icons";
import "./index.less";
import { SendOutline, MessageOutline, LikeOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { getCurrentFollowPopularList } from "../../api/popular";
import { formatPast } from "../../utils/date";
import { getCurrentFollowsActivity } from "../../api/follow";
import { getCurrentUser } from "../../api/user";

export default function News() {
  const [sort, setSort] = useState("0");
  const [popularList, setPopularList] = useState([]);

  const navigate = useNavigate();
  const [activeUsers, setActiveUsers] = useState([]);

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
    // 获取当前用户
    getCurrentUser().then((resp) => {
      // 判断是否登录
      if (!resp.data) {
        // 未登录，提示登录
        dialog();
        return;
      }
    });

    // 获取最近活跃用户信息
    getCurrentFollowsActivity().then((resp) => {
      setActiveUsers(resp.data);
    });

    // 获取动态信息
    getCurrentFollowPopularList().then((resp) => {
      if (resp.code === 0) {
        setPopularList(resp.data);
      }
    });
  }, []);

  // 活跃用户
  const activeUserItems = activeUsers
    ? activeUsers.map((item) => (
        <div
          className="user-item"
          key={item.username}
          onClick={() => {
            navigate("/user/home?id=" + item.id);
          }}
        >
          <Avatar src={item.avatar} />
          <div className="username">{item.username}</div>
        </div>
      ))
    : "";

  // 动态列表
  const popularItems = popularList.map((item) => (
    <List.Item key={item.id}>
      <div className="header">
        <Image
          src={item.user?.avatar}
          style={{ borderRadius: "50%" }}
          fit="cover"
          width={38}
          height={38}
          onClick={() => {
            navigate("/user/home?id=" + item.user?.id);
          }}
        />
        <div
          className="info"
          onClick={() => {
            navigate("/user/home?id=" + item.user?.id);
          }}
        >
          <div className="nickname">{item.user?.nickname}</div>
          <div className="time">
            {item.user?.city ? item.user?.city + " · " : ""}{" "}
            {formatPast(new Date(item.updateTime))}
          </div>
        </div>
      </div>
      <div
        className="content"
        onClick={() => {
          navigate("/popular/details?id=" + item.id);
        }}
      >
        {item.content}
      </div>
      <div className="footer">
        <div>
          <SendOutline />
          分享
        </div>
        <div>
          <MessageOutline />
          {item.commentCount}
        </div>
        <div>
          <LikeOutline />
          点赞
        </div>
      </div>
    </List.Item>
  ));

  return (
    <div className="news">
      <NavBar backArrow={false}>动态</NavBar>
      {/* 最近活跃 TOP10 */}
      <Wrap title="最近活跃">
        <LateralSlip>{activeUserItems}</LateralSlip>
      </Wrap>
      {popularList.length > 0 ? (
        <List
          header={
            <>
              排序
              <Selector
                style={{
                  "--border-radius": "4px",
                  "--border": "solid transparent 1px",
                  "--checked-border": "solid var(--adm-color-primary) 1px",
                }}
                showCheckMark={false}
                options={[
                  {
                    label: "最新",
                    key: "0",
                    value: "0",
                  },
                  {
                    label: "热门",
                    key: "1",
                    value: "1",
                  },
                ]}
                value={[sort]}
                onChange={(v) => {
                  if (v.length) {
                    setSort(v[0]);
                  }
                }}
              ></Selector>
            </>
          }
        >
          {popularItems}
        </List>
      ) : (
        <ErrorBlock status="empty" />
      )}

      {/* 浮动气泡 */}
      <FloatingBubble
        style={{
          "--initial-position-bottom": "75px",
          "--initial-position-right": "12px",
          "--edge-distance": "24px",
        }}
        onClick={() => navigate("add")}
      >
        <EditSFill fontSize={32} />
      </FloatingBubble>
    </div>
  );
}
