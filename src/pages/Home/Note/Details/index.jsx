import { Avatar, Button, Card, NavBar, Tag } from "antd-mobile";
import React, { useEffect, useState } from "react";
import {
  LinkOutline,
  EyeOutline,
  LikeOutline,
  ContentOutline,
  AddOutline,
} from "antd-mobile-icons";

import "./index.less";
import { getNoteById } from "../../../../api/note";
import { Viewer } from "@bytemd/react";
// 主题
import "bytemd/dist/index.min.css";
import "./theme/smartblue.css";
import "./theme/atom-one-light.css";
import "./index.less";
// 插件
import gfm from "@bytemd/plugin-gfm";
import frontmatter from "@bytemd/plugin-frontmatter";
import breaks from "@bytemd/plugin-breaks";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";
import { dateFtt } from "../../../../utils/date";
import { useNavigate, useSearchParams } from "react-router-dom";

const plugins = [
  gfm(),
  frontmatter(),
  highlight(),
  breaks(),
  math(),
  mediumZoom(),
  mermaid(),
  // Add more plugins here
];

export default function Details() {
  const [data, setData] = useState("");
  const navigate = useNavigate()
  const [param] = useSearchParams()
  const id = param.get('id');
  useEffect(() => {
    getNoteById(id).then((resp) => {
      setData(resp.data);
    });
  });
  return (
    <div className="note-details">
      <NavBar right={<LinkOutline />} back="返回" onBack={() => {navigate(-1)}}>
        笔记详情
      </NavBar>
      <div className="header">
        <h1>{data?.title}</h1>
        <div className="meta">
          <div className="type">
            <Tag
              color={
                data?.type === "0"
                  ? "primary"
                  : data?.type === "1"
                  ? "success"
                  : "warning"
              }
            >
              {data?.type === "0"
                ? "原创"
                : data?.type === "1"
                ? "转载"
                : "翻译"}
            </Tag>
          </div>
          <div className="time">
            {dateFtt("yyyy-MM-dd HH:mm:ss", new Date(data.updateTime))}
          </div>
          <div className="views">
            <EyeOutline />
            {data.views}
          </div>
          <div className="likes">
            <LikeOutline />
            {data.likes}
          </div>
          <div className="category">
            <ContentOutline />
            {data.category?.name}
          </div>
        </div>
      </div>
      <Card bodyClassName="user-info">
        <div className="info">
          <Avatar src={data.user?.avatar} />
          {data.user?.nickname}
        </div>
        <div className="opt">
          <Button shape="rounded">
            <AddOutline />
            <span>关注</span>
          </Button>
        </div>
      </Card>
      <Card>
        <Viewer value={data?.content} plugins={plugins} />
      </Card>
    </div>
  );
}
