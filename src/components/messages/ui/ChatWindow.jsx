import ChatArea from "./ChatArea"
import ChatUsers from "./ChatUsers"
import NoChatSelected from "./NoChatSelected"

import useChat from "../../../hooks/useChat";

function ChatWindow() {

    const { matchedUserSelectedChatMessages, matchedUserSelectedChat } = useChat();

  return (
    <div className="flex h-[650px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Chat List Sidebar */}
        <div className="w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col bg-gray-50 dark:bg-gray-900">
            {/* Sidebar Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Chats</h2>
            </div>
            
            {/* Chat List Container */}
            <div className="flex-1 overflow-y-auto">
                <ChatUsers />
            </div>
        </div>

        {/* Chat Area */}
        <div className="hidden md:flex flex-1 flex-col bg-white dark:bg-gray-800">
            {matchedUserSelectedChat
            ? (
                <ChatArea />
            ) : (
                <NoChatSelected />
            )}
        </div>
    </div>
  )
}

export default ChatWindow
