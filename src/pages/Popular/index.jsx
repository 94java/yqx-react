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
  Toast,
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
import { changeLikes } from "../../api/likes";

export default function News() {
  const [sort, setSort] = useState("0");
  const [popularList, setPopularList] = useState([]);
  const curUser = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
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

  const handleLikes = async (item) => {
    // 执行后端
    const resp = await changeLikes({
      uid: curUser?.id,
      contentId: item?.id,
      type: "2",
    });
    if (resp.code !== 0) {
      // 发生错误
      return;
    }
    // 修改 item 的 Like 属性
    item.like = !item.like;
    // 找到该项在数组中的索引
    const index = popularList.findIndex((o) => o.id === item.id);
    // 创建 popularList 的副本并更新该索引的项
    const updatedPopularList = [...popularList];
    updatedPopularList[index] = item;
    // 使用更新后的数组设置状态
    setPopularList(updatedPopularList);
    Toast.show({ content: "操作成功" });
  };

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
        <div
          onClick={() => {
            const baseUrl = `${window.location.protocol}//${
              window.location.hostname
            }${window.location.port ? `:${window.location.port}` : ""}`;
            navigator.clipboard
              .writeText(baseUrl + "/popular/details?id=" + item.id)
              .then(() => {
                Toast.show({ content: "已复制网址到剪切板" });
              })
              .catch((error) => {
                console.error("Failed to write to clipboard:", error);
              });
          }}
        >
          <SendOutline />
          分享
        </div>
        <div>
          <MessageOutline />
          {item.commentCount}
        </div>
        <div onClick={() => handleLikes(item)}>
          <LikeOutline color={item.like ? "var(--adm-color-primary)" : ""} />
          {item.like ? "已赞" : "点赞"}
        </div>
      </div>
    </List.Item>
  ));

  return (
    <div className="news">
      <NavBar backArrow={false}>动态</NavBar>
      {/* 最近活跃 TOP10 */}
      {activeUsers.length > 0 ? (
        <Wrap title="最近活跃">
          <LateralSlip>{activeUserItems}</LateralSlip>
        </Wrap>
      ) : (
        ""
      )}
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
                  if (sort === "1") {
                    // 最新排序
                    setPopularList(
                      popularList.sort((a, b) => {
                        return new Date(b.updateTime) - new Date(a.updateTime);
                      })
                    );
                  } else {
                    // 热门排序
                    setPopularList(
                      popularList.sort((a, b) => {
                        return b.commentCount - a.commentCount;
                      })
                    );
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
