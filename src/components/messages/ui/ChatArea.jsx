import ChatInput from "./ChatInput"
import NoChatSelected from "./NoChatSelected"
import MessageCard from "./MessageCard";

import { LockIcon, Clock } from "lucide-react";

import useChat from "../../../hooks/useChat"

function ChatArea() {

    const { matchedUserSelectedChat = {}, matchedUserSelectedChatMessages = [], loadingChatMessages } = useChat();

    if (!matchedUserSelectedChatMessages) {
        return <NoChatSelected />
    }

    if (loadingChatMessages) {
        return (
            <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                {/* Chat Header */}
                <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 bg-white dark:bg-gray-800">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{matchedUserSelectedChat?.chattingWith}</h2>
                    {/* <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{matchedUserSelectedChatMessages?.length} messages</p> */}
                </div>

                {/* Loading Indicator */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 dark:border-gray-700 border-t-primary dark:border-t-blue-400"></div>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mt-4 font-medium">Loading messages...</p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Please wait</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
            {/* Chat Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 bg-white dark:bg-gray-800 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{matchedUserSelectedChat?.chattingWith}</h2>
                        {/* <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{matchedUserSelectedChatMessages?.length} messages</p> */}
                    </div>
                    {matchedUserSelectedChat?.isLocked && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                            <LockIcon size={16} className="text-red-500" />
                            {/* <span className="text-xs font-medium text-red-600 dark:text-red-400">Locked</span> */}
                        </div>
                    )}
                </div>
            </div> 

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                {matchedUserSelectedChatMessages?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <Clock size={48} className="text-gray-300 dark:text-gray-600 mb-3" />
                        <p className="text-gray-500 dark:text-gray-400 font-medium">No messages yet</p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Start the conversation!</p>
                    </div>
                ) : (
                    matchedUserSelectedChatMessages?.map((message, index) => (
                        <MessageCard message={message} key={index} />
                    ))
                )}
            </div>

            {/* Chat Footer */}
            {matchedUserSelectedChat?.isLocked ? (
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-red-50 dark:bg-red-900/10">
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm font-medium justify-center">
                        <LockIcon size={16} />
                        You can no longer chat with this user
                    </div>
                </div>
            ) : (
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
                    <ChatInput />
                </div>
            )}
        </div>
    )
}

export default ChatArea
