import { combineReducers } from "redux";
import { UserProfileReducer } from "./reducers/UserProfileReducer";

export const rootReducer = combineReducers({
  userProfile: UserProfileReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
