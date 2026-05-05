import { useState } from "react";
import { Send } from "lucide-react";

const ChatInput = ({ onSend, disabled = false }) => {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim() || disabled) return;
        onSend(input);
        setInput("");
    };

    return (

        <>
            <div className="w-full justify-center items-center flex">
                <div className="p-4 rounded-b-xl flex gap-2 w-[75%] ">
                    <div className="flex items-center gap-2 flex-1 border rounded-lg px-3 py-2 bg-(--subtext-color)/8">
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
        </>

    );
};

export default ChatInput;
