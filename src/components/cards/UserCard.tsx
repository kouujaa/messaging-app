import React from "react";

import { Card, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function UserCard(props: any) {
  return (
    <div>
      <Card
        bordered
        hoverable
        style={{
          width: "60vw",
          margin: "10px",
          borderRadius: "14px",
        }}
        onClick={() => {
          props.onUserSelect(props.data);
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
              <h3>{props.data.name}</h3>
              <h3>{props.data.created_at}</h3>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
