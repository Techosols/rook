import ChartCard from "./ChartCard"

import useChat from "../../../hooks/useChat";

function ChatUsers() {
    const { chats } = useChat();

  return (
    <div className="flex flex-col gap-2">
      {chats.map(chat => (
        <ChartCard key={chat.threadId} chat={chat} />
      ))}
    </div>
  )
}

export default ChatUsers
