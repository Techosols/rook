import ChatContext from "./ChatContext";
import chatsData from "../../data/Messages Tab/Chats.json";
import { useEffect, useState } from "react";
import useAuthenticatedApi from "../../hooks/useAuthenticatedApi";

const ChatProvider = ({ children }) => {

    const [ suggestionsForYou, setSuggestionsForYou ] = useState([]);
    const [ suggestionByYou, setSuggestionByYou ] = useState([]);
    const [ rookNotifications, setRookNotifications ] = useState([]);
    const [ rookMessages, setRookMessages ] = useState([]);
    const [ messageThreads, setMessageThreads ] = useState([]);
    const [ chats, setChats ] = useState(null);
    const [ matchedUserSelectedChat, setMatchedUserSelectedChat ] = useState(null);
    const [ disconnectedUserSelectedChat, setDisconnectedUserSelectedChat ] = useState(null);


    // Loading States
    const [loading, setLoading] = useState(false);

    const api = useAuthenticatedApi();

    // console.log("Suggestions For You:", suggestionsForYou);
    // console.log("Suggestion By You:", suggestionByYou);
    // console.log("Rook Notifications:", rookNotifications);
    // console.log("Rook Messages:", rookMessages);
    console.log("🔴 Message Threads:", messageThreads);

    useEffect(() => {
        if (!api) return;

        async function fetchInitial() {
            setLoading(true);
            console.log("Fetching initial chat data...");
            const [suggestionByYouRes, suggestionForYouRes, rookNotificationsRes, rookMessagesRes, messageThreadsRes ] = await Promise.all([
                api.get('/v1/suggestions-by-user'),
                api.get('/v1/profile-suggestions'),
                api.get('/v1/rook-notifications'),
                api.get('/v1/rook-messages'),
                api.get('/v1/message-threads'),
            ]);

            setSuggestionByYou(suggestionByYouRes.data);
            setSuggestionsForYou(suggestionForYouRes.data);
            setRookNotifications(rookNotificationsRes.data);
            setRookMessages(rookMessagesRes.data);
            setMessageThreads(messageThreadsRes.data);
            setLoading(false);
            console.log("Finished fetching initial chat data.");
        }
        fetchInitial();
    }, [api]);

    console.log("Matched User Selected Chat in Provider:", matchedUserSelectedChat);

    useEffect(() => {
        setChats(chatsData);
    }, []);
     
    

    const values = {
        loading,
        suggestionsForYou,
        suggestionByYou,
        rookNotifications,
        rookMessages,
        messageThreads,
        chats,
        matchedUserSelectedChat,
        setMatchedUserSelectedChat,
        disconnectedUserSelectedChat,
        setDisconnectedUserSelectedChat,
    };

    return (
        <ChatContext.Provider value={values}>
            {children}
        </ChatContext.Provider>
    );
}

export default ChatProvider;