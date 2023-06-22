import { FirebaseError } from "@firebase/util";
import {
  createUserWithEmailAndPassword,
  getAuth,
  UserCredential,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { app } from "../services/app";
import { SET_FIREBASE_USER } from "../store/reducers/FirebaseUserReducer";
import useErrorToast from "./useErrorToast";

const auth = getAuth(app);

export const useRegister = () => {
  const dispatch = useDispatch();
  const showErrorToast = useErrorToast();

  const register = async (email: string, password: string) => {
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      dispatch({ type: SET_FIREBASE_USER, payload: user });
      return { isSuccess: true };
    } catch (error) {
      let errorCode = "";
      let errorMessage = "";
      if (error instanceof FirebaseError) {
        errorCode = error.code;
        errorMessage = error.message;
        switch (errorCode) {
          case "auth/email-already-in-use":
            errorCode = "회원가입 오류";
            errorMessage = "이미 가입된 이메일입니다.";
        }
      }
      showErrorToast(errorCode, errorMessage);
      return { isSuccess: false };
    }
  };

  return register;
};
