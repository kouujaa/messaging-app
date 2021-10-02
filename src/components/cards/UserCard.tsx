import React from "react";

import { Card } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function UserCard(props:any) {
  return (
    <div>
      <Card style={{ width: 300, backgroundColor: '#EDF7FF' }} onClick={()=>{props.onUserSelect(props.data)}}>
        <UserOutlined />
        <p>{props.data.name}</p>
        <p>{props.data.created_at}</p>
      </Card>
    </div>
  );
}
