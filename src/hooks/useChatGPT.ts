import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import Message from "../interfaces/Message";

const useChatGPT = () => {
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState<Message[]>([]);

  const toast = useToast();

  const initMsg: Message = {
    role: "system",
    content: `
    You are the AI chatbot of the healthcare application 'Nutt'. You are responsible for answering users' health-related questions.
  
    The following are the references.
  
    1. You have to answer the user's question within 10 seconds.
    2. Answers to users' questions must be within 100 characters.
    3. You have to use honorifics.
    4. You shouldn't ask questions. In other words, there should be no question marks.
    5. You have to answer in Korean.
    6. Use the emoji properly.
    7. Don't answer questions that aren't health-related.
  `,
  };

  const config = {
    method: "post",
    url: "https://api.openai.com/v1/chat/completions",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    },
    data: {
      model: "gpt-3.5-turbo",
      messages: context
        ? [initMsg, ...context, { role: "user", content: question }]
        : [initMsg, { role: "user", content: question }],
    },
  };

  const callChatGPT = async (question: string) => {
    setQuestion(question);
    setContext([
      ...context,
      { role: "user", content: question },
      { role: "assistant", content: "" },
    ]);

    try {
      const { data } = await axios(config);
      const responseMsg = data.choices[0].message.content;
      setContext([
        ...context,
        { role: "user", content: question },
        { role: "assistant", content: responseMsg },
      ]);
      return responseMsg;
    } catch (error) {
      console.error(error);
      toast({
        position: "top",
        title: "ChatGPT API 호출에 실패했습니다.",
        description: "잠시 후 다시 시도해주세요.",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
      return "ChatGPT API 호출에 실패했습니다.";
    }
  };

  return { callChatGPT, context };
};

export default useChatGPT;
