import { Center, Circle, keyframes, VStack, Flex } from "@chakra-ui/react";

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
  h?: number | string;
};

function ChatBox(props: ChatBoxProps) {
  return (
    <Flex
      w="full"
      h={props.h || "auto"}
      bgGradient="linear(to-r, #48BB78, #38A169)"
      borderRadius={8}
      padding={3}
      color="white"
      fontSize="sm"
      lineHeight={6}
      whiteSpace="pre-wrap"
    >
      {props.message}
    </Flex>
  );
}

type ChatBotProps = {
  message: string;
  w?: number | string;
  h?: number | string;
};

export default function ChatBot(props: ChatBotProps) {
  const { message, w, h } = props;
  return (
    <VStack w={w || "full"} alignItems="flex-start">
      <ChatAvatar />
      <ChatBox h={h || "auto"} message={message} />
    </VStack>
  );
}
