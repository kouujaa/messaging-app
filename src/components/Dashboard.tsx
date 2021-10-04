import React, { useState, useEffect } from "react";
import { Button, Layout, Typography, Card, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";

import httpServices from "../services/httpServices";
import ConversationCard from "./cards/ConversationCard";
import { NavLink } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;

const Dashboard = (props: any) => {
  const [selectedContacts, setSelectContacts] = useState<any[]>([]);
  const [conversations, setConversation] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await httpServices.getConversations(props?.currentUser?.id);
      if (res) {
        setConversation((prev) => res);
      }
    })();
  }, [props]);

  const addToContactList = (e: any) => {
    if (!selectedContacts.includes(e)) {
      setSelectContacts((prev) => [...prev, e]);
    } else {
      setSelectContacts((prev) => prev?.filter((a) => a !== e));
    }
  };

  const beenSelected = (e: any) => {
    if (selectedContacts.includes(e)) {
      return "#EDF7FF";
    } else return "";
  };

  return (
    <div style={{ marginTop: "4em", marginBottom: "4em" }}>
      {conversations.length ? (
        <>
          <Title style={{ textAlign: "left", fontSize: "400" }}>
            Your Conversations
          </Title>
          <div style={{ height: "80vh", overflow: "scroll" }}>
            {conversations.map((e: any) => (
              <Content key={e.id}>
                <ConversationCard data={e} />
              </Content>
            ))}
          </div>
        </>
      ) : (
        <>
          <Title
            style={{
              textAlign: "center",
              fontSize: "40px",
              fontWeight: "lighter",
            }}
          >
            You dont have any conversations
          </Title>
          <Title style={{ textAlign: "center", fontSize: "400" }}>
            Select Contacts to Message
          </Title>
          <div style={{ height: "80vh", overflow: "scroll" }}>
            {props?.userList
              ?.filter((user: any) => user.id !== props?.currentUser.id)
              .map((e: any) => (
                <Card
                  bordered
                  hoverable
                  style={{
                    width: "60vw",
                    margin: "10px",
                    borderRadius: "14px",
                    backgroundColor: beenSelected(e.id),
                  }}
                  onClick={() => {
                    addToContactList(e.id);
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
                        <h3>{e.name}</h3>
                        <h3>{e.created_at}</h3>
                      </div>
                    </Col>
                  </Row>
                </Card>
              ))}
          </div>
          {selectedContacts.length ? (
            <NavLink
              to={{
                pathname: `/createRoom`,
                state: {
                  data: selectedContacts,
                },
              }}
            >
              <Button
                type="primary"
                shape="round"
                size={"large"}
                style={{ alignContent: "flex-end", marginLeft: "auto" }}
              >
                Continue
              </Button>
            </NavLink>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Dashboard;
