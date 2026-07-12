import ChatHeader from "../features/ai-tutor/component/ChatHeader";
import ChatMessages from "../features/ai-tutor/component/ChatMessages";
import ChatInput from "../features/ai-tutor/component/ChatInput";
import WelcomeCard from "../features/ai-tutor/component/WelcomeCard";
import { useAiTutor } from "@/hooks/useAiTutor";

const AiTutor = () => {
  const { messages, loading, error, sendMessage, clearChat, newChat } = useAiTutor();

  return (
    <div className="flex h-[calc(100vh-7rem)] min-h-0 flex-col overflow-hidden">
      <div className="shrink-0 px-1 pt-1">
        <ChatHeader onClear={clearChat} onNewChat={newChat} />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-4 pt-1 space-y-4 overscroll-contain">
        {messages.length === 0 && <WelcomeCard />}
        <ChatMessages messages={messages} loading={loading} />
      </div>

      {error && <p className="shrink-0 px-4 pb-2 text-sm text-red-500">{error}</p>}

      <div className="shrink-0 border-t border-[#F1F5F9] px-4 py-4">
        <ChatInput onSend={sendMessage} disabled={loading} fullWidth />
      </div>
    </div>
  );
};

export default AiTutor;
