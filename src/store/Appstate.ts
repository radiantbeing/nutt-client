import { combineReducers } from "redux";
import { DetectedFoodsReducer } from "./reducers/DetectedFoodsReducer";
import { DetectingImageReducer } from "./reducers/DetectingImage";
import { UserProfileReducer } from "./reducers/UserProfileReducer";
import { FirebaseUserReducer } from "./reducers/FirebaseUserReducer";

export const rootReducer = combineReducers({
  firebaseUser: FirebaseUserReducer,
  userProfile: UserProfileReducer,
  detectedFoods: DetectedFoodsReducer,
  detectingImage: DetectingImageReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
