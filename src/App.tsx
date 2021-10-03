import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import {
  Switch,
  Route,
  withRouter,
  BrowserRouter as Router,
} from "react-router-dom";
import Conversations from "./components/Conversations";
import Chat from "./components/Chat";
import Dashboard from "./components/Dashboard";
import PromptFirstTimeUser from "./components/PromptFirstTimeUser";
import { Layout } from "antd";
import httpServices from "./services/httpServices";

function App(props: any) {
  const [userList, setUserList] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser((prev) => JSON.parse(user));
    }
    (async () => {
      const res = await httpServices.getContacts();
      setUserList((prev) => res);
    })();
  }, []);

  const onUserSelect = (user: any) => {
    setCurrentUser((prev) => user);
    localStorage.setItem("user", JSON.stringify(user));
  };
  return (
    <div>
      <React.Fragment>
        <div
          className="App-Container"
          style={{ display: "grid", placeItems: "center" }}
        >
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                render={(props) =>
                  currentUser ? (
                    <Dashboard
                      {...props}
                      currentUser={currentUser}
                      userList={userList}
                      currentRoom={currentRoom}
                      setCurrentRoom={setCurrentRoom}
                    />
                  ) : (
                    <PromptFirstTimeUser
                      {...props}
                        onUserSelect={onUserSelect}
                        userList={userList}
                        currentUser={currentUser}
                      />
                    )
                }
              />
              <Route
                exact
                path="/conversation/:roomId"
                render={(props) => (
                  <Conversations {...props} currentUser={currentUser} />
                )}
              />
              <Route exact path="/chat" component={Chat} {...props} />
            </Switch>
          </Router>
        </div>
      </React.Fragment>
    </div>
  );
}

export default withRouter(App);
