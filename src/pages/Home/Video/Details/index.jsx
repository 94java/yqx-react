import { Avatar, Button, Card, Collapse, Form, Image, List, NavBar, Tabs, TextArea, Toast } from "antd-mobile";
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
import { getCommentList, saveComment } from "../../../../api/comment";

export default function Details() {
  const [param] = useSearchParams();
  const id = param.get("id");
  const navigate = useNavigate("");
  const [videoData, setVideoData] = useState({});
  const formRef = useRef();
  const curUser = JSON.parse(localStorage.getItem("userInfo"));
  const [commentList, setCommentList] = useState([]);
  const getComments = () => {
    getCommentList({ type: "1", contentId: id }).then((resp) => {
      setCommentList(resp.data);
    });
  };
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
          {/* <TextArea
            defaultValue={"北极星垂地，\n东山月满川。"}
            showCount
            maxLength={30}
          />
          <Button color="primary" fill="solid" size="small">
            发表评论
          </Button> */}
          {/* 发表评论 */}
          <div className="comment">
            <Card bodyClassName="comment-card">
              {/* 评论输入框 */}
              <Form
                ref={formRef}
                layout="horizontal"
                mode="card"
                onFinish={(values) => {
                  if (!curUser) {
                    Toast.show({ icon: "fail", content: "请登陆后再进行操作" });
                    setTimeout(() => {
                      navigate("/login");
                    }, 500);
                  }
                  const data = {
                    ...values,
                    uid: curUser.id,
                    type: "1",
                    contentId: id,
                  };

                  saveComment(data).then((resp) => {
                    if (resp.code === 0) {
                      formRef.current?.resetFields();
                      Toast.show({ icon: "success", content: "评论成功" });
                      getComments();
                    }
                  });
                }}
                footer={
                  <div className="comment-footer">
                    {curUser ? (
                      "欢迎您," + curUser.nickname
                    ) : (
                      <div>
                        还没有登录,
                        <Button
                          color="primary"
                          fill="none"
                          onClick={() => {
                            navigate("/login");
                          }}
                        >
                          请登录
                        </Button>
                      </div>
                    )}
                    <Button
                      type="submit"
                      color="primary"
                      size="small"
                      disabled={!curUser}
                      shape="rounded"
                    >
                      提交
                    </Button>
                  </div>
                }
              >
                <Form.Item
                  label="评论"
                  name="content"
                  rules={[{ required: true, message: "请输入评论内容后提交" }]}
                >
                  <TextArea
                    showCount
                    placeholder="说点什么吧"
                    autoSize={{ minRows: 2, maxRows: 4 }}
                    maxLength={100}
                  />
                </Form.Item>
              </Form>
              {/* 评论列表 */}
              <List header={`${commentList.length}条评论`}>
                {commentList.map((item) => (
                  <List.Item
                    key={item.id}
                    prefix={
                      <Image
                        src={item.user?.avatar}
                        style={{ borderRadius: 20 }}
                        fit="cover"
                        width={40}
                        height={40}
                      />
                    }
                    description={item.content}
                  >
                    {item.user?.nickname}
                  </List.Item>
                ))}
              </List>
            </Card>
          </div>
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}
