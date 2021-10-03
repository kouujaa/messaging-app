import React, { useState, useEffect } from "react";
import { Button, Layout, Typography } from "antd";
import _ from "lodash";
import UserCard from "./cards/UserCard";
import httpServices from "../services/httpServices";
import ConversationCard from "./cards/ConversationCard";

const { Content } = Layout;
const { Title } = Typography;

const Dashboard = (props: any) => {
  const [selectContacts, setSelectContacts] = useState<any[]>([]);
  const [conversations, SetConversation] = useState<any[]>([]);

  // userList={userList} currentUser={currentUser}

  useEffect(() => {
    (async () => {
      const res = await httpServices.getConversations(props.currentUser.id);
      if (res) {
        SetConversation((prev) => res);
      }
    })();
  }, [props.currentUser.id]);

  const addToContactList = (e: any) => {
    setSelectContacts((prev) => [...prev, ...e]);
  };

  const beenSelected = (e: any) => {
    const re = props.userList.filter((i: any) => _.isEqual(i, e));
    if (re.length) {
      return true;
    }
  };
  return (
    <div className="Dashboard">
      <Title>Welcome {props.currentUser.name}</Title>
      {conversations.length ? (
        <>
          <Title>Your conversations</Title>
          {conversations.map((e: any) => (
            <Content key={e.id}>
              <ConversationCard data={e} />
            </Content>
          ))}
          <Button type="primary" shape="round" size={"large"}>
            dash
          </Button>
        </>
      ) : (
        <>
          <Title>You have No conversations</Title>
          <Title>Select Contacts to Message</Title>
          {props?.userList
            ?.filter((e: any) => e.id !== props.currentUser.id)
            .map((e: any) => (
              <Content
                key={e.id}
                onClick={() => {
                  addToContactList(e);
                }}
              >
                <UserCard data={e} />
              </Content>
            ))}
          <Button type="primary" shape="round" size={"large"}>
            dash
          </Button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
