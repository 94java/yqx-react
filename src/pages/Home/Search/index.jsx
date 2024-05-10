import React, { useState } from "react";

import { LeftOutline } from "antd-mobile-icons";
import { SearchBar, Button, Tabs, Empty, ErrorBlock, Toast } from "antd-mobile";

import "./index.less";
import { useNavigate } from "react-router-dom";
import { getNoteList } from "../../../api/note";
import NoteCard from "../../../components/NoteCard";
import { getVideoList } from "../../../api/video";
import VideoCard from "../../../components/VideoCard";
export default function Search() {
  const navigate = useNavigate();
  // 笔记信息
  const [noteList, setNoteList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  // 搜索栏信息
  const [searchText, setSearchText] = useState("");
  function goBack() {
    navigate(-1);
  }
  return (
    <div className="search">
      <div className="header">
        <LeftOutline onClick={goBack} />
        <SearchBar
          placeholder="请输入搜索内容"
          style={{
            "--border-radius": "12px",
            "--background": "#ffffff",
            "--height": "32px",
            "--padding-left": "12px",
          }}
          onChange={(value) => setSearchText(value)}
          onSearch={() => {
            if (searchText === "") {
              Toast.show({ content: "请输入搜索内容" });
              return;
            }
            let data = { title: searchText, summary: searchText };
            getNoteList(data).then((resp) => {
              setNoteList(resp.data);
            });
            getVideoList(data).then((resp) => {
              setVideoList(resp.data);
            });
          }}
        />
        <Button
          color="primary"
          fill="solid"
          size="small"
          onClick={() => {
            if (searchText === "") {
              Toast.show({ content: "请输入搜索内容" });
              return;
            }
            let data = { title: searchText, summary: searchText };
            getNoteList(data).then((resp) => {
              setNoteList(resp.data);
            });
            getVideoList(data).then((resp) => {
              setVideoList(resp.data);
            });
          }}
        >
          搜索
        </Button>
      </div>
      <div className="content">
        <Tabs
          style={{
            "--title-font-size": "15px",
          }}
        >
          <Tabs.Tab title={`笔记(${noteList.length})`} key="note">
            {noteList.length > 0 ? (
              noteList?.map((noteItem) => (
                <NoteCard data={noteItem} key={noteItem.id} />
              ))
            ) : (
              <ErrorBlock status="empty" />
            )}
          </Tabs.Tab>
          <Tabs.Tab title={`视频(${videoList.length})`} key="video">
            {videoList.length > 0 ? (
              videoList.map((videoItem) => (
                <VideoCard data={videoItem} key={videoItem.id} />
              ))
            ) : (
              <ErrorBlock status="empty" />
            )}
          </Tabs.Tab>
        </Tabs>
      </div>
    </div>
  );
}
