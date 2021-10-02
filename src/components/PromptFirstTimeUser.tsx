import React, { useEffect, useState } from "react";
import UserCard from "./cards/UserCard";
import { Layout, Typography } from "antd";

const { Content } = Layout;
const { Title } = Typography;

export default function PromptFirstTimeUser(props: any) {
    return (
        <div className="Conversations">
            <Title>Let Us Know Who You Are</Title>
            {props?.userList?.map((e: any) => (
                <Content>
                    <UserCard data={e} onUserSelect={props.onUserSelect} />
                </Content>
            ))}
        </div>
    );
}
