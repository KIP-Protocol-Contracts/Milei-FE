"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface IMessage {
  sender: string;
  msg: string;
}

interface ContextProps {
  messages: IMessage[];
  userMsg: string;
  handleClearMessages: () => void;
  handleSendUserMessage: (msg: string) => void;
  setUserMsg: Dispatch<SetStateAction<string>>;
  chatTo: string;
  setChatTo: Dispatch<SetStateAction<string>>;
}

const ChatContext = createContext<ContextProps>({
  messages: [],
  userMsg: "",
  handleClearMessages: (): void => {},
  handleSendUserMessage: (): void => {},
  setUserMsg: (): void => {},
  chatTo: "",
  setChatTo: (): void => {},
});

export default function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userMsg, setUserMsg] = useState("");
  const [chatTo, setChatTo] = useState("");
  const dogs = ["lucas", "murray", "milton"];

  const handleSendUserMessage = async (msg: string) => {
    const ans = handleAnswer(msg);
    setMessages([
      ...messages,
      {
        sender: "user",
        msg,
      },
      ...ans!,
    ]);

    setUserMsg("");
  };

  const handleAnswer = (msg: string): IMessage[] | undefined => {
    switch (chatTo) {
      case "milei":
        return [
          {
            sender: "milei",
            msg: msg,
          },
        ];
      case "dogs":
        const msgs = dogs.map((d) => {
          return {
            sender: d,
            msg: msg,
          };
        });
        return msgs;
    }
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
        chatTo,
        setChatTo,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useDogsChatProvider = () => useContext(ChatContext);
