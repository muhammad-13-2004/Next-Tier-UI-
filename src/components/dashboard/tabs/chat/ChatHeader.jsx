const ChatHeader = ({ onClear, onNewChat }) => {
  return (
    <div className="flex items-center justify-between p-6 rounded-t-xl">
      <div>
        <h2 className="font-semibold text-lg">AI Tutor ✨</h2>
        <p className="text-sm text-(--subtext-color)">
          Your personal AI learning assistant
        </p>
      </div>

      <div className="flex gap-2">
        <button onClick={onClear} className="px-3 py-1 text-sm border rounded-lg " >
          Clear chat
        </button>

        <button onClick={onNewChat} className="px-3 py-1 text-sm bg-(--primary-color) text-(--background-color) rounded-lg" >
          New chat +
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;