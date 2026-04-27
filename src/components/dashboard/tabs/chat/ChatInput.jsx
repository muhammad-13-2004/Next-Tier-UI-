import { useState } from "react";
import { Send } from "lucide-react";

const ChatInput = ({ onSend }) => {
    const [input, setInput] = useState("");

    const handleSend = () => {
        onSend(input);
        setInput("");
    };

    return (
        <div className="p-4 rounded-b-xl flex gap-2">

            <div className="flex items-center gap-2 flex-1 border rounded-lg px-3 py-2">
                <input type="text" placeholder="Type your message..." className="flex-1 px-4 py-2  outline-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)} />


                <button onClick={handleSend} className="p-3   text-(--primary-text)  rounded-lg flex items-center justify-center">
                    <Send className="rotate-42" size={20} />
                </button>
            </div>







        </div>
    );
};

export default ChatInput;