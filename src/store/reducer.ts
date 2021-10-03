import { combineReducers } from "redux";
import entitiesReducer from "./entities";

const rootReducer = combineReducers({
  entities: entitiesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

//done
