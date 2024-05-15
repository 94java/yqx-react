import { Dialog, ErrorBlock, NavBar, Tabs } from "antd-mobile";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.less";
import VideoCard from "../../../components/VideoCard";
import NoteCard from "../../../components/NoteCard";
import { getLikesList } from "../../../api/likes";
import { getCurrentUser } from "../../../api/user";
export default function Likes() {
  const navigate = useNavigate();
  const [noteList, setNoteList] = useState([]);
  const [videoList, setVideoList] = useState([]);

  const dialog = async () => {
    const result = await Dialog.confirm({
      content: "未登录，请先登录",
    });
    if (result) {
      window.location.href = "/login";
    } else {
      window.history.back();
    }
  };
  useEffect(() => {
    getCurrentUser().then((resp) => {
      if (!resp.data) {
        // 未登录
        dialog();
        return;
      }
      getLikesList({ uid: resp.data?.id }).then((resp) => {
        console.log(resp);
        setNoteList(resp.data.notes);
        setVideoList(resp.data.videos);
      });
    });
  }, []);
    
  return (
    <div className="user-likes">
      <NavBar back="返回" onBack={() => navigate(-1)}>
        点赞列表
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
