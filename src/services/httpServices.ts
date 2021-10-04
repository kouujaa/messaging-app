import http from "./http-common";
type Content = {
  content: String;
};
class HttpService {
  getContacts = async () => {
    return (await http.get("/contacts")).data;
  };
  getConversations = async (user_id: string) => {
    return (await http.get(`/conversations`, { headers: { user_id } })).data;
  };
  getConversation = async (user_id: string) => {
    return (
      await http.get(`/conversations/${user_id}`, { headers: { user_id } })
    ).data;
  };
  getConversationMessages = async (roomId: string, user_id: string) => {
    return (
      await http.get(`/conversations/${roomId}/messages`, {
        headers: { user_id },
      })
    ).data;
  };
  getConversationMessage = async (
    roomId: string,
    messageId: string,
    user_id: string
  ) => {
    return (
      await http.get(`/conversations/${roomId}/messages/${messageId}`, {
        headers: { user_id },
      })
    ).data;
  };
  createConversation = async (data: any, user_id: string) => {
    return (
      await http.post("/conversations", data, {
        headers: { user_id },
      })
    ).data;
  };
  createMessage = async (data: Content, roomId: String, user_id: string) => {
    return (
      await http.post(`/conversations/${roomId}/messages`, data, {
        headers: { user_id },
      })
    ).data;
  };
}

export default new HttpService();
