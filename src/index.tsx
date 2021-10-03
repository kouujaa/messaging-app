import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Router, NavLink, useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import * as actions from "./store/api";
import { Button, notification } from 'antd';
import httpServices from "./services/httpServices";



// Action Cable setup
import ActionCable from "actioncable";

// import { useDispatch,useSelector } from "react-redux";
const store = configureStore();
// store.dispatch(
//   actions.apiCallSuccess({ onSuccess: "conversationMessagesRecieved" })
// );
const app: any = {};
const history = createBrowserHistory();
app.cable = ActionCable.createConsumer("ws://34.122.252.114:3000/cable");
app.cable.subscriptions.create({ channel: "NotificationsChannel" });
app.messaging = app.cable.subscriptions.create("NotificationsChannel", {
  received: async (data: any) => {
    console.log(data)
    const checkUser: any = localStorage.getItem("user");
    const user = JSON.parse(checkUser)
    const { contact_ids, conversation_id } = data
    if (user && contact_ids.includes(user.id)) {
      // if (data.sender_id !== user.id) {
      const description = `new message from ${data.sender_name}: ${data.content}`
      const key = `open${Date.now()}`
      const btn = (
        <Button type="primary" size="small" onClick={() => notification.close(key)}>
          View Message
        </Button>
      );
      notification.open({
        message: 'Message Notification',
        description,
        onClick: () => {
          history.push(`/conversation/${conversation_id}/:title`, { data });
        },
        btn,
        key,
        duration: 5
      })
      // }

    }

  },
  sendMessage: function (messageBody: any) {
    // this.perform("foobar", { body: messageBody, to: "1" });
  },
});


ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
