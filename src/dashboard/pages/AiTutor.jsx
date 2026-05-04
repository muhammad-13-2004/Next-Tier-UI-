import ChatHeader from "../features/ai-tutor/component/ChatHeader";
import ChatMessages from "../features/ai-tutor/component/ChatMessages";
import ChatInput from "../features/ai-tutor/component/ChatInput";
import WelcomeCard from "../features/ai-tutor/component/WelcomeCard";
import { useState } from "react";

const AiTutor = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    const userMessage = { text, isUser: true };
    const aiMessage = {
      text: "This is a dummy AI response.",
      isUser: false,
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
  };


  const handleClearChat = () => {
    setMessages([]);
  };

 
  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-[85vh] rounded-xl ">
      
      <ChatHeader onClear={handleClearChat} onNewChat={handleNewChat} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && <WelcomeCard />}
        <ChatMessages messages={messages} />
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default AiTutor;