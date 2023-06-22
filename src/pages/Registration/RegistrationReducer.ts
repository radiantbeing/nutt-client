interface RegistrationState {
  email: string;
  isEmailValid: boolean;
  password: string;
  isPasswordValid: boolean;
}

interface RegistrationAction {
  type: string;
  payload: any;
}

const registrationReducer = (
  state: RegistrationState,
  action: RegistrationAction
) => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, ...action.payload };
    case "SET_PASSWORD":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default registrationReducer;
