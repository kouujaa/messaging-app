import { createSlice } from "@reduxjs/toolkit";
import httpServices from "../services/httpServices";
type Content = {
  content: String;
};
const slice = createSlice({
  name: "messages",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    getConversationMessages: (messages, action) => {},
    conversationMessagesRecieved: (messages, action) => {
      messages.list = action.payload;
    },
    getConversationMessage: (message, action) => {},
    conversationMessageRecieved: (message, action) => {},
    createMessage: (message, action) => {},
    messageCreated: (message, action) => {},
  },
});
export const loadConversationMessages = (roomId: string, user_id: string) =>
  httpServices.getConversationMessages(roomId, user_id);
export const loadConversationMessage = (
  roomId: string,
  messageId: string,
  user_id: string
) => httpServices.getConversationMessage(roomId, messageId, user_id);
export const sendMessage = (data: Content, roomId: string, user_id: string) =>
  httpServices.createMessage(data, roomId, user_id);

export const {
  getConversationMessages,
  conversationMessagesRecieved,
  getConversationMessage,
  conversationMessageRecieved,
  createMessage,
  messageCreated,
} = slice.actions;
export default slice.reducer;
