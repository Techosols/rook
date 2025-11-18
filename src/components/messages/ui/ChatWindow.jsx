import ChatArea from "./ChatArea"
import ChatUsers from "./ChatUsers"

import useChat from "../../../hooks/useChat";

function ChatWindow() {

    const { matchedUserSelectedChat } = useChat();

    console.log("Selected Chat ID:", matchedUserSelectedChat);

  return (
    <div className="flex h-[500px] border rounded-lg shadow-md">
        <div className="w-1/3 border-r overflow-y-auto">
            <ChatUsers />
        </div>
        <ChatArea />
    </div>
  )
}

export default ChatWindow
