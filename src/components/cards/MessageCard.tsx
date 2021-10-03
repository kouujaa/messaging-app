import React from "react";
import moment from "moment";

import { Card } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function MessageCard(props: any) {
  const getDay = (someDate: string) => {
    let now = moment();
    let date = moment(someDate);
    // console.log(date, someDate)
    if (now.diff(date, "days") >= 1) {
      return date.fromNow();
    }
    return date.calendar().split(" ")[0];
  };

  return (
    <>
      <Card style={{ width: "100%", backgroundColor: "#EDF7FF" }}>
        <UserOutlined />
        <p>{props?.message?.content}</p>
        <p>{props?.message?.sender_name}</p>
        <p>
          {moment(props?.message?.created_at).format("LT")}{" "}
          {getDay(props?.message?.created_at)}
        </p>
      </Card>
    </>
  );
}
