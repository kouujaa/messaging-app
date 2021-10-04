import React from "react";
import UserCard from "./cards/UserCard";
import { Layout, Typography } from "antd";

const { Content } = Layout;
const { Title } = Typography;

export default function PromptFirstTimeUser(props: any) {
  return (
    <div style={{ marginTop: "4em", marginBottom: "4em" }}>
      <Title style={{ textAlign: "left", fontSize: "400" }}>
        Let Us Know Who You Are
      </Title>
      <div style={{ height: "80vh", overflow: "scroll" }}>
        {props?.userList?.map((e: any) => (
          <Content>
            <UserCard data={e} onUserSelect={props.onUserSelect} />
          </Content>
        ))}
      </div>
    </div>
  );
}
