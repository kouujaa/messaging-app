import React from "react";

import { Card } from "antd";
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
      <div>
        <Card
          style={{ width: 300, backgroundColor: "#EDF7FF" }}
          onClick={() => { }}
        >
          <UserOutlined />
          <p>{props.data.title}</p>
          <p>{props?.data?.last_message[0]?.sender_name}</p>
          <p>{props?.data?.last_message[0]?.content}</p>
        </Card>
      </div>
    </NavLink>
  );
}
