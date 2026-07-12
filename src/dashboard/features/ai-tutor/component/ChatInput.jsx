import { useState } from "react";
import { Send } from "lucide-react";

const ChatInput = ({ onSend, disabled = false, fullWidth = false }) => {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim() || disabled) return;
        onSend(input);
        setInput("");
    };

    return (
        <div className={fullWidth ? 'w-full' : 'flex w-full items-center justify-center'}>
            <div className={`flex w-full gap-2 ${fullWidth ? '' : 'w-[75%] rounded-b-xl p-4'}`}>
                <div className="flex flex-1 items-center gap-2 rounded-lg border bg-(--subtext-color)/8 px-3 py-2">
                        <input type="text" placeholder="Type your message..." className="flex-1 px-4 py-2 outline-none disabled:cursor-not-allowed"
                            value={input}
                            disabled={disabled}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSend();
                            }} />
                        <button onClick={handleSend} disabled={disabled || !input.trim()} className="p-5 relative text-(--background-color) bg-(--primary-color) rounded-lg flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                            <Send className=" left-[8px] absolute rotate-42" size={20} />
                        </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;
