import {
  Center,
  Circle,
  keyframes,
  VStack,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getMessage } from "../api/ChatGPT";

function ChatAvatar() {
  const breathe = keyframes`
      0% {
        box-shadow: 0 0 0 7px rgba(72, 187, 120, 0.6), 0 0 0 13px rgba(154, 230, 180, 0.5);
      }
      50% {
        box-shadow: 0 0 0 5px rgba(72, 187, 120, 0.6), 0 0 0 9px rgba(154, 230, 180, 0.5);
      }
      100% {
        box-shadow: 0 0 0 7px rgba(72, 187, 120, 0.6), 0 0 0 13px rgba(154, 230, 180, 0.5);
      }
     `;
  return (
    <Center w="40px" h="40px">
      <Circle
        size="12px"
        bg="white"
        animation={`${breathe} 2s ease-in-out infinite`}
      />
    </Center>
  );
}

type ChatBoxProps = {
  message: string;
  isLoading: boolean;
};

function ChatBox(props: ChatBoxProps) {
  return (
    <Flex
      w="full"
      bgGradient="linear(to-r, #48BB78, #38A169)"
      borderRadius={8}
      padding={3}
      color="white"
      fontSize="sm"
      lineHeight={6}
      whiteSpace="pre-wrap"
    >
      {props.isLoading ? (
        <Center width="full" padding={4}>
          <Spinner />
        </Center>
      ) : (
        props.message
      )}
    </Flex>
  );
}

type ChatBotProps = {
  question?: string;
  message?: string;
};

export default function ChatBot(props: ChatBotProps) {
  const [message, setMessage] = useState<string>(props.message || "");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (props.question) {
      setIsLoading(true);
      getMessage(props.question).then((msg) => {
        setIsLoading(false);
        setMessage(msg);
      });
    }
    return function cleanup() {
      setIsLoading(false);
      setMessage("");
    };
  }, [props.question]);

  return (
    <VStack w={"full"} alignItems="flex-start">
      <ChatAvatar />
      <ChatBox message={message} isLoading={isLoading} />
    </VStack>
  );
}
