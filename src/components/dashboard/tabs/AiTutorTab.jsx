import ChatHeader from "./chat/ChatHeader";
import ChatMessages from "./chat/ChatMessages";
import ChatInput from "./chat/ChatInput";
import WelcomeCard from "./chat/WelcomeCard";
import { useState } from "react";

const AiTutorTab = () => {
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

export default AiTutorTab;