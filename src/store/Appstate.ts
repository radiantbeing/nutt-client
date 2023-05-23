import { combineReducers } from "redux";
import { DetectedFoodsReducer } from "./reducers/DetectedFoodsReducer";
import { UserProfileReducer } from "./reducers/UserProfileReducer";

export const rootReducer = combineReducers({
  userProfile: UserProfileReducer,
  detectedFoods: DetectedFoodsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
