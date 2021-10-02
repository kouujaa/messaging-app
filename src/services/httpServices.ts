import http from "../http-common";
// import ITutorialData from "../types/tutorial.type"
type Content = {
  content: String;
};
type Contact = {
  id: Number;
  name: String;
  created_at: String;
  updated_at: String;
};
class HttpService {
  getContacts = async () => {
    return (await http.get("/contacts")).data;
  };
  getConversations = async (id: string) => {
    return (await http.get(`/conversations`, { headers: { user_id: id } }))
      .data;
  };
  getConversation = async (id: string) => {
    return (
      await http.get(`/conversations/${id}`, { headers: { user_id: id } })
    ).data;
  };
  getConversationMessages = async (id: string) => {
    return (
      await http.get(`/conversations/${id}/messages`, {
        headers: { user_id: id },
      })
    ).data;
  };
  getConversationMessage = async (id: string, messageId: string) => {
    return (
      await http.get(`/conversations/${id}/messages/${messageId}`, {
        headers: { user_id: id },
      })
    ).data;
  };
  createConversation = async (data: any, id: string) => {
    return (
      await http.post("/conversations", data, {
        headers: { user_id: id },
      })
    ).data;
  };
  createMessage = async (data: Content, id: string) => {
    return (
      await http.post("/conversations", data, {
        headers: { user_id: id },
      })
    ).data;
  };
}

export default new HttpService();
