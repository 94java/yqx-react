import {
  Button,
  Form,
  ImageUploader,
  Input,
  NavBar,
  Selector,
  Stepper,
  TextArea,
  Toast,
} from "antd-mobile";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.less";
import { getCurrentUser, updateUserInfo } from "../../../api/user";
import { upload } from "../../../api/file";
export default function UpdateInfo() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    getCurrentUser().then((resp) => {
      form.setFieldsValue({
        ...resp.data,
        avatar: [{ url: resp.data.avatar }],
      });
    });
  }, []);

  return (
    <div className="user-update-info">
      <NavBar back="返回" onBack={() => navigate(-1)}>
        编辑资料
      </NavBar>
      {/* 编辑表单 */}
      <Form
        form={form}
        className="update-form"
        layout="horizontal"
        footer={
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        }
        onFinish={(values) => {
          values.avatar = values.avatar ? values.avatar[0]?.url : "";
          values.sex = values.sex ? values.sex[0] : "";
          updateUserInfo(values).then((resp) => {
            if (resp.code === 0) {
              Toast.show({ icon: "success", content: "修改成功" });
              setTimeout(() => {
                navigate(-1);
              }, 500);
            }
          });
        }}
      >
        <Form.Item name="id" label="id" hidden>
          <Input placeholder="用户id" />
        </Form.Item>
        <Form.Item name="avatar" label="头像">
          <ImageUploader
            maxCount={1}
            upload={async (file) => {
              let resp = await upload({ file });
              return { url: resp.data };
            }}
          />
        </Form.Item>
        <Form.Item name="nickname" label="昵称">
          <Input placeholder="请输入昵称" />
        </Form.Item>
        <Form.Item name="age" label="年龄">
          <Stepper />
        </Form.Item>
        <Form.Item name="sex" label="性别">
          <Selector
            columns={2}
            options={[
              { label: "男", value: "1" },
              { label: "女", value: "0" },
            ]}
          />
        </Form.Item>
        <Form.Item name="city" label="所在城市">
          <Input placeholder="输入所在城市" />
        </Form.Item>
        <Form.Item name="password" label="密码">
          <Input placeholder="输入密码，留空不修改" type="password" />
        </Form.Item>
        <Form.Item name="sign" label="签名">
          <TextArea
            placeholder="请输入个性签名"
            maxLength={100}
            rows={2}
            showCount
          />
        </Form.Item>
      </Form>
    </div>
  );
}
