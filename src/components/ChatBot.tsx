import { Center, Circle, keyframes, Box, VStack } from "@chakra-ui/react";

const ChatAvatar = () => {
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
};

const ChatBox = (props: { message: string | string[] }) => {
  return (
    <Box
      w="full"
      bgGradient="linear(to-r, #48BB78, #38A169)"
      borderRadius={8}
      padding={3}
      color="white"
      fontSize="sm"
      lineHeight={6}
      whiteSpace="pre-wrap"
    >
      {props.message}
    </Box>
  );
};

export const ChatBot = (props: { message: string | string[] }) => {
  const { message } = props;
  return (
    <VStack w="full" alignItems="flex-start">
      <ChatAvatar />
      {typeof message === "string" ? (
        <ChatBox message={message} />
      ) : (
        message.map((m, i) => <ChatBox key={i} message={m} />)
      )}
    </VStack>
  );
};
