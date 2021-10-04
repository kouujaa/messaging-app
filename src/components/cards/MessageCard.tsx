import React from "react";
import moment from "moment";

import { Card, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function MessageCard(props: any) {
  const getDay = (someDate: string) => {
    let now = moment();
    let date = moment(someDate);
    if (now.diff(date, "days") >= 1) {
      return date.fromNow();
    }
    return ` ${date.calendar().split(" ")[0]}`;
  };

  const beenSelected = () => {
    if (props?.message?.sender_id === props.currentUserId) {
      return "#EDF7FF";
    } else return "";
  };
  return (
    <Card
      bordered
      style={{
        width: "60vw",
        margin: "10px",
        borderRadius: "14px",
        backgroundColor: beenSelected(),
      }}
    >
      <Row>
        <Col span={2}>
          <div>
            <UserOutlined style={{ fontSize: 50 }} />
          </div>
        </Col>
        <Col span={20}>
          <div>
            <h3>{props?.message?.content}</h3>
            <h3>{props?.message?.sender_name}</h3>
            <h3>
              {moment(props?.message?.created_at).format("LT")}
              {getDay(props?.message?.created_at)}
            </h3>
          </div>
        </Col>
      </Row>
    </Card>
  );
}
