import React from "react";

import { Card, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export default function ConversationCard(props: any) {
  return (
    <NavLink
      to={{
        pathname: `/conversation/${props.data.id}`,
        state: {
          data: props.data,
        },
      }}
    >
      <Card
        bordered
        hoverable
        style={{
          width: "60vw",
          margin: "10px",
          borderRadius: "14px",
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
              <h3>{props.data.title}</h3>
              <h3>{props?.data?.last_message[0]?.sender_name}</h3>
              <h3>{props?.data?.last_message[0]?.content}</h3>
            </div>
          </Col>
        </Row>
      </Card>
    </NavLink>
  );
}
