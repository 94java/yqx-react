import React, { useState } from "react";
import {
  NavBar,
  Avatar,
  List,
  Image,
  FloatingBubble,
  Selector,
} from "antd-mobile";
import Wrap from "../../components/Wrap";
import LateralSlip from "../../components/LateralSlip";
import { EditSFill } from "antd-mobile-icons";
import "./index.less";
import { SendOutline, MessageOutline, LikeOutline } from "antd-mobile-icons";

export default function News() {
  const [value, setValue] = useState("1");
  const [{ activeUsers }] = useState({
    // 最常访问用户数据
    activeUsers: [
      { username: "九思.", avatar: "https://www.jiusi.cc/images/tx1.png" },
      { username: "HelloCode.", avatar: "https://www.jiusi.cc/images/tx.png" },
      { username: "凌风", avatar: "https://www.jiusi.cc/images/qq.jpg" },
      {
        username: "新手么么叽",
        avatar: "http://mmj.jiusi.cc/blog/image/mmj.jpg",
      },
      { username: "test1", avatar: "" },
      { username: "test2", avatar: "" },
      { username: "test3", avatar: "" },
    ],
  });

  // 活跃用户
  const activeUserItems = activeUsers.map((item) => (
    <div className="user-item" key={item.username}>
      <Avatar src={item.avatar} />
      <div className="username">{item.username}</div>
    </div>
  ));

  return (
    <div className="news">
      <NavBar backArrow={false}>动态</NavBar>
      {/* 最常访问 TOP10 */}
      <Wrap title="最常访问">
        <LateralSlip>{activeUserItems}</LateralSlip>
      </Wrap>
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
                  value: "1",
                },
                {
                  label: "热门",
                  value: "2",
                },
              ]}
              value={[value]}
              onChange={(v) => {
                if (v.length) {
                  setValue(v[0]);
                }
              }}
            ></Selector>
          </>
        }
      >
        <List.Item key={1}>
          <div className="header">
            <Image
              src={""}
              style={{ borderRadius: "50%" }}
              fit="cover"
              width={44}
              height={44}
            />
            <div className="info">
              <div className="nickname">九思.</div>
              <div className="time">西安 · 33分钟前</div>
            </div>
          </div>
          <div className="content">
            昨天晚上加班到1点,今天还是9点上班,这正常吗?
          </div>
          <div className="footer">
            <div>
              <SendOutline />
              分享
            </div>
            <div>
              <MessageOutline />5
            </div>
            <div>
              <LikeOutline />
              点赞
            </div>
          </div>
        </List.Item>
        <List.Item key={1}>
          <div className="header">
            <Image
              src={""}
              style={{ borderRadius: "50%" }}
              fit="cover"
              width={44}
              height={44}
            />
            <div className="info">
              <div className="nickname">九思.</div>
              <div className="time">西安 · 33分钟前</div>
            </div>
          </div>
          <div className="content">
            昨天晚上加班到1点,今天还是9点上班,这正常吗?
          </div>
          <div className="footer">
            <div>
              <SendOutline />
              分享
            </div>
            <div>
              <MessageOutline />5
            </div>
            <div>
              <LikeOutline />
              点赞
            </div>
          </div>
        </List.Item>
        <List.Item key={1}>
          <div className="header">
            <Image
              src={""}
              style={{ borderRadius: "50%" }}
              fit="cover"
              width={44}
              height={44}
            />
            <div className="info">
              <div className="nickname">九思.</div>
              <div className="time">西安 · 33分钟前</div>
            </div>
          </div>
          <div className="content">
            昨天晚上加班到1点,今天还是9点上班,这正常吗?
          </div>
          <div className="footer">
            <div>
              <SendOutline />
              分享
            </div>
            <div>
              <MessageOutline />5
            </div>
            <div>
              <LikeOutline />
              点赞
            </div>
          </div>
        </List.Item>
      </List>

      {/* 浮动气泡 */}
      <FloatingBubble
        style={{
          "--initial-position-bottom": "75px",
          "--initial-position-right": "12px",
          "--edge-distance": "24px",
        }}
      >
        <EditSFill fontSize={32} />
      </FloatingBubble>
    </div>
  );
}
