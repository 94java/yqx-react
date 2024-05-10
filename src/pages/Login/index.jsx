import {
  Button,
  Form,
  Image,
  Input,
  NavBar,
  Radio,
  Tabs,
  Toast,
} from "antd-mobile";
import React, { useEffect, useRef, useState } from "react";
import "./index.less";
import {
  getCurrentUser,
  login,
  loginByEmail,
  register,
  sendEmailCode,
} from "../../api/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Login() {
  const [loginMethod, setLoginMethod] = useState("1");
  const [email, setEmail] = useState("");
  const [timeDown, setTimeDown] = useState(30);
  const [flag, setFlag] = useState(false);
  const [timer, setTimer] = useState("");
  const navigate = useNavigate();
  const formRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (timeDown <= 0) {
      clearInterval(timer);
      setFlag(false);
    }
  }, [timeDown]);

  return (
    <div className="login">
      <NavBar backArrow={false}>登录</NavBar>
      <div className="logo">
        <Image
          src={require("../../assests/logo.png")}
          height={200}
          fit="cover"
        />
        <div className="tabs">
          <Tabs>
            <Tabs.Tab title="登录" key="login">
              <div className="login-method">
                <Radio.Group
                  defaultValue="1"
                  onChange={(val) => {
                    setLoginMethod(val);
                  }}
                >
                  <Radio value="1">快捷登录</Radio>
                  <Radio value="2">密码登录</Radio>
                </Radio.Group>
              </div>
              {/* 快捷登录表单 */}
              {loginMethod === "1" ? (
                <div className="quick">
                  <Form
                    layout="vertical"
                    onFinish={(values) => {
                      loginByEmail(values).then((resp) => {
                        if (resp.code === 0) {
                          Toast.show({
                            icon: "success",
                            content: "登录成功",
                          });
                          // 存储token
                          localStorage.setItem("token", resp.data);
                          // 获取用户信息并存储到全局数据中
                          getCurrentUser().then((resp) => {
                            if (resp.code === 0) {
                              // 存储用户信息
                              localStorage.setItem(
                                "userInfo",
                                JSON.stringify(resp.data)
                              );
                            }
                          });
                          // 跳转到首页
                          setTimeout(() => {
                            navigate("/");
                          }, 500);
                        }
                      });
                    }}
                    footer={
                      <>
                        <span className="login-tip">
                          未注册的用户将自动注册~
                        </span>

                        <Button
                          block
                          type="submit"
                          color="primary"
                          size="large"
                          shape="rounded"
                        >
                          登录
                        </Button>
                      </>
                    }
                  >
                    <Form.Item
                      name="email"
                      label="邮箱"
                      rules={[{ required: true, message: "邮箱不能为空" }]}
                    >
                      <Input
                        onChange={(value) => {
                          setEmail(value);
                        }}
                        placeholder="请输入邮箱"
                      />
                    </Form.Item>
                    <Form.Item
                      label="验证码"
                      name="code"
                      rules={[{ required: true, message: "验证码不能为空" }]}
                      extra={
                        <div className="extraPart">
                          <Button
                            color="primary"
                            fill="none"
                            onClick={() => {
                              if (email === "") {
                                Toast.show({
                                  content: "请输入邮箱后发送",
                                });
                                return;
                              }
                              setFlag(true);
                              clearInterval(timer);
                              setTimer(
                                setInterval(() => {
                                  setTimeDown((pre) =>
                                    pre - 1 <= 0 ? 0 : pre - 1
                                  );
                                }, 1000)
                              );
                              sendEmailCode({ email }).then((resp) => {
                                if (resp.code === 0) {
                                  Toast.show({
                                    icon: "success",
                                    content: "发送成功",
                                  });
                                }
                              });
                            }}
                            disabled={flag}
                          >
                            {!flag ? "发送验证码" : `${timeDown}秒后继续`}
                          </Button>
                        </div>
                      }
                    >
                      <Input placeholder="请输入验证码" clearable />
                    </Form.Item>
                  </Form>
                </div>
              ) : (
                // 密码登录表单
                <div className="pwd">
                  <Form
                    layout="vertical"
                    onFinish={(values) => {
                      login(values).then((resp) => {
                        if (resp.code === 0) {
                          Toast.show({
                            icon: "success",
                            content: "登录成功",
                          });
                          // 存储token
                          localStorage.setItem("token", resp.data);
                          // 获取用户信息并存储到全局数据中
                          getCurrentUser().then((resp) => {
                            if (resp.code === 0) {
                              // 存储用户信息
                              localStorage.setItem(
                                "userInfo",
                                JSON.stringify(resp.data)
                              );
                            }
                          });
                          // 跳转到首页
                          setTimeout(() => {
                            navigate("/");
                          }, 500);
                        }
                      });
                    }}
                    footer={
                      <Button
                        block
                        type="submit"
                        color="primary"
                        size="large"
                        shape="rounded"
                      >
                        登录
                      </Button>
                    }
                  >
                    <Form.Item
                      name="username"
                      label="用户名"
                      rules={[{ required: true, message: "用户名不能为空" }]}
                    >
                      <Input
                        onChange={console.log}
                        placeholder="请输入用户名"
                      />
                    </Form.Item>
                    <Form.Item
                      label="密码"
                      name="password"
                      rules={[{ required: true, message: "密码不能为空" }]}
                    >
                      <Input
                        placeholder="请输入密码"
                        clearable
                        type="password"
                      />
                    </Form.Item>
                  </Form>
                </div>
              )}
            </Tabs.Tab>
            <Tabs.Tab title="注册" key="register">
              {/* 注册表单 */}
              <Form
                ref={formRef}
                layout="horizontal"
                onFinish={(values) => {
                  register(values).then((resp) => {
                    if (resp.code === 0) {
                      formRef.current?.resetFields();
                      Toast.show({
                        icon: "success",
                        content: "注册成功，请登录",
                      });
                    }
                  });
                }}
                footer={
                  <Button
                    block
                    type="submit"
                    color="primary"
                    size="large"
                    shape="rounded"
                  >
                    注册
                  </Button>
                }
              >
                <Form.Item name="nickname" label="昵称">
                  <Input onChange={console.log} placeholder="请输入昵称" />
                </Form.Item>
                <Form.Item
                  name="username"
                  label="用户名"
                  rules={[{ required: true, message: "用户名不能为空" }]}
                >
                  <Input onChange={console.log} placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item
                  label="密码"
                  name="password"
                  rules={[{ required: true, message: "密码不能为空" }]}
                >
                  <Input placeholder="请输入密码" clearable type="password" />
                </Form.Item>
                <Form.Item
                  name="checkPassword"
                  label="确认密码"
                  rules={[{ required: true, message: "确认密码不能为空" }]}
                >
                  <Input
                    onChange={console.log}
                    placeholder="请再次输入密码"
                    type="password"
                  />
                </Form.Item>
              </Form>
            </Tabs.Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
