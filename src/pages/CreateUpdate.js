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
import { useState } from "react";

import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
  Input,
  Select,
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";

import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/face-1.jpg";
import axios from "axios";

function CreateUpdate() {
  // call api curl -X 'POST' \
  //   'https://report-work.onrender.com/user/create' \
  //   -H 'accept: application/json' \
  //   -H 'Content-Type: application/json' \
  //   -d '{
  //   "username": "tuan",
  //   "password": "tuan123",
  //   "name": "Vũ AnH Tuấn",
  //   "role": "user",
  //   "msnv": "NV0012",
  //   "avatar": "http://example.com/avatar.jpg",
  //   "position": "IT",
  //   "department": "IT"
  // }'
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [msnv, setMsnv] = useState("");
  const [avatar, setAvatar] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");

  const handleSave = () => {
    axios
      .post("https://report-work.onrender.com/user/create", {
        username: username,
        password: password,
        name: name,
        role: role,
        msnv: msnv,
        avatar: avatar,
        position: position,
        department: department,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(false);
      return;
    }
    if (info.file.status === "done") {
    }
  };

  const uploadButton = (
    <div className="ant-upload-text font-semibold text-dark">
      {<VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />}
      <div>Upload Avatar</div>
    </div>
  );

  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>
      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Col span={24} md={12} xl={6}>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader projects-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageURL ? (
                      <img
                        src={imageURL}
                        alt="avatar"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Col>
                <Avatar size={74} shape="square" src={profilavatar} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">
                    <Input
                      placeholder="Full Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </h4>

                  <Select
                    defaultValue="lucy"
                    onChange={(value) => setRole(value)}
                    style={{
                      width: "100%",
                      marginTop: "10px",
                    }}
                    bordered={{
                      border: "none",
                    }}
                  >
                    <Select.Option value="lucy">Nhân viên</Select.Option>
                    <Select.Option value="Yiminghe">
                      Quản trị viên
                    </Select.Option>
                    <Select.Option value="Yiminghe">Giám đốc</Select.Option>
                  </Select>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            ></Col>
          </Row>
        }
      ></Card>
      l
      <Row gutter={[24, 0]}>
        <Col span={24} md={8} className="mb-24 ">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={<h6 className="font-semibold m-0">Thông tin</h6>}
          >
            <Input
              placeholder="Chức vụ"
              style={{
                width: "100%",
              }}
              onChange={(e) => setPosition(e.target.value)}
            />
            <Input
              placeholder="Số điện thoại"
              style={{
                width: "100%",
                marginTop: "10px",
              }}
              onChange={(e) => setMsnv(e.target.value)}
            />
            <Input
              placeholder="Email"
              style={{
                width: "100%",
                marginTop: "10px",
              }}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={<h6 className="font-semibold m-0">Tài khoản</h6>}
          >
            <Input
              placeholder="Username"
              style={{
                width: "100%",
              }}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Password"
              style={{
                width: "100%",
                marginTop: "10px",
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            // title={<h6 className="font-semibold m-0">Conversations</h6>}
            className="header-solid h-full"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          ></Card>
        </Col>
        <Button type="primary" onClick={handleSave}>
          Lưu
        </Button>
      </Row>
    </>
  );
}

export default CreateUpdate;
