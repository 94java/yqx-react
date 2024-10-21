import {
  Avatar,
  Button,
  Card,
  Footer,
  Form,
  Image,
  List,
  NavBar,
  Space,
  Tag,
  TextArea,
  Toast,
} from "antd-mobile";
import React, { useEffect, useRef, useState } from "react";
import {
  CheckOutline,
  EyeOutline,
  LikeOutline,
  ContentOutline,
  AddOutline,
  ClockCircleOutline,
  HandPayCircleOutline,
  ExclamationCircleOutline,
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
import mermaid from "@bytemd/plugin-mermaid";
import { dateFtt } from "../../../../utils/date";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCommentList, saveComment } from "../../../../api/comment";
import { changeFollow, getFollowCount } from "../../../../api/follow";
import { changeLikes } from "../../../../api/likes";

const plugins = [
  gfm(),
  frontmatter(),
  highlight(),
  breaks(),
  mermaid(),
  // Add more plugins here
];

export default function Details() {
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const [param] = useSearchParams();
  const id = param.get("id");
  const curUser = JSON.parse(localStorage.getItem("userInfo"));
  const [commentList, setCommentList] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const formRef = useRef();

  const getComments = () => {
    getCommentList({ type: "0", contentId: id }).then((resp) => {
      setCommentList(resp.data);
    });
  };
  const saveHistory = (data) => {
    let history = localStorage.getItem("history-note");
    if (!history) {
      // 无记录
      localStorage.setItem("history-note", JSON.stringify([data]));
    } else {
      // 添加（需要去重）
      let record = JSON.parse(history);
      let index = record.findIndex((item) => item.id === data.id);
      if (index !== -1) {
        // 已存在该记录，删除
        record.splice(index, 1);
      }
      record.push(data);
      localStorage.setItem("history-note", JSON.stringify(record));
    }
  };
  useEffect(() => {
    // 返回顶部
    window.scrollTo(0, 0);
    // 获取笔记信息
    getNoteById(id).then((resp) => {
      const respData = resp.data;
      setData(respData);
      // 获取关注信息
      getFollowCount({ uid: curUser?.id, refUid: respData.user?.id }).then(
        (resp) => {
          if (resp.data > 0) {
            setIsFollow(true);
          }
        }
      );
      // 获取点赞信息
      setIsLike(resp.data.like);
      // 保存浏览记录
      saveHistory(resp.data);
    });
    // 获取评论信息
    getComments();
  }, []);
  return (
    <div className="note-details">
      <NavBar
        back="返回"
        onBack={() => {
          navigate(-1);
        }}
      >
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
        <div
          className="info"
          onClick={() => {
            navigate("/user/home?id=" + data.user?.id);
          }}
        >
          <Avatar src={data.user?.avatar} />
          {data.user?.nickname}
        </div>
        {curUser?.id !== data.user?.id && (
          <div className="opt">
            <Button
              shape="rounded"
              onClick={async () => {
                const resp = await changeFollow({
                  uid: curUser?.id,
                  refUid: data.user?.id,
                });
                if (resp.code !== 0) {
                  // 发生错误
                  return;
                }
                setIsFollow((pre) => !pre);
                Toast.show({ content: "操作成功" });
              }}
            >
              {isFollow ? (
                <>
                  <CheckOutline />
                  <span>已关注</span>
                </>
              ) : (
                <>
                  <AddOutline />
                  <span>关注</span>
                </>
              )}
            </Button>
          </div>
        )}
      </Card>
      {/* 内容区卡片 */}
      <Card>
        <Viewer value={data?.content} plugins={plugins} />
        <div className="footer">
          <Footer label="Ending"></Footer>
          <div className="last-time">
            <ClockCircleOutline />
            最后修改:{" "}
            {dateFtt("yyyy-MM-dd HH:mm:ss", new Date(data.updateTime))}
          </div>
          <div className="opt">
            <Button shape="rounded" color="success" size="small">
              <Space>
                <HandPayCircleOutline />
                <span>打赏</span>
              </Space>
            </Button>
            <Button
              shape="rounded"
              size="small"
              onClick={async () => {
                const resp = await changeLikes({
                  uid: curUser?.id,
                  contentId: data?.id,
                  type: "0",
                });
                if (resp.code !== 0) {
                  // 发生错误
                  return;
                }
                setIsLike((pre) => !pre);
                Toast.show({ content: "操作成功" });
              }}
            >
              <Space>
                {isLike ? (
                  <>
                    <LikeOutline />
                    <span>已点赞</span>
                  </>
                ) : (
                  <>
                    <LikeOutline />
                    <span>点赞</span>
                  </>
                )}
              </Space>
            </Button>
          </div>
          <span className="tip">如果觉得本篇文章对你有用，请随意赞赏</span>
        </div>
      </Card>
      {/* 发表评论 */}
      <div className="comment">
        <div className="header-title">
          <ExclamationCircleOutline />
          发表评论
        </div>
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
                type: "0",
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
    </div>
  );
}
