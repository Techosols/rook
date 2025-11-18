import ChatContext from "../contexts/Chat/ChatContext";
import { useContext } from "react";

const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
}

export default useChat;