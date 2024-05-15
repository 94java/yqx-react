import { ErrorBlock, List, NavBar, Tag } from "antd-mobile";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.less";
import { getCurWrongBanks } from "../../../api/wrong";
import { EyeOutline, LinkOutline, ClockCircleOutline } from "antd-mobile-icons";
import { dateFtt } from "../../../utils/date";
export default function Wrong() {
  const [bankList, setBankList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getCurWrongBanks().then((resp) => {
      setBankList(resp.data);
    });
  }, []);
  // 题库集合列表
  const bankItems =
    bankList.length > 0 ? (
      bankList.map((item) => (
        <List.Item
          description={
            <>
              <EyeOutline /> {item.bank?.views}
              <LinkOutline /> {item.count}
              <ClockCircleOutline />{" "}
              {dateFtt("yyyy-MM-dd HH:mm:ss", new Date(item.bank?.updateTime))}
            </>
          }
          clickable
          key={item.bank?.id}
          onClick={() => {
            navigate(`/question-bank/exercise?mode=3&bankId=${item.bank?.id}`);
          }}
        >
          {item.bank?.name}
          <Tag
            color={
              item.bank?.difficulty === "0"
                ? "success"
                : item.bank?.difficulty === "1"
                ? "primary"
                : "danger"
            }
          >
            {item.bank?.difficulty === "0"
              ? "简单"
              : item.bank?.difficulty === "1"
              ? "一般"
              : "困难"}
          </Tag>
        </List.Item>
      ))
    ) : (
      <ErrorBlock status="empty" />
    );

  return (
    <div className="bank-wrong">
      <NavBar back="返回" onBack={() => navigate(-1)}>
        错题记录
      </NavBar>
      {/* 题库列表 */}
      <div className="bank-list">
        <List className="bank-item">{bankItems}</List>
      </div>
    </div>
  );
}
