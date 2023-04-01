import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Stack,
  Link,
} from "@chakra-ui/react";
import Header from "../components/Header";
import ChatBot from "../components/ChatBot";
import NavigateButton from "../components/NavigateButton";
import TemplateGrid from "../layouts/TemplateGrid";

export default function SignIn() {
  const header = <Header>로그인</Header>;

  const main = (
    <Stack spacing={6} w="full">
      <ChatBot message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer maximus, ante id euismod auctor, massa velit congue ex, vel tempus orci metus id ipsum. Proin vel tristique ante, vel sollicitudin justo." />
      <FormControl>
        <FormLabel>이메일</FormLabel>
        <Input type="email" placeholder="nutt@example.com" />
      </FormControl>
      <FormControl>
        <FormLabel>비밀번호</FormLabel>
        <Input type="password" placeholder="8자리 이상의 영문+숫자" />
        <FormHelperText>
          비밀번호를 잊으셨나요?{" "}
          <Link
            href="/reset/password"
            color={"green.500"}
            fontWeight={"semibold"}
          >
            비밀번호 찾기
          </Link>
        </FormHelperText>
      </FormControl>
    </Stack>
  );

  const footer = <NavigateButton to="/login">로그인</NavigateButton>;

  return <TemplateGrid header={header} main={main} footer={footer} />;
}
