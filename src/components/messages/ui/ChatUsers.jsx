import ChartCard from "./ChartCard"
import { MessageCircle, Loader } from "lucide-react"

import useChat from "../../../hooks/useChat";

function ChatUsers() {
    const { chatThreads } = useChat();

  return (
    <div className="flex flex-col h-full">
      {/* Header Stats */}
      <div className="px-4 py-3 bg-gradient-to-r from-primary/5 to-blue-500/5 dark:from-primary/10 dark:to-blue-500/10 border-b border-gray-200 dark:border-gray-700">
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          {chatThreads?.length || 0} Conversations
        </p>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chatThreads && chatThreads.length > 0 ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
            {chatThreads.map((chat) => (
              <div key={chat?.threadId} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-150">
                <ChartCard chat={chat} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full px-4 py-8">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <MessageCircle className="w-8 h-8 text-gray-400 dark:text-gray-600" strokeWidth={1.5} />
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center mb-2">
              No conversations yet
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
              Your chats will appear here once you start messaging
            </p>
          </div>
        )}
      </div>

      {/* Footer - Online Status */}
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Online
        </div>
      </div>
    </div>
  )
}

export default ChatUsers
