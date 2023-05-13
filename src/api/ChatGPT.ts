import axios from "axios";

interface Message {
  role: string;
  content: string;
}

export const chatWithChatGPT = async (
  question: string,
  context?: string[]
): Promise<string> => {
  const modelConfig: Message = {
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
  `,
  };

  let modelContext: Message[] | null = null;
  let messages: Message[] = [modelConfig, { role: "user", content: question }];

  if (context) {
    modelContext = context.map((msg: string) => ({
      role: "assistant",
      content: msg,
    }));
    messages = messages.splice(1, 0, ...modelContext);
  }

  const config = {
    method: "post",
    url: "https://api.openai.com/v1/chat/completions",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    },
    data: {
      model: "gpt-3.5-turbo",
      messages,
    },
  };

  try {
    const { data } = await axios(config);
    const response = data.choices[0].message.content;
    return response;
  } catch (error) {
    console.error(error);
    return "ChatGPT API 호출에 실패했습니다.";
  }
};
