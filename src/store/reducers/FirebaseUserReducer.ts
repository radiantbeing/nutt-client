import { User } from "firebase/auth";

export const SET_FIREBASE_USER = "SET_FIREBASE_USER";

export interface FirebaseUserAction {
  type: string;
  payload: User | null;
}

export const FirebaseUserReducer = (
  state: User | null = null,
  action: FirebaseUserAction
) => {
  switch (action.type) {
    case SET_FIREBASE_USER:
      return action.payload;
    default:
      return state;
  }
};
