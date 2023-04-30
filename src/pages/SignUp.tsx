import {
  Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Stack,
  FormErrorMessage,
  HStack,
} from "@chakra-ui/react";
import Header from "../components/Header";
import ChatBot from "../components/ChatBot";
import TemplateGrid from "../layouts/TemplateGrid";
import NavigateButton from "../components/NavigateButton";

export default function SignUp() {
  const header = <Header>회원가입</Header>;

  const main = (
    <Stack spacing={6}>
      <ChatBot message="반갑습니다! 저는 AI 식단 관리 도우미 ‘뉴트(Nutt)입니다. 앱의 모든 기능을 사용하기 위해 회원가입을 진행해주세요." />
      <FormControl>
        <FormLabel>이메일</FormLabel>
        <Input type="email" placeholder="nutt@example.com" />
      </FormControl>
      <FormControl>
        <FormLabel>비밀번호</FormLabel>
        <Input type="password" placeholder="8~20자의 영문+숫자 조합" />
        <FormHelperText>
          안전도 |{" "}
          <Text as="strong" color="green.500">
            안전
          </Text>
        </FormHelperText>
      </FormControl>
      <FormControl isInvalid={true}>
        <Input type="password" placeholder="비밀번호 확인" />
        {false ? null : (
          <FormErrorMessage>비밀번호가 일치하지 않습니다.</FormErrorMessage>
        )}
      </FormControl>
    </Stack>
  );

  const footer = (
    <HStack boxSize="full">
      <NavigateButton to="/login" variant="outline">
        로그인
      </NavigateButton>
      <NavigateButton to="/join/userInfo">회원가입</NavigateButton>
    </HStack>
  );

  return <TemplateGrid header={header} main={main} footer={footer} />;
}
