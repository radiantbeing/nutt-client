import { Flex } from "@chakra-ui/react";
import { FC, useState } from "react";
import Header from "../../components/Header";
import TemplateGrid from "../../layouts/TemplateGrid";
import NavigationBar from "../../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import Message from "../../interfaces/Message";
import MessagesStack from "./MessagesStack";
import MessageForm from "./MessageForm";
import useChatGPT from "../../hooks/useChatGPT";

const Chat: FC = () => {
  const [message, setMessage] = useState<Message>({
    role: "user",
    content: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { callChatGPT, context } = useChatGPT();

  const onMessageSubmit = async (
    e: React.SyntheticEvent,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (message.content === "") return;

    setIsLoading(true);
    await callChatGPT(message.content);
    setMessage({ role: "user", content: "" });
    setIsLoading(false);
  };

  const header = <Header onPrevClick={() => navigate("/")}>채팅</Header>;

  const main = (
    <Flex boxSize="full" direction="column" justifyContent="space-between">
      <MessagesStack context={context} />
      <MessageForm
        message={message}
        onMessageChange={(e) =>
          setMessage({ role: "user", content: e.target.value })
        }
        onMessageSubmit={onMessageSubmit}
        isLoading={isLoading}
      />
    </Flex>
  );

  const footer = <NavigationBar />;

  return <TemplateGrid header={header} main={main} footer={footer} />;
};

export default Chat;
