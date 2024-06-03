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
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
  Input,
  Form,
  Spin,
} from "antd";

import { ToTopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

// Images

import face2 from "../assets/images/face-2.jpg";

import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "antd/lib/modal/Modal";

const { Title } = Typography;

const formProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
// table code start
const columns = [
  {
    title: "Nhân viên",
    dataIndex: "name",
    key: "name",
    width: "32%",
  },
  {
    title: "Chức vụ",
    dataIndex: "function",
    key: "function",
  },

  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "Hành động",
    key: "employed",
    dataIndex: "employed",
  },
];
//  call api https://report-work.onrender.com/user

// table code end

// project table start

function Tables() {
  const [data1, setData1] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    axios.get("https://report-work.onrender.com/user").then((res) => {
      setData1(res.data);
    });
  }, []);

  const showModal = (user) => {
    setLoading(true);
    axios
      .get(`https://report-work.onrender.com/user/detail?idUser=${user._id}`)
      .then((res) => {
        setEditingUser(res.data);
        form.setFieldsValue(res.data);
        setIsModalVisible(true);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOk = () => {
    setLoading(true);
    const values = form.getFieldsValue();
    // id lấy từ editingUser
    values.id = editingUser._id;
    axios
      .put("https://report-work.onrender.com/user/edit", values)
      .then((res) => {
        message.success("User updated successfully");
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to update user");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const data = data1.map((item) => {
    return {
      key: item._id,
      name: (
        <>
          <Avatar.Group>
            <Avatar
              className="shape-avatar"
              shape="square"
              size={40}
              src={face2}
            ></Avatar>
            <div className="avatar-info">
              <Title level={5}>{item.name}</Title>
              <p>{item.email}</p>
            </div>
          </Avatar.Group>{" "}
        </>
      ),
      function: (
        <>
          <div className="author-info">
            <Title level={5}>
              {item.role === "admin" ? "Quản trị viên" : "Nhân viên"}
            </Title>
            <p>{item.position}</p>
          </div>
        </>
      ),

      status: (
        <>
          <Button type="primary" className="tag-primary">
            ONLINE
          </Button>
        </>
      ),
      employed: (
        <>
          <Button type="primary" onClick={() => showModal(item)}>
            Edit
          </Button>
        </>
      ),
    };
  });

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Danh sách nhân viên"
              extra={
                <div className="table-header">
                  {/* nút thêm nhân viên */}
                  <Link to="/create-account">
                    <Button type="primary">Thêm nhân viên</Button>
                  </Link>
                </div>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal
        title="Edit User"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {loading ? (
          <Spin />
        ) : (
          <Form form={form}>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
            <Form.Item name="position" label="Position">
              <Input />
            </Form.Item>
            <Form.Item name="role" label="Role">
              <Radio.Group>
                <Radio value="admin">Admin</Radio>
                <Radio value="user">User</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
}

export default Tables;
