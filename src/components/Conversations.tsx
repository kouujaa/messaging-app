import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Typography, Input, Form } from "antd";
import httpServices from "../services/httpServices";
import MessageCard from "./cards/MessageCard";
import StartNewConversation from "./StartNewConversation";
import { useParams } from "react-router-dom";
const { Title } = Typography;

const Conversations = (props: any) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [roomMessages, setRoomMessage] = useState<any[]>([]);
  const [currentRoom, setCurrentRoom] = useState("");
  const [currentRoomTitle, setCurrentRoomTitle] = useState("");
  const { roomId }: any = useParams();
  const { currentUser } = props;

  const location: any = useLocation();

  useEffect(() => {
    const getMessages = async (id: string) => {
      const res: any = await httpServices.getConversationMessages(
        id,
        currentUser.id
      );
      if (res) {
        //enrich meassage object
        const enrichedResponse: any = await Promise.all(
          res.map(
            async (e: any) =>
              await httpServices.getConversationMessage(
                id,
                e.id,
                currentUser.id
              )
          )
        );
        setRoomMessage((prev) => enrichedResponse);
      }
    };
    setCurrentRoom(roomId);
    setCurrentRoomTitle(location.state.data.title);
    getMessages(roomId);
  }, [roomId, location, currentUser]);

  const onMessageSend = async (e: any) => {
    if (currentMessage) {
      const res: any = await httpServices.createMessage(
        { content: currentMessage },
        currentRoom,
        currentUser.id
      );
      setRoomMessage((prev) => [...prev, res]);
      setCurrentMessage((prev) => "");
    }
  };

  return (
    <div>
      {roomMessages.length ? (
        <>
          <Title>
            <nav
              onClick={() => {
                props.history.goBack();
              }}
            >
              {currentRoomTitle}
            </nav>
          </Title>
          {roomMessages.map((message) => (
            <MessageCard message={message} />
          ))}
          <div className="Conversations">
            <Input
              allowClear
              style={{ width: "80%" }}
              value={currentMessage}
              onChange={(e) => {
                setCurrentMessage(e.target.value);
              }}
              placeholder="Enter Message here"
            />
            <Button
              type="primary"
              shape="round"
              size={"large"}
              htmlType="submit"
              onClick={onMessageSend}
            >
              send
            </Button>
          </div>
        </>
      ) : (
        <StartNewConversation />
      )}
    </div>
  );
};

export default Conversations;
