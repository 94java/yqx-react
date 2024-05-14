import { Button, Dialog, NavBar, Space, TextArea, Toast } from "antd-mobile";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.less";
import { savePopular } from "../../../api/popular";
import { getCurrentUser } from "../../../api/user";
export default function Add() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
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
        dialog();
      }
    });
  }, []);
  return (
    <div className="add-popular">
      <NavBar
        back="返回"
        onBack={() => {
          navigate(-1);
        }}
        right={
          <Button
            color="primary"
            size="small"
            shape="rounded"
            disabled={!value}
            onClick={() => {
              savePopular({ content: value }).then((resp) => {
                if (resp.code === 0) {
                  Toast.show({ icon: "success", content: "发布成功" });
                  navigate(-1);
                }
              });
            }}
          >
            发布
          </Button>
        }
      ></NavBar>
      {/* 内容区 */}
      <TextArea
        placeholder="和朋友一起分享新鲜事~"
        value={value}
        onChange={(val) => {
          setValue(val);
        }}
        autoSize={{ minRows: 22, maxRows: 25 }}
        maxLength={1000}
        showCount
      />
    </div>
  );
}
