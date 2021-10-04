import React, { useState, useEffect } from "react";
import { Button, Typography, Input, Card, Row, Col } from "antd";
import { UserOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import httpServices from "../services/httpServices";

const { Title } = Typography;

const CreateRoom = (props: any) => {
  const [title, setTitle] = useState("");
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res: any = await httpServices.getContacts();
      if (res.length) {
        const convoContactcs = res.filter((e: any) =>
          props.location.state.data.includes(e.id)
        );
        setContacts((prev) => [...convoContactcs]);
      }
    })();
  }, [props]);

  const onStartChat = async () => {
    const res = await httpServices.createConversation(
      {
        title,
        contact_ids: props.location.state.data,
      },
      props.currentUser.id
    );
    if (res.id) {
      props.history.push(`/conversation/${res.id}`, {
        data: { title: res.title },
      });
    }
  };

  return (
    <div style={{ marginTop: "4em", marginBottom: "4em" }}>
      <ArrowLeftOutlined
        style={{ marginRight: "20px", cursor: "pointer", fontSize: "40px" }}
        onClick={() => {
          props.history.goBack();
        }}
      />
      <Title
        style={{
          textAlign: "center",
          fontSize: "40px",
          fontWeight: "lighter",
        }}
      >
        Welcome {props.currentUser.name}
      </Title>
      <Title style={{ textAlign: "center", fontSize: "400" }}>
        Give title to start a new conversation with{" "}
        {props.location.state.data.length} participants
      </Title>
      {contacts.length ? (
        <div style={{}}>
          {contacts.map((contact: any) => (
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
                    <h3>{contact.name}</h3>
                  </div>
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      ) : null}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Input
          allowClear
          style={{ width: "80%" }}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Enter Title Here"
        />
        <Button
          type="primary"
          shape="round"
          size={"large"}
          htmlType="submit"
          onClick={onStartChat}
        >
          Start Conversation
        </Button>
      </div>
    </div>
  );
};

export default CreateRoom;
