import {
  Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Stack,
  FormErrorMessage,
  HStack,
  InputRightElement,
  Button,
  InputGroup,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import ChatBot from "../../components/ChatBot";
import TemplateGrid from "../../layouts/TemplateGrid";
import NavigateButton from "../../components/NavigateButton";
import { useNavigate } from "react-router-dom";
import { useReducer, useState } from "react";
import useErrorToast from "../../hooks/useErrorToast";
import { useRegister } from "../../hooks/useRegister";
import registrationReducer from "./RegistrationReducer";

const initialState = {
  email: "",
  password: "",
  isEmailValid: false,
  isPasswordValid: false,
};

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [{ email, password, isEmailValid, isPasswordValid }, dispatch] =
    useReducer(registrationReducer, initialState);
  const navigate = useNavigate();
  const register = useRegister();
  const toastError = useErrorToast();

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = /^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    dispatch({
      type: "SET_EMAIL",
      payload: {
        email: e.target.value,
        isEmailValid: pattern.test(e.target.value),
      },
    });
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#]).{8,20}$/;
    dispatch({
      type: "SET_PASSWORD",
      payload: {
        password: e.target.value,
        isPasswordValid: pattern.test(e.target.value),
      },
    });
  };

  const onClickShowPassword = () => setShowPassword(!showPassword);

  const onClickRegister = async () => {
    if (!isEmailValid || !isPasswordValid) {
      toastError("입력 확인", "이메일 또는 비밀번호를 다시 확인하세요.");
      return;
    }
    setIsLoading(true);
    const { isSuccess } = await register(email, password);
    setIsLoading(false);
    if (isSuccess) navigate("/"); // TODO: 네비게이션 경로 설정
  };

  const header = <Header onPrevClick={() => navigate("/")}>회원가입</Header>;

  const main = (
    <Stack spacing={6}>
      <ChatBot message="반갑습니다! 저는 AI 식단 관리 도우미 ‘뉴트(Nutt)입니다. 앱의 모든 기능을 사용하기 위해 회원가입을 진행해주세요." />
      <FormControl isInvalid={email === "" ? false : !isEmailValid}>
        <FormLabel>이메일</FormLabel>
        <Input
          type="email"
          placeholder="nutt@example.com"
          value={email}
          onChange={onChangeEmail}
        />
        {email === "" ? (
          <FormHelperText>이메일을 입력하세요</FormHelperText>
        ) : isEmailValid ? (
          <FormHelperText>유효한 이메일입니다</FormHelperText>
        ) : (
          <FormErrorMessage>
            유효한 이메일 주소인지 확인해주세요
          </FormErrorMessage>
        )}
      </FormControl>
      <FormControl>
        <FormLabel>비밀번호</FormLabel>
        <InputGroup size="md">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="8~20자의 영문+숫자+특수문자(!, @, #)"
            value={password}
            onChange={onChangePassword}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={onClickShowPassword}>
              {showPassword ? "숨기기" : "보기"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {password === "" ? (
          <FormHelperText>비밀번호를 입력해주세요</FormHelperText>
        ) : (
          <FormHelperText>
            {isPasswordValid ? (
              <Text color="green.500">사용 가능한 비밀번호입니다</Text>
            ) : (
              <Text color="red.500">
                8~20자의 영문+숫자+특수문자(!, @, #)를 사용해주세요
              </Text>
            )}
          </FormHelperText>
        )}
      </FormControl>
    </Stack>
  );

  const footer = (
    <HStack boxSize="full">
      <NavigateButton onClick={() => navigate("/login")} variant="outline">
        로그인
      </NavigateButton>
      <NavigateButton onClick={onClickRegister} isLoading={isLoading}>
        회원가입
      </NavigateButton>
    </HStack>
  );

  return <TemplateGrid header={header} main={main} footer={footer} />;
};

export default Registration;
