import { ChatPage } from "@/components/Chat/page";
import ChatProvider from "@/components/Chat/Provider";
import { getChatHistory } from "@/repositories/chat-history";

async function Page({ searchParams }: { searchParams: any }) {
  const { sessionId } = await searchParams;

  const resp = await getChatHistory({ session_id: sessionId });

  return (
    <ChatProvider chatHistory={resp}>
      <ChatPage />
    </ChatProvider>
  );
}

export default Page;
