import ChatHeader from "../features/ai-tutor/component/ChatHeader";
import ChatMessages from "../features/ai-tutor/component/ChatMessages";
import ChatInput from "../features/ai-tutor/component/ChatInput";
import WelcomeCard from "../features/ai-tutor/component/WelcomeCard";
import { useAiTutor } from "@/hooks/useAiTutor";

const AiTutor = () => {
  const { messages, loading, error, sendMessage, clearChat, newChat } = useAiTutor();

  return (
    <div className="flex flex-col h-[85vh] rounded-xl ">
      
      <ChatHeader onClear={clearChat} onNewChat={newChat} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && <WelcomeCard />}
        <ChatMessages messages={messages} loading={loading} />
      </div>

      {error && (
        <p className="mx-auto w-[75%] text-sm text-red-500">{error}</p>
      )}

      <ChatInput onSend={sendMessage} disabled={loading} />
    </div>
  );
};

export default AiTutor;
