import { Loader2 } from "lucide-react"


const MessageBubble = ({ text, isUser, isLoading }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-2xl text-sm flex items-start gap-2 whitespace-pre-line leading-relaxed
        ${isUser ? 'bg-(--secondary-color)/80' : 'bg-(--background-color) border'}`}
      >
        {isLoading ? (
          <>
            {/* Loader Icon (placeholder circle) */}
            <Loader2 className="w-4 h-4 animate-spin" />

            {/* Thinking Text with fade animation */}
            <span className="animate-fade">Thinking...</span>
          </>
        ) : (
          <span>{text}</span>
        )}
      </div>
    </div>
  )
}

export default MessageBubble
