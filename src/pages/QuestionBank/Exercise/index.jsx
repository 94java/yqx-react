import {
  Button,
  Card,
  Dialog,
  Image,
  NavBar,
  Radio,
  Space,
  Tag,
  Toast,
} from "antd-mobile";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  CheckCircleFill,
  CloseCircleFill,
  KeyOutline,
} from "antd-mobile-icons";
import "./index.less";
import { getSubjectList } from "../../../api/subject";
import { saveWrong } from "../../../api/wrong";
import { getCurrentUser } from "../../../api/user";
export default function Exercise() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const mode = params.get("mode");
  const bankId = params.get("bankId");
  const [subjectList, setSubjectList] = useState([]);
  const [curIndex, setCurIndex] = useState(0);
  const [curAnswer, setCurAnswer] = useState();
  const [isRight, setIsRight] = useState();
  const [rightCount, setRightCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const dialog = async () => {
    const result = await Dialog.confirm({
      content: "未登录，请先登录",
    });
    if (result) {
      navigate("/login");
    } else {
      navigate(-1);
    }
  };
  useEffect(() => {
    // 获取用户信息
    getCurrentUser().then((resp) => {
      // 判断是否登录
      if (!resp.data) {
        // 未登录，提示登录
        dialog();
        return;
      }
      setUserInfo(resp.data);
    });
    // 获取题目集合
    getSubjectList({ bankId, mode }).then((resp) => {
      setSubjectList(resp.data);
    });
  }, []);
  return (
    <div className="exercise">
      <NavBar
        back="返回"
        onBack={() => {
          navigate(-1);
        }}
      >
        题库训练
      </NavBar>
      <div className="header">
        <div className="num">
          <CheckCircleFill color="green" />
          {rightCount}
        </div>
        <div className="num">
          <CloseCircleFill color="red" />
          {wrongCount}
        </div>
        <div className="num">
          正确率: {(rightCount / subjectList.length).toFixed(2) * 100}%
        </div>
      </div>
      {/* 主区域 */}
      <div className="main">
        {/* 类型 */}
        <div className="type">
          <span className="index">1</span>
          {subjectList[curIndex]?.type === "0"
            ? "【单选题】"
            : subjectList[curIndex]?.type === "1"
            ? "【多选题】"
            : "【填空题】"}
        </div>
        {/* 题目内容 */}
        <div className="sub-content">
          {subjectList[curIndex]?.content}
          {isRight &&
            (isRight === "0" ? (
              <Tag color="danger">回答错误</Tag>
            ) : (
              <Tag color="success">回答正确</Tag>
            ))}
        </div>
        {subjectList[curIndex]?.contentImg && (
          <Image src={subjectList[curIndex]?.contentImg} height={200} />
        )}
        {/* 选项 */}
        <div className="answer">
          <Radio.Group
            onChange={(value) => {
              setCurAnswer(value);
              let answer = subjectList[curIndex]?.answers?.find((item) => {
                return item.id === value;
              });
              if (answer.isRight === "0") {
                // 回答错误，加入错题本
                saveWrong({
                  uid: userInfo?.id,
                  subjectId: subjectList[curIndex].id,
                  answerId: answer.id,
                }).then((resp) => {
                  if (resp.code === 0) {
                    Toast.show({ content: "回答错误，已加入错题本" });
                    setWrongCount(wrongCount + 1);
                    setIsRight("0");
                  }
                });
              } else {
                setIsRight("1");
                setRightCount(rightCount + 1);
              }
            }}
            disabled={curAnswer || mode === "2"}
            value={
              curAnswer ||
              (mode === "2" &&
                subjectList[curIndex]?.answers?.find(
                  (item) => item.isRight === "1"
                ).id)
            }
          >
            <Space direction="vertical">
              {subjectList[curIndex]?.answers?.map((item) => {
                return (
                  <Radio value={item.id} key={item.id}>
                    {item.content}
                  </Radio>
                );
              })}
            </Space>
          </Radio.Group>
        </div>
      </div>
      {/* 题目解析 */}
      {(isRight || mode === "2") && (
        <div className="analysis">
          <div className="title">
            <KeyOutline />
            题目解析
          </div>
          <div className="content">
            {subjectList[curIndex]?.analysis
              ? subjectList[curIndex]?.analysis
              : "暂无题目解析"}
          </div>
        </div>
      )}
      {(curIndex !== 0 || subjectList.length !== 1) && (
        <div className="footer">
          <Button
            block
            color="success"
            size="middle"
            shape="rectangular"
            disabled={curIndex === 0}
            onClick={() => {
              setCurAnswer("");
              setIsRight("");
              setCurIndex((pre) => pre - 1);
            }}
          >
            上一题
          </Button>
          <Button
            block
            color="primary"
            size="middle"
            shape="rectangular"
            disabled={curIndex === subjectList.length - 1}
            onClick={() => {
              setCurAnswer("");
              setIsRight("");
              setCurIndex((pre) => pre + 1);
            }}
          >
            下一题
          </Button>
        </div>
      )}
    </div>
  );
}
