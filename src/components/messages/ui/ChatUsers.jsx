import ChartCard from "./ChartCard"

import useChat from "../../../hooks/useChat";

function ChatUsers() {
    const { chatThreads } = useChat();

    console.log("🔴 Chat Threads in ChatUsers:", chatThreads);

  return (
    <div className="flex flex-col gap-2">
      {chatThreads?.map(chat => (
        <ChartCard key={chat?.threadId} chat={chat} />
      ))}
    </div>
  )
}

export default ChatUsers
