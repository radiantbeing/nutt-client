import {
  Stack,
  HStack,
  Flex,
  FormControl,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { FC } from "react";
import Header from "../components/Header";
import NavigateButton from "../components/NavigateButton";
import TemplateGrid from "../layouts/TemplateGrid";
import { AiOutlineSend } from "react-icons/ai";

type MessageProps = {
  role: "sender" | "receiver";
  text: string;
};

const Message: FC<MessageProps> = ({ role, text }) => {
  const bgColor = role === "sender" ? "green.500" : "gray.100";
  const color = role === "sender" ? "white" : "black";
  return (
    <Flex
      maxWidth="90%"
      paddingTop={2}
      paddingBottom={2}
      paddingStart={3}
      paddingEnd={3}
      color={color}
      backgroundColor={bgColor}
      borderRadius="lg"
      wordBreak="break-all"
      alignSelf={role === "sender" ? "end" : "start"}
    >
      {text}
    </Flex>
  );
};

const Chat: FC = () => {
  const header = <Header>채팅</Header>;

  const main = (
    <Stack spacing={5}>
      <Message role="receiver" text="안녕하세요. 무엇을 도와드릴까요?" />
      <Message role="sender" text="안녕하세요." />
    </Stack>
  );

  const footer = (
    <FormControl paddingTop={3} borderTop="1px" borderColor="gray.100">
      <HStack spacing={2}>
        <Input placeholder="메세지를 입력하세요" />
        <IconButton
          colorScheme="green"
          aria-label="Send Message"
          icon={<AiOutlineSend />}
        />
      </HStack>
    </FormControl>
  );

  return <TemplateGrid header={header} main={main} footer={footer} />;
};

export default Chat;
