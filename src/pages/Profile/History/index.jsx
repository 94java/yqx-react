import { ErrorBlock, NavBar, Tabs } from "antd-mobile";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.less";
import VideoCard from "../../../components/VideoCard";
import NoteCard from "../../../components/NoteCard";
export default function History() {
  const navigate = useNavigate();
  const [noteList, setNoteList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  useEffect(() => {
    let notes = JSON.parse(localStorage.getItem("history-note")) || [];
    let videos = JSON.parse(localStorage.getItem("history-video")) || [];
    setNoteList(notes.reverse());
    setVideoList(videos.reverse());
  }, []);
  return (
    <div className="user-history">
      <NavBar back="返回" onBack={() => navigate(-1)}>
        浏览历史
      </NavBar>
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
  );
}
