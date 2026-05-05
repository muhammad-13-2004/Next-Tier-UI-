import MessageBubble from './MessageBubble'

const ChatMessages = ({ messages, loading }) => {
  return (
    <div className="space-y-3">
      {messages.map((msg, index) => (
        <MessageBubble key={index} {...msg} />
      ))}
      {loading && <MessageBubble isLoading={loading} isUser={false} />}
    </div>
  )
}

export default ChatMessages
