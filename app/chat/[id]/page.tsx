import { ChatPage } from '@/components/Chat/page';
import ChatProvider from '@/components/Chat/Provider';
import {
  getChatDogsHistory,
  getChatHistory,
} from '@/repositories/chat-history';

async function Page({ params, searchParams }: any) {
  const { id } = params;
  const { sessionId } = searchParams;

  if (id === 'milei') {
    const resp = await getChatHistory({ session_id: sessionId });
    return (
      <ChatProvider chatHistory={resp}>
        <ChatPage />
      </ChatProvider>
    );
  } else {
    const resp = await getChatDogsHistory({ session_id: sessionId });
    return (
      <ChatProvider chatHistory={resp}>
        <ChatPage />
      </ChatProvider>
    );
  }
}

export default Page;
