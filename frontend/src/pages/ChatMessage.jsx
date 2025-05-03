import { User, Bot } from "lucide-react"

const ChatMessage = ({ role, content }) => {
  const isUser = role === "user"

  return (
    <div className={`flex   gap-3  ${isUser ? "ml-auto" : "mr-auto"}`}>
      <div
        className={`flex  items-center justify-center w-8 h-8 rounded-full shrink-0 ${
          isUser ? "bg-gray-700 order-2 " : "bg-gray-800"
        }`}
      >
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      <div className={`p-3 rounded-lg ${isUser ? "bg-gray-700 text-white" : "bg-gray-800 text-white mt-2"}`}>
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  )
}

export default ChatMessage
