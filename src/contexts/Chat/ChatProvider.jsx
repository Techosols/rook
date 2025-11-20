import ChatContext from "./ChatContext";
import chatsData from "../../data/Messages Tab/Chats.json";
import { useEffect, useState } from "react";
import useAuthenticatedApi from "../../hooks/useAuthenticatedApi";

const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState(null);
    const [matchedUserSelectedChat, setMatchedUserSelectedChat] = useState(null);
    const [disconnectedUserSelectedChat, setDisconnectedUserSelectedChat] = useState(null);

    const api = useAuthenticatedApi();

    console.log("Matched User Selected Chat in Provider:", matchedUserSelectedChat);

    useEffect(() => {
        setChats(chatsData);
    }, []);
     
    async function Chat (threadId) {
        if (!api) {
            return;
        }
        const response = await api.get('/v1/chat-threads', {
            params: { threadId: threadId }
        });
        setChats(response.data)
        return response.data;
    }

    const values = {
        chats,
        matchedUserSelectedChat,
        setMatchedUserSelectedChat,
        disconnectedUserSelectedChat,
        setDisconnectedUserSelectedChat,
        Chat,
    };

    return (
        <ChatContext.Provider value={values}>
            {children}
        </ChatContext.Provider>
    );
}

export default ChatProvider;