import { Stack } from "@chakra-ui/react";
import { FC, useRef, useState } from "react";
import Message from "../../interfaces/Message";
import { MessageBox } from "./MessageBox";

type MessagesStackProps = {
  context: Array<Message>;
};

const MessagesStack: FC<MessagesStackProps> = ({ context }) => {
  return (
    <Stack spacing={5} overflowY="auto">
      {context.map((message, index) => (
        <MessageBox key={index} role={message.role} content={message.content} />
      ))}
    </Stack>
  );
};

export default MessagesStack;
