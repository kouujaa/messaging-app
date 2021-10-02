import React, { useEffect, useState } from "react";
import httpServices from "../../services/httpServices";

import { Card } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function ConversationCard(props: any) {

    return (
        <div>
            <Card style={{ width: 300, backgroundColor: '#EDF7FF' }} onClick={() => { console.log(props.data) }}>
                <UserOutlined />
                <p>{props.data.title}</p>
                <p>{props.data.last_message[0].sender_name}</p>
                <p>{props.data.last_message[0].content}</p>
            </Card>
        </div>
    );
}
