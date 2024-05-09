import React, { useEffect, useState } from "react";

import { Swiper, Image, Avatar } from "antd-mobile";
import Wrap from "../../../components/Wrap";
import LateralSlip from "../../../components/LateralSlip";

import "./index.less";
import VideoCard from "../../../components/VideoCard";
import NoteCard from "../../../components/NoteCard";
import {
  getActivityUser,
  getRecommendNote,
  getRecommendVideo,
  getSwipper,
} from "../../../api/home";
import { useNavigate } from "react-router-dom";

export default function Recommend() {
  const navigate = useNavigate();
  // 轮播图数据
  const [swiperData, setSwiperData] = useState([{ id: "1" }]);
  // 活跃用户数据
  const [activeUsers, setActiveUsers] = useState([{ id: "1" }]);
  // 精选视频数据
  const [recommendVideos, setRecommendVideos] = useState([{ id: "1" }]);
  // 精选笔记数据
  const [recommendNotes, setRecommendNotes] = useState([{ id: 1 }]);

  // 钩子函数
  useEffect(() => {
    getSwipper().then((resp) => {
      setSwiperData(resp.data);
    });
    getRecommendVideo().then((resp) => {
      setRecommendVideos(resp.data);
    });
    getActivityUser().then((resp) => {
      setActiveUsers(resp.data);
    });
    getRecommendNote().then((resp) => {
      setRecommendNotes(resp.data);
      // console.log(resp.data)
    });
  }, []);

  // 轮播图
  const swiperItems = swiperData?.map((item) => (
    <Swiper.Item key={item.id} onClick={() => {navigate(`/video/details?id=${item.id}`)}}>
      <div className="swiper-item">
        <Image className="swiper-img" src={item.coverImg} alt="" />
      </div>
    </Swiper.Item>
  ));

  // 活跃用户
  const activeUserItems = activeUsers?.map((item) => (
    <div className="user-item" key={item.id}>
      <Avatar src={item.avatar} />
      <div className="username">{item.nickname}</div>
    </div>
  ));

  // 精选视频
  const recommendVideoItems = recommendVideos?.map((item) => (
    <VideoCard data={item} key={item.id} />
  ));

  // 精选笔记
  const recommendNoteItems = recommendNotes?.map((item) => (
    <NoteCard data={item} key={item.id} />
  ));

  return (
    <div className="recommend">
      {/* 轮播图 */}
      <Swiper
        loop
        autoplay
        className="recommend-swiper"
        indicator={(total, current) => (
          <div className="swiper-indicator">
            <div className="swiper-num">{`${current + 1} / ${total}`}</div>
            <div className="swiper-desc">{swiperData[current].title}</div>
          </div>
        )}
      >
        {swiperItems}
      </Swiper>

      {/* 活跃作者 TOP10 */}
      <Wrap title="活跃作者 TOP10">
        <LateralSlip>{activeUserItems}</LateralSlip>
      </Wrap>

      {/* 精选视频 */}
      <Wrap title="精选视频" more className="recommend-video" to="/home/video">
        {recommendVideoItems}
      </Wrap>

      {/* 精选笔记 */}
      <Wrap title="精选笔记" more className="recommend-note" to="/home/note">
        {recommendNoteItems}
      </Wrap>
    </div>
  );
}
