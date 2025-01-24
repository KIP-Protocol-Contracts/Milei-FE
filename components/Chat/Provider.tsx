'use client';

import { IChatHistory } from '@/repositories/chat-history';
import { useParams } from 'next/navigation';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import useWebSocket from 'react-use-websocket';

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
  answerLoading: boolean;
}

const ChatContext = createContext<ContextProps>({
  messages: [],
  userMsg: '',
  handleClearMessages: (): void => {},
  handleSendUserMessage: (): void => {},
  setUserMsg: (): void => {},
  answerStream: '',
  setAnswerStream: (): void => {},
  answerLoading: false,
});

export default function ChatProvider({
  chatHistory,
  children,
}: {
  chatHistory: IChatHistory[];
  children: React.ReactNode;
}) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [answerStream, setAnswerStream] = useState('');
  const [answerLoading, setAnswerLoading] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const { id } = useParams();
  const [agent, setAgent] = useState<string>('');

  useEffect(() => {
    if (typeof id === 'string') {
      setAgent(id === 'milei' ? 'milei' : id);
    } else {
      setAgent('milei');
    }
  }, [id]);

  useMemo(() => {
    if (chatHistory.length === 0) return;

    const hist: IMessage[] = chatHistory.map((c) => {
      return {
        sender: c.sender === 'bot' ? 'milei' : 'user',
        msg: c.message,
      };
    });

    setMessages(hist);
  }, [chatHistory]);

  const { sendMessage, lastMessage } = useWebSocket(
    id === 'milei'
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
          sender: agent,
          msg: msg.message,
        },
      ]);

      setAnswerStream('');
      setAnswerLoading(false);
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
    setAnswerLoading(true);

    //console.log('🚀 ~ handleSendUserMessage:', data);

    setMessages([
      ...messages,
      {
        sender: 'user',
        msg: data.query,
      },
    ]);

    sendMessage(JSON.stringify(data));

    setUserMsg('');
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
        answerLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useDogsChatProvider = () => useContext(ChatContext);
