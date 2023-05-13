import { FormControl, HStack, IconButton, Input } from "@chakra-ui/react";
import { FC } from "react";
import { AiOutlineSend } from "react-icons/ai";
import Message from "../../interfaces/Message";

type MessageFormProps = {
  message: Message;
  onMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMessageSubmit: (e: React.SyntheticEvent) => void;
};

const MessageForm: FC<MessageFormProps> = ({
  message,
  onMessageChange,
  onMessageSubmit,
}) => {
  return (
    <form onSubmit={onMessageSubmit}>
      <FormControl paddingTop={3}>
        <HStack spacing={2}>
          <Input
            placeholder="메세지를 입력하세요"
            autoComplete="off"
            value={message.content}
            onChange={onMessageChange}
          />
          <IconButton
            colorScheme="green"
            aria-label="Send Message"
            icon={<AiOutlineSend />}
            type="submit"
          />
        </HStack>
      </FormControl>
    </form>
  );
};

export default MessageForm;
