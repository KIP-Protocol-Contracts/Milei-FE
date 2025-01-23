"use client";

import { useParams } from "next/navigation";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import useWebSocket from "react-use-websocket";

interface IMessage {
  sender: string;
  msg: string;
}

interface IQuery {
  query: string;
  session_id: string;
}

interface ContextProps {
  messages: IMessage[];
  userMsg: string;
  handleClearMessages: () => void;
  handleSendUserMessage: (data: IQuery) => void;
  setUserMsg: Dispatch<SetStateAction<string>>;
  answerStream: string;
  setAnswerStream: Dispatch<SetStateAction<string>>;
}

const ChatContext = createContext<ContextProps>({
  messages: [],
  userMsg: "",
  handleClearMessages: (): void => {},
  handleSendUserMessage: (): void => {},
  setUserMsg: (): void => {},
  answerStream: "",
  setAnswerStream: (): void => {},
});

export default function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [answerStream, setAnswerStream] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const { id } = useParams();

  const { sendMessage, lastMessage } = useWebSocket(
    id === "milei"
      ? process.env.NEXT_PUBLIC_MILEI_CHAT_WS!
      : process.env.NEXT_PUBLIC_DOG_CHAT_WS!
  );

  const handleStreamAnswer = (data: string) => {
    if (!data) return;
    const msg = JSON.parse(data);

    if (msg.end) {
      setMessages([
        ...messages,
        {
          sender: "milei",
          msg: msg.message,
        },
      ]);

      setAnswerStream("");
      return;
    }

    setAnswerStream((prev) => {
      return prev + msg.message;
    });
  };

  useEffect(() => {
    handleStreamAnswer(lastMessage?.data);
  }, [lastMessage]);

  const handleSendUserMessage = async (data: IQuery) => {
    setMessages([
      ...messages,
      {
        sender: "user",
        msg: data.query,
      },
    ]);

    sendMessage(JSON.stringify(data));

    setUserMsg("");
  };

  const handleClearMessages = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        userMsg,
        handleClearMessages,
        handleSendUserMessage,
        setUserMsg,
        answerStream,
        setAnswerStream,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useDogsChatProvider = () => useContext(ChatContext);
