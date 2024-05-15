import {
  Avatar,
  Button,
  Form,
  Image,
  List,
  NavBar,
  Popup,
  TextArea,
  Toast,
} from "antd-mobile";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./index.less";
import { getPopularDetails } from "../../../api/popular";
import { formatPast } from "../../../utils/date";
import { getCommentList, saveComment } from "../../../api/comment";
import { changeFollow, getFollowCount } from "../../../api/follow";
import { CheckOutline } from "antd-mobile-icons";

export default function Details() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const popularId = params.get("id");
  const [popupShow, setPopupShow] = useState(false);
  const [popularInfo, setPopularInfo] = useState({});
  const [commentList, setCommentList] = useState([]);
  const curUser = JSON.parse(localStorage.getItem("userInfo"));
  const formRef = useRef();
  const [isFollow, setIsFollow] = useState(false);
  useEffect(() => {
    // 获取动态信息
    getPopularDetails(popularId).then((resp) => {
      setPopularInfo(resp.data);
      // 获取关注信息
      getFollowCount({ uid: curUser?.id, refUid: resp.data?.user?.id }).then(
        (resp) => {
          if (resp.data > 0) {
            setIsFollow(true);
          }
        }
      );
    });
    // 获取评论信息
    getComments();
  }, []);
  const getComments = () => {
    getCommentList({ type: "2", contentId: popularId }).then((resp) => {
      setCommentList(resp.data);
    });
  };

  return (
    <div className="popular-details">
      <NavBar back="返回" onBack={() => navigate(-1)}>
        动态详情
      </NavBar>
      <div className="main">
        <div className="header">
          <div className="user-info">
            <Avatar src={popularInfo.user?.avatar} />
            <div className="meta">
              <div className="nickname">{popularInfo.user?.nickname}</div>
              <div className="time">
                {popularInfo.user?.city} ·
                {formatPast(new Date(popularInfo.updateTime))}
              </div>
            </div>
          </div>
          <div
            className="opt"
            hidden={curUser?.id === popularInfo.user?.id ? true : false}
          >
            <Button
              color="primary"
              size="small"
              fill="none"
              onClick={async () => {
                const resp = await changeFollow({
                  uid: curUser?.id,
                  refUid: popularInfo.user?.id,
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
                  <span>关注</span>
                </>
              )}
            </Button>
          </div>
        </div>
        <div className="content">{popularInfo.content}</div>
      </div>
      {/* 评论信息 */}
      <List header={`评论 ${commentList.length}`}>
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

      {/* 底部 评论输入框 */}
      <div className="footer" onClick={() => setPopupShow(true)}>
        <span>输入评论...</span>
      </div>
      <Popup
        visible={popupShow}
        onMaskClick={() => {
          setPopupShow(false);
        }}
        onClose={() => {
          setPopupShow(false);
        }}
        bodyStyle={{
          minHeight: "20vh",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        <Form
          ref={formRef}
          layout="horizontal"
          footer={
            <Button size="middle" block type="submit" color="primary">
              提交
            </Button>
          }
          onFinish={(values) => {
            if (!curUser) {
              Toast.show({ icon: "fail", content: "请登陆后再进行操作" });
              setTimeout(() => {
                navigate("/login");
              }, 500);
            }
            const data = {
              ...values,
              uid: curUser?.id,
              type: "2",
              contentId: popularId,
            };

            saveComment(data).then((resp) => {
              if (resp.code === 0) {
                formRef.current?.resetFields();
                Toast.show({ icon: "success", content: "评论成功" });
                setPopupShow(false);
                getComments();
              }
            });
          }}
        >
          <Form.Item name="content">
            <TextArea showCount placeholder="添加评论...." maxLength={1000} />
          </Form.Item>
        </Form>
      </Popup>
    </div>
  );
}
