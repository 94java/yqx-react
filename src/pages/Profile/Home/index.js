import {
  Avatar,
  Button,
  Divider,
  ErrorBlock,
  NavBar,
  Tabs,
  Toast,
} from "antd-mobile";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./index.less";
import { getUserById } from "../../../api/user";
import { getNoteList } from "../../../api/note";
import { getVideoList } from "../../../api/video";
import NoteCard from "../../../components/NoteCard";
import VideoCard from "../../../components/VideoCard";
import { changeFollow, getFollowCount } from "../../../api/follow";
export default function UserHome() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const userId = params.get("id");
  const [userData, setUserData] = useState({});
  const [noteList, setNoteList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const curUser = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    getUserById(userId).then((resp) => {
      setUserData(resp.data);
      // 获取关注信息
      getFollowCount({ uid: curUser?.id, refUid: resp.data?.id }).then(
        (resp) => {
          if (resp.data > 0) {
            setIsFollow(true);
          }
        }
      );
    });
    getNoteList({ userId }).then((resp) => {
      setNoteList(resp.data);
    });
    getVideoList({ userId }).then((resp) => {
      setVideoList(resp.data);
    });
  }, []);
  return (
    <div className="user-home">
      <NavBar
        back="返回"
        onBack={() => {
          navigate(-1);
        }}
      >
        个人主页
      </NavBar>
      {/* 用户基本信息 */}
      <div className="base-info">
        <Avatar
          src={userData?.avatar}
          style={{
            "--size": "64px",
            "--border-radius": "50%",
            marginBottom: "14px",
          }}
        />
        <p className="nickname">{userData?.nickname}</p>
        <p className="sign">{userData?.sign}</p>
        <div className="meta">
          <span>粉丝: 32</span>
          <Divider direction="vertical" />
          <span>关注: 321</span>
          <Divider direction="vertical" />
          <span>访客数: 3222</span>
        </div>
        <div className="opt">
          {userId === curUser?.id ? (
            <Button color="primary" fill="outline" size="small" block>
              编辑资料
            </Button>
          ) : (
            <Button
              color="primary"
              fill="outline"
              size="small"
              block
              onClick={async () => {
                const resp = await changeFollow({
                  uid: curUser?.id,
                  refUid: userData?.id,
                });
                if (resp.code !== 0) {
                  // 发生错误
                  return;
                }
                setIsFollow((pre) => !pre);
                Toast.show({ content: "操作成功" });
              }}
            >
              {isFollow ? "取消关注" : "关注该用户"}
            </Button>
          )}
        </div>
      </div>
      {/* 用户发布的笔记/视频信息 */}
      <div className="user-contents">
        <Tabs>
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
