import { LockIcon } from "lucide-react"
import useChat from "../../../hooks/useChat"

function ChartCard({ chat }) {
    const { setMatchedUserSelectedChat, matchedUserSelectedChat } = useChat();

    return (
        <div className={`flex items-center gap-1 p-2 hover:bg-gray-100 rounded-lg cursor-pointer ${matchedUserSelectedChat === chat.threadId ? "bg-gray-200" : ""}`} onClick={() => setMatchedUserSelectedChat(chat)}>
            {/* User Avatar */}
            <div className='w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold'>
                {chat?.chattingWith?.charAt(0).toUpperCase()}
            </div>
            {/* Username & Last Message */}
            <div className='flex flex-col gap-2 ml-2'>
                <h3 className='font-semibold'>{chat?.chattingWith}</h3>
                {/* <p className='text-sm text-gray-500'>User details or description goes here.</p> */}
            </div>
            {chat?.isLocked && (
                <LockIcon className="ml-2 text-gray-400" size={16} />
            )}
            {/* Unread Count Badge */}
            {chat?.unreadCount > 0 && (
                <div className='ml-auto bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full'>
                    {chat?.unreadCount}
                </div>
            )}
            

        </div>
    )
}

export default ChartCard
