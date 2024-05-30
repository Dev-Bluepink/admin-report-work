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

import { Row, Col, Input, DatePicker, Button } from "antd";

import { Card, Avatar } from "antd";

import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/face-1.jpg";
import TextArea from "antd/lib/input/TextArea";
import Title from "antd/lib/skeleton/Title";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
function Report() {
  const infoUser = localStorage.getItem("info");
  //  tôi muốn call gẻ api vào trang report truyền id và ngày https://report-work.onrender.com/report?date=1&idUser=1

  const idUser = JSON.parse(infoUser)._id;
  // định dạng 24-09-2021
  const [date, setDate] = useState(
    moment().format("YYYY-MM-DD") || moment().format("YYYY-MM-DD")
  );
  const [reportToday, setReportToday] = useState("");
  const [reportTomorrow, setReportTomorrow] = useState("");
  const [today, setToday] = useState("");
  const [tomorrow, setTomorrow] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://report-work.onrender.com/report?date=${date}&idUser=${idUser}`
      )
      .then((res) => {
        console.log(res.data);
        setReportToday(res.data.today);
        setReportTomorrow(res.data.tomorrow);
      });
  }, [date, idUser]);

  console.log(reportToday);

  const handleSave = () => {
    // https://report-work.onrender.com/report/input
    axios
      .post("https://report-work.onrender.com/report/input", {
        idUser: idUser,
        date: date,
        today: reportToday,
        tomorrow: reportTomorrow,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

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
                <Avatar
                  size={74}
                  shape="square"
                  src={infoUser ? JSON.parse(infoUser).avatar : profilavatar}
                />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">
                    {infoUser ? JSON.parse(infoUser).username : "Nguyễn Văn A"}
                  </h4>
                  <p>{infoUser ? JSON.parse(infoUser).role : "Nhân viên"}</p>
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
      <Row gutter={[24, 0]}>
        <Col span={24}>
          <h3>Ngày báo cáo</h3>
        </Col>
        <Col
          span={24}
          style={{
            marginBottom: "20px",
          }}
        >
          <h3>Báo cáo hôm nay</h3>
          <DatePicker
            // lấy mặc định ngày hiện tại
            defaultValue={moment() || date}
            onChange={(date, dateString) => setDate(dateString || moment())}
            style={{
              width: "100%",
              marginBottom: "20px",
            }}
          />
          {/* // hiện thị báo cáo hôm nay và có thể chỉnh sửa */}
          <TextArea
            placeholder="Báo cáo hôm nay"
            style={{
              height: "200px",
            }}
            value={reportToday}
            onChange={(e) => setReportToday(e.target.value)}
          />
        </Col>
        <Col span={24} style={{ marginBottom: "20px" }}>
          <h3>Báo cáo ngày mai</h3>
          <TextArea
            placeholder="Báo cáo ngày mai"
            style={{
              height: "200px",
            }}
            value={reportTomorrow}
            onChange={(e) => setReportTomorrow(e.target.value)}
          />
        </Col>
        <Col span={24} style={{ marginBottom: "20px" }}>
          <Button type="primary" onClick={handleSave}>
            Lưu
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Report;
