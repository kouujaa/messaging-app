import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import {
  Switch,
  Route,
  withRouter,
  BrowserRouter as Router,
} from 'react-router-dom';
import Conversations from './components/Conversations';
import Dashboard from './components/Dashboard';
import PromptFirstTimeUser from './components/PromptFirstTimeUser';
import httpServices from './services/httpServices';
import CreateRoom from './components/CreateRoom';

function App(props: any) {
  const [userList, setUserList] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
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
    localStorage.setItem('user', JSON.stringify(user));
  };
  return (
    <div style={{ display: 'grid', placeItems: 'center' }}>
      <React.Fragment>
        <div
          style={{ display: 'grid', placeItems: 'center', width: '100%' }}
        >
          <Router>
            <Switch>
              <Route
                exact
                path='/'
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
                path='/conversation/:roomId'
                render={(props) => (
                  <Conversations {...props} currentUser={currentUser} />
                )}
              />
              <Route
                exact
                path='/createRoom'
                render={(props) => (
                  <CreateRoom {...props} currentUser={currentUser} />
                )}
              />
            </Switch>
          </Router>
        </div>
      </React.Fragment>
    </div>
  );
}

export default withRouter(App);
