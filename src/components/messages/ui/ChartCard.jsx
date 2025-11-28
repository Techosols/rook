import { LockIcon } from "lucide-react"
import useChat from "../../../hooks/useChat"

function ChartCard({ chat }) {
    const { setMatchedUserSelectedChat, matchedUserSelectedChat, fetchMessages } = useChat();
    const isSelected = matchedUserSelectedChat?.threadId === chat?.threadId;
    const lastMessage = chat?.messages?.[chat?.messages?.length - 1];
    const hasUnread = chat?.unreadCount > 0;


    const handleChatSelect = () => {
        setMatchedUserSelectedChat(chat);
        fetchMessages(chat?.threadId);
    }

    return (
        <button
            onClick={handleChatSelect}
            className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 focus:outline-none group ${
                isSelected
                  ? 'bg-primary/10 dark:bg-primary/15 border-l-4 border-primary'
                  : 'border-l-4 border-transparent hover:border-primary/40'
            } ${hasUnread ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
        >
            {/* User Avatar */}
            <div className={`w-11 h-11 rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0 transition-all duration-200 ${
                isSelected
                  ? 'bg-gradient-to-br from-primary to-primary-dark shadow-md'
                  : 'bg-primary group-hover:shadow-md'
            }`}>
                {chat?.chattingWith?.charAt(0).toUpperCase()}
            </div>

            {/* Chat Info */}
            <div className='flex-1 min-w-0 text-left'>
                <div className='flex items-center gap-2 mb-1'>
                    <h3 className={`font-semibold truncate ${
                        isSelected || hasUnread
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-700 dark:text-gray-300'
                    }`}>
                        {chat?.chattingWith}
                    </h3>
                    {chat?.isLocked && (
                        <LockIcon className="text-gray-400 dark:text-gray-500 flex-shrink-0" size={14} />
                    )}
                </div>
                {/* Last Message Preview */}
                <p className={`text-xs truncate ${
                    hasUnread
                      ? 'text-gray-700 dark:text-gray-300 font-medium'
                      : 'text-gray-500 dark:text-gray-400'
                }`}>
                    {lastMessage?.you ? '📤 ' : '📥 '}
                    {lastMessage?.messageContent || 'No messages yet'}
                </p>
            </div>

            {/* Unread Badge & Time */}
            <div className='flex items-center gap-2 flex-shrink-0'>
                {hasUnread && (
                    <div className='flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full'>
                        {chat?.unreadCount > 9 ? '9+' : chat?.unreadCount}
                    </div>
                )}
            </div>
        </button>
    )
}

export default ChartCard
