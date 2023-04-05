import axios from "axios";

interface ChatGPTResponse {
  status: number;
  statusText: string;
  config: object;
  headers: object;
  data: {
    choices: {
      finish_reason: string;
      index: number;
      message: {
        role: "system" | "user" | "assistant";
        content: string; // 응답 메시지
      };
    }[];
    created: number;
    id: string;
    model: string;
    object: string;
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  };
}

interface ChatGPTRequest {
  method: string;
  url: string;
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
  data: {
    model: string;
    messages: { role: string; content: string }[];
  };
}

export async function getMessage(message: string): Promise<string> {
  const requestInfo: ChatGPTRequest = {
    method: "post",
    url: "https://api.openai.com/v1/chat/completions",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    },
    data: {
      model: "gpt-3.5-turbo",
      messages: [
        {
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
        },
        { role: "user", content: message },
      ],
    },
  };
  try {
    const response: ChatGPTResponse = await axios(requestInfo);
    console.log(response);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return "Something Wrong!";
  }
}
