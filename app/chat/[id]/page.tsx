import { ChatPage } from "@/components/Chat/page";
import ChatProvider from "@/components/Chat/Provider";

function Page() {
  return (
    <ChatProvider>
      <ChatPage />
    </ChatProvider>
  );
}

export default Page;
