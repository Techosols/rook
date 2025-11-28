import { MessageCircle } from "lucide-react"

function NoChatSelected() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 px-6 w-full">
      {/* Animated Illustration */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full blur-2xl opacity-60 animate-pulse"></div>
        <MessageCircle className="w-24 h-24 text-primary dark:text-blue-400 relative" strokeWidth={1.5} />
      </div>

      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">
        No Chat Selected
      </h2>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-sm mb-8 leading-relaxed">
        Start a conversation by selecting a chat from the list on the left or begin a new connection
      </p>

    
    </div>
  )
}

export default NoChatSelected
