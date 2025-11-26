import ChatInput from "./ChatInput"
import NoChatSelected from "./NoChatSelected"
import MessageCard from "./MessageCard";

import { LockIcon } from "lucide-react";

import useChat from "../../../hooks/useChat"

function ChatArea() {

    const { matchedUserSelectedChat={} } = useChat();

    if (!matchedUserSelectedChat) {
        return <NoChatSelected />
    }

    return (
        <div className="flex flex-col flex-1 p-2">
            <div className="flex-1">
                {/* Chat Header */}
                <div className="border-b pb-2 mb-2">
                    <h2 className="text-xl font-semibold text-primary dark:text-primary-dark">{matchedUserSelectedChat?.chattingWith}</h2>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto mb-2">
                    {/* Messages would be rendered here */}
                    {matchedUserSelectedChat?.messages.length === 0 ? (
                        <p className="text-gray-500">No messages yet. Start the conversation!</p>
                    ) : (
                        matchedUserSelectedChat?.messages.map((message, index) => (
                            <MessageCard message={message} key={index} />
                        ))
                    )}
                </div>

            </div>
            {matchedUserSelectedChat?.isLocked ? (
                <div className="p-4 text-center select-none">
                    <p className="text-gray-400"><LockIcon className="inline-block mr-2" size={18} />You can no longer chat with this user..</p>
                </div>
            ) : (
                <ChatInput />
            )}
        </div>
    )
}

export default ChatArea
