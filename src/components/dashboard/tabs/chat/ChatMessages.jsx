import MessageBubble from "./MessageBubble";

const ChatMessages = ({ messages }) => {
  return (
    <div className="space-y-3">
      {messages.map((msg, index) => (
        <MessageBubble key={index} {...msg} />
      ))}
    </div>
  );
};

export default ChatMessages;