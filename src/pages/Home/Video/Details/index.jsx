import { Avatar, Button, Collapse, NavBar, Tabs, TextArea } from "antd-mobile";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  LinkOutline,
  MovieOutline,
  LikeOutline,
  ClockCircleOutline,
} from "antd-mobile-icons";
import Xgplayer from "xgplayer-react";
import "./index.less";
import { getVideoById } from "../../../../api/video";
import { dateFtt } from "../../../../utils/date";

export default function Details() {
  const [param] = useSearchParams();
  const id = param.get("id");
  const navigate = useNavigate("");
  const [videoData, setVideoData] = useState({});
  useEffect(() => {
    getVideoById(id).then((resp) => {
      setVideoData(resp.data);
    });
  }, []);
  let config = {
    id: "mse",
    url: videoData.url,
    width: "100%",
    height: "200px",
    dynamicBg: {
      disable: false,
    },
    playbackRate: [0.5, 0.75, 1, 1.5, 2], //倍速
    lang: "zh-cn",
    pip: true,
  };
  let Player = null;
  return (
    <div className="video-details">
      <NavBar
        right={<LinkOutline />}
        back="返回"
        onBack={() => {
          navigate(-1);
        }}
      >
        视频详情
      </NavBar>
      {/* 播放器 */}
      <div className="video" id="mse">
        <Xgplayer
          config={config}
          playerInit={(player) => {
            Player = player;
          }}
        />
      </div>
      <Tabs>
        <Tabs.Tab title="简介" key="fruits">
          {/* 简介 */}
          <div className="user-header">
            <div className="user">
              <Avatar src={videoData.user?.avatar} />
              <div className="info">
                <span>{videoData.user?.nickname}</span>
                <div className="meta">
                  <span>299 粉丝</span>
                  <span>35 视频</span>
                </div>
              </div>
            </div>
            <div className="opt">
              <Button size="small" shape="rounded">
                关注
              </Button>
            </div>
          </div>
          <div className="video-info">
            <Collapse>
              <Collapse.Panel key="1" title={videoData.title}>
                {videoData.summary}
              </Collapse.Panel>
            </Collapse>
            <div className="meta">
              <span>
                <MovieOutline />
                {videoData.views}
              </span>
              <span>
                <LikeOutline />
                {videoData.likes}
              </span>
              <span>
                <ClockCircleOutline />
                {dateFtt("yyyy-MM-dd HH:mm:ss", new Date(videoData.updateTime))}
              </span>
            </div>
          </div>
        </Tabs.Tab>
        <Tabs.Tab title="评论" key="vegetables">
          <TextArea
            defaultValue={"北极星垂地，\n东山月满川。"}
            showCount
            maxLength={30}
          />
          <Button color="primary" fill="solid" size="small">
            发表评论
          </Button>
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}
