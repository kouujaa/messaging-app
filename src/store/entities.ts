import { combineReducers } from "redux";
import roomsReducer from "./rooms";
import messagesReducer from "./messages";
import usersReducer from "./users";

export default combineReducers({
  rooms: roomsReducer,
  messages: messagesReducer,
  users: usersReducer,
});
