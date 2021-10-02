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
  const [userList, setUserList] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setCurrentUser((prev) => JSON.parse(user))
    }
    (async () => {
      const res = await httpServices.getContacts()
      setUserList((prev) => res)
    })()
  }, [])

  const onUserSelect = (user: any) => {
    setCurrentUser((prev) => user)
    localStorage.setItem("user", JSON.stringify(user))
  }

  return (
    <div>
      <React.Fragment>
        <div className="App-Container">
          <Router>
            <Switch>
              {/* <Route
                exact
                path="/"
                component={PromptFirstTimeUser}
                {...props}
              />
              <Route
                exact
                path="/home"
                component={PromptFirstTimeUser}
                {...props}
              /> */}
              <Route
                exact
                path="/"
                render={props =>
                  currentUser ? (
                    <Dashboard {...props} currentUser={currentUser} userList={userList} />
                  ) : (
                    <PromptFirstTimeUser {...props} onUserSelect={onUserSelect} userList={userList} currentUser={currentUser} />
                  )
                }
              />
              <Route
                exact
                path="/dashboard"
                render={props =>
                (
                  <Dashboard {...props} currentUser={currentUser} userList={userList} />
                )
                }
              />
              <Route
                exact
                path="/conversation"
                component={Conversations}
                {...props}
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
