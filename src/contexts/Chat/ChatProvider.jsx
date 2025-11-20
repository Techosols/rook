import ChatContext from "./ChatContext";
import chatsData from "../../data/Messages Tab/Chats.json";

import { useEffect, useState } from "react";

const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState(null);
    const [matchedUserSelectedChat, setMatchedUserSelectedChat] = useState(null);
    const [disconnectedUserSelectedChat, setDisconnectedUserSelectedChat] = useState(null);

    console.log("Matched User Selected Chat in Provider:", matchedUserSelectedChat);

    useEffect(() => {
        setChats(chatsData);
    }, []);


    const values = {
        chats,
        matchedUserSelectedChat,
        setMatchedUserSelectedChat,
        disconnectedUserSelectedChat,
        setDisconnectedUserSelectedChat
    };

    return (
        <ChatContext.Provider value={values}>
            {children}
        </ChatContext.Provider>
    );
}

export default ChatProvider;