import { UserProfile } from "../../interfaces/UserInterface";

export const USER_TYPE = "USER_TYPE";

export interface UserProfileAction {
  type: string;
  payload: UserProfile | null;
}

export const UserProfileReducer = (
  state: UserProfile | null = null,
  action: UserProfileAction
) => {
  switch (action.type) {
    case USER_TYPE:
      return action.payload;
    default:
      return state;
  }
};
