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
} from "antd";

import { ToTopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

// Images
import ava1 from "../assets/images/logo-shopify.svg";
import ava2 from "../assets/images/logo-atlassian.svg";
import ava3 from "../assets/images/logo-slack.svg";
import ava5 from "../assets/images/logo-jira.svg";
import ava6 from "../assets/images/logo-invision.svg";
import face from "../assets/images/face-1.jpg";
import face2 from "../assets/images/face-2.jpg";
import face3 from "../assets/images/face-3.jpg";
import face4 from "../assets/images/face-4.jpg";
import face5 from "../assets/images/face-5.jpeg";
import face6 from "../assets/images/face-6.jpeg";
import pencil from "../assets/images/pencil.svg";
import { useEffect, useState } from "react";
import axios from "axios";

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
  useEffect(() => {
    axios.get("https://report-work.onrender.com/user").then((res) => {
      setData1(res.data);
    });
  }, []);

  //  tôi muốn data trả về giống như sau

  // const data = [
  //   {
  //     key: "1",
  //     name: (
  //       <>
  //         <Avatar.Group>
  //           <Avatar
  //             className="shape-avatar"
  //             shape="square"
  //             size={40}
  //             src={face2}
  //           ></Avatar>
  //           <div className="avatar-info">
  //             <Title level={5}>Michael John</Title>
  //             <p>michael@mail.com</p>
  //           </div>
  //         </Avatar.Group>{" "}
  //       </>
  //     ),
  //     function: (
  //       <>
  //         <div className="author-info">
  //           <Title level={5}>Manager</Title>
  //           <p>Organization</p>
  //         </div>
  //       </>
  //     ),

  //     status: (
  //       <>
  //         <Button type="primary" className="tag-primary">
  //           ONLINE
  //         </Button>
  //       </>
  //     ),
  //     employed: (
  //       <>
  //         <div className="ant-employed">
  //           <span>23/04/18</span>
  //           <a href="#pablo">Edit</a>
  //         </div>
  //       </>
  //     ),
  //   },
  // ];

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
          <div className="ant-employed">
            <a href="#pablo">Edit</a>
          </div>
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
    </>
  );
}

export default Tables;
