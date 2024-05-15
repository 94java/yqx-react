import { ErrorBlock, Image, List, NavBar } from "antd-mobile";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.less";
import { getCurrentVistor } from "../../../api/user";
export default function Visitor() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getVisitorList();
  }, []);

  const getVisitorList = () => {
    getCurrentVistor().then((resp) => {
      setUsers(resp.data);
    });
  };
  return (
    <div className="user-visitor">
      <NavBar back="返回" onBack={() => navigate(-1)}>
        访客
      </NavBar>
      {/* 访客列表 */}
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
                />
              }
              description={user.sign}
              onClick={() => {
                navigate("/user/home?id=" + user.id);
              }}
            >
              <span>{user.nickname}</span>
            </List.Item>
          ))}
        </List>
      ) : (
        <ErrorBlock status="empty" />
      )}
    </div>
  );
}
