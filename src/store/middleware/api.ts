import axios from "axios";
import httpServices from "../../services/httpServices";
import * as actions from "../api";
// import rootReducer from "../reducer";
const api =
  (store: any) =>
  (next: (arg0: any) => void) =>
  async (action: {
    type?: any;
    apiCallSuccess?: any;
    apiCallFailed?: any;
    url?: any;
    method?: any;
    data?: any;
    onSuccess?: any;
    onError?: any;
  }) => {
    if (action.type === actions.apiCallBegan.type) return next;
    next(action);
    const { data, onSuccess, onError } = action;
    try {
      const response = httpServices.getContacts();
      console.log("confused", response);
      store.dispatch(action.apiCallSuccess(response));
      if (onSuccess) store.dispatch({ type: onSuccess, payload: response });
    } catch (error) {
      // store.dispatch(action.apiCallFailed(error));
      if (onError) store.dispatch({ type: onError, payload: error });
    }
  };

export default api;
