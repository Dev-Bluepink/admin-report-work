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
import FileSaver from "file-saver";
function GetReports() {
  const infoUser = localStorage.getItem("info");
  const [data, setData] = useState([]);
  const idUser = JSON.parse(infoUser)._id;
  const [note, setNote] = useState("");

  const [date, setDate] = useState(
    moment().format("YYYY-MM-DD") || moment().format("YYYY-MM-DD")
  );

  //    https://report-work.onrender.com/export?date=2024-05-30

  useEffect(() => {
    axios
      .get(`https://report-work.onrender.com/export?date=${date}`)
      .then((res) => {
        setData(res.data);
        setNote(res.data.note?.note);
      });
  }, [date]);
  console.log(data);
  const handleExport = () => {
    axios
      .post(
        "https://report-work.onrender.com/export/download",
        {
          date: date,
          note: note,
        },
        {
          responseType: "blob", // to get the data as a Blob
        }
      )
      .then((res) => {
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        FileSaver.saveAs(blob, "report.xlsx");
      });
  };

  return (
    <>
      {/* <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div> */}

      <Card
        className="card-profile-head"
        style={{ marginTop: "20px" }}
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={24} className="col-info">
              <Button
                type="primary"
                onClick={handleExport}
                style={{
                  marginBottom: "20px",
                  width: "100%",
                }}
              >
                Xuất báo cáo
              </Button>
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
        </Col>
        <Col span={24} style={{ marginBottom: "20px" }}>
          <h3>GHI CHÚ</h3>
          <TextArea
            placeholder="Ghi chú cho báo cáo"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{
              height: "100px",
            }}
          />
        </Col>
        {/* kẻ bảng Mã số nhân viên, Tên nhân viên, Báo cáo hôm nay, Báo cáo ngày mai */}
        <Col span={24}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Mã số nhân viên
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Tên nhân viên
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Báo cáo hôm nay
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Báo cáo ngày mai
              </th>
            </tr>
            {data.report?.map((item) => (
              <tr>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {item.code}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {item.name}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {/* nếu có /n thì xuống hàng */}
                  {item.today.split("\n").map((i, key) => (
                    <p key={key}>{i}</p>
                  ))}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {item.tomorrow.split("\n").map((i, key) => (
                    <p key={key}>{i}</p>
                  ))}
                </td>
              </tr>
            ))}
          </table>
        </Col>
      </Row>
    </>
  );
}

export default GetReports;
