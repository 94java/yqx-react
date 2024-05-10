import React, { useEffect, useState } from "react";
import { CapsuleTabs, ErrorBlock } from "antd-mobile";
import VideoCard from "../../../components/VideoCard";

import "./index.less";
import { getCategoryList } from "../../../api/category";
import { getVideoPage } from "../../../api/video";
export default function Video() {
  // 分类列表
  const [categoryList, setCategoryList] = useState([{ id: 1 }]);
  // 视频列表
  const [videoList, setVideoList] = useState([{ id: 1 }]);
  const [activeCategory, setActiveCategory] = useState("1");

  // 钩子函数
  useEffect(() => {
    getCategoryList({ type: "1" }).then((resp) => {
      setCategoryList(resp.data);
      setActiveCategory(resp.data[0].id);
    });
  }, []);

  // 当 activeCategory 改变时重新获取笔记
  useEffect(() => {
    getVideos({ categoryId: activeCategory });
  }, [activeCategory]);

  // 获取分类列表
  const getVideos = async (data) => {
    getVideoPage(data).then((resp) => {
      setVideoList(resp.data.list);
    });
  };

  // 分类切换
  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    getVideos({ categoryId: key });
  };

  // 分类-笔记信息
  const items = categoryList.map((item) => (
    <CapsuleTabs.Tab title={item.name} key={item.id}>
      {videoList.length > 0 ? (
        videoList.map((noteItem) => (
          <VideoCard data={noteItem} key={noteItem.id} />
        ))
      ) : (
        <ErrorBlock status="empty" />
      )}
    </CapsuleTabs.Tab>
  ));

  return (
    <div className="video">
      <CapsuleTabs
        className="category"
        activeKey={activeCategory}
        onChange={(key) => {
          handleCategoryChange(key);
        }}
      >
        {items}
      </CapsuleTabs>
    </div>
  );
}
