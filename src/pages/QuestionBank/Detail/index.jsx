import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { NavBar, Card, Image } from "antd-mobile";
import {
  EyeOutline,
  ClockCircleOutline,
  HistogramOutline,
  PieOutline,
  ContentOutline,
} from "antd-mobile-icons";

import "./index.less";
import { getBankById } from "../../../api/bank";
import { dateFtt } from "../../../utils/date";
export default function Detail() {
  // 获取路由参数-题库id
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [bankData, setBankData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    getBankById(id).then((resp) => {
      setBankData(resp.data);
    });
  }, []);

  function goBack() {
    navigate(-1);
  }

  // 自由练习  0-顺序 1-随机 2-背题
  const handleExercise = (mode) => {
    navigate(`/question-bank/exercise?mode=${mode}&bankId=${bankData.id}`);
  };
  return (
    <div className="question-bank-detail">
      <NavBar back="返回" onBack={() => goBack()}>
        题库详情
      </NavBar>
      {/* 题库信息 */}
      <Card bodyClassName="bank-info">
        <Image src={bankData?.coverImg} className="bank-pic" />
        <div className="base-info">
          <h3 className="bank-title">{bankData?.name}</h3>
          <p className="desc">{bankData?.summary}</p>
          <div>
            <span className="title">难度:</span>
            {bankData?.difficulty === "0"
              ? "简单"
              : bankData?.difficulty === "1"
              ? "一般"
              : "困难"}
          </div>
          <div>
            <span className="title">分类:</span>
            {bankData?.category?.name}
          </div>
          <div>
            <span className="title">题目总数:</span>
            {bankData?.count}
          </div>
          <div className="meta">
            <EyeOutline /> {bankData?.views}
            {/* <LikeOutline /> 12 */}
            <ClockCircleOutline />{" "}
            {dateFtt("yyyy-MM-dd HH:mm:ss", new Date(bankData?.updateTime))}
          </div>
        </div>
      </Card>
      {/* 按钮-训练模式选择 */}
      <Card bodyClassName="bank-btn">
        <div className="title">自由练习</div>
        <div className="btns">
          <div
            className="btn-item"
            onClick={() => {
              handleExercise(0);
            }}
          >
            <HistogramOutline />
            顺序训练
          </div>
          <div
            className="btn-item"
            onClick={() => {
              handleExercise(1);
            }}
          >
            <PieOutline />
            随机训练
          </div>
          <div
            className="btn-item"
            onClick={() => {
              handleExercise(2);
            }}
          >
            <ContentOutline />
            背题模式
          </div>
        </div>
      </Card>
    </div>
  );
}
