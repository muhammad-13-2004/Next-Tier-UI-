const MessageBubble = ({ text, isUser }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-2xl max-w-md text-sm shadow
        ${isUser ? "bg-green-200" : "bg-(--background-color) border"}`}
      >
        {text}
      </div>
    </div>
  );
};

export default MessageBubble;