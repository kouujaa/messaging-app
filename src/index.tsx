import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Button, notification } from "antd";

import ActionCable from "actioncable";
const audio = new Audio("https://www.joshwcomeau.com/sounds/pop-up-on.mp3");

const history = createBrowserHistory();
const app: any = {};
app.cable = ActionCable.createConsumer("ws://34.122.252.114:3000/cable");
app.cable.subscriptions.create({ channel: "NotificationsChannel" });
app.messaging = app.cable.subscriptions.create("NotificationsChannel", {
  received: async (data: any) => {
    const checkUser: any = localStorage.getItem("user");
    const user = JSON.parse(checkUser);
    const { contact_ids, conversation_id } = data;
    if (user && contact_ids.includes(user.id)) {
      if (data.sender_id !== user.id) {
        await audio.play();
        const description = `new message from ${data.sender_name}: ${data.content}`;
        const key = `open${Date.now()}`;
        const btn = (
          <Button
            type="primary"
            size="small"
            onClick={() => notification.close(key)}
          >
            View Message
          </Button>
        );
        notification.open({
          message: "Message Notification",
          description,
          onClick: () => {
            history.push(`/conversation/${conversation_id}`, { data });
            window.location.reload();
          },
          btn,
          key,
          duration: 5,
        });
      }
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
