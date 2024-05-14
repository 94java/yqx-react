import { Button, ErrorBlock, Image, List, NavBar, Toast } from "antd-mobile";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.less";
import { changeFollow, getCurrentFollows } from "../../../api/follow";
export default function Follow() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    getFollowInfo();
  }, []);

  const getFollowInfo = () => {
    getCurrentFollows().then((resp) => {
      setUsers(resp.data);
    });
  };
  return (
    <div className="user-follow">
      <NavBar back="返回" onBack={() => navigate(-1)}>
        关注
      </NavBar>
      {/* 关注列表 */}
      {users?.length > 0 ? (
        <List>
          {users.map((user) => (
            <List.Item
              key={user.id}
              prefix={
                <Image
                  src={user.avatar}
                  style={{ borderRadius: 20 }}
                  fit="cover"
                  width={40}
                  height={40}
                  onClick={() => {
                    navigate("/user/home?id=" + user.id);
                  }}
                />
              }
              description={user.sign}
            >
              <span
                onClick={() => {
                  navigate("/user/home?id=" + user.id);
                }}
              >
                {user.nickname}
              </span>
              <Button
                className="opt"
                size="small"
                color="primary"
                fill="none"
                onClick={() => {
                  changeFollow({ uid: userInfo.id, refUid: user.id }).then(
                    (resp) => {
                      if (resp.code === 0) {
                        Toast.show({ icon: "success", content: "取关成功" });
                        getFollowInfo();
                      }
                    }
                  );
                }}
              >
                取消关注
              </Button>
            </List.Item>
          ))}
        </List>
      ) : (
        <ErrorBlock status="empty" />
      )}
    </div>
  );
}
