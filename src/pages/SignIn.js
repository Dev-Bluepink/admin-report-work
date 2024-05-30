/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
} from "antd";
import signinbg from "../assets/images/img-signin.jpg";
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";
function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const login = async (username, password) => {
  try {
    const response = await axios.post(
      "https://report-work.onrender.com/login",
      {
        username: username,
        password: password,
      }
    );

    if (response.status === 200) {
      console.log("Login successful");
      return response.data;
    } else {
      console.log("Login failed");
    }
  } catch (error) {
    console.error(error);
  }
};
export default class SignIn extends Component {
  render() {
    const onFinish = async (values) => {
      try {
        const data = await login(values.username, values.password || "");
        console.log(data);
        console.log("Success:", values);
        localStorage.setItem("info", JSON.stringify(data.data));

        window.location.href = "/report";
      } catch (error) {
        console.error(error);
      }
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return (
      <>
        <Layout
          style={{
            backgroundSize: "cover",
            height: "100vh",
          }}
        >
          <Content
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Row
              gutter={[24, 24]}
              justify="space-around"
              style={{
                padding: "20px",
                borderRadius: "10px",
                width: "1000px",
              }}
            >
              <Col>
                <Title className="mb-15">ĐĂNG NHẬP</Title>

                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  style={{
                    backgroundColor: "#f0f2f5",
                    padding: "20px",
                    borderRadius: "10px",
                    width: "400px",
                  }}
                >
                  <Form.Item
                    className="username"
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Username"
                      style={{ borderRadius: "5px" }}
                    />
                  </Form.Item>

                  <Form.Item
                    className="password"
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Password"
                      type="password"
                      style={{ borderRadius: "5px" }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%", borderRadius: "5px" }}
                    >
                      SIGN IN
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Content>
        </Layout>
      </>
    );
  }
}
