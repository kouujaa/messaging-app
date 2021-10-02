import React, {useState, useEffect} from "react";
import { Button, Layout, Typography} from "antd";



const { Header, Content } = Layout;
const { Title } = Typography;

const Conversations = (props:any) => {
  return (
    <div className="Conversations">
        <Title>Conversation title</Title>

        <Button type="primary" shape="round"  size={'large'}>
         Continue
        </Button>
        <Button type="primary" shape="round"  size={'large'}>
          start Conversation
        </Button>
        <Button type="primary" shape="round"  size={'large'}>
         cotinue conversation
        </Button>
        <Button type="primary" shape="round"  size={'large'}>
          send
        </Button>
    </div>
  );
};

export default Conversations;
