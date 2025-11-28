import ChatContext from "./ChatContext";
import chatsData from "../../data/Messages Tab/Chats.json";
import { useEffect, useState } from "react";
import useAuthenticatedApi from "../../hooks/useAuthenticatedApi";
import { toast } from "react-toastify";

const ChatProvider = ({ children }) => {

    const [ suggestionsForYou, setSuggestionsForYou ] = useState([]);
    const [ suggestionByYou, setSuggestionByYou ] = useState([]);
    const [ rookNotifications, setRookNotifications ] = useState([]);
    const [ rookMessages, setRookMessages ] = useState([]);
    const [ messageThreads, setMessageThreads ] = useState([]);
    const [ chatThreads, setChatThreads ] = useState([]);

    // Extra states for Chats - 
    const [ chats, setChats ] = useState(null);
    const [ matchedUserSelectedChat, setMatchedUserSelectedChat ] = useState(null);
    const [ matchedUserSelectedChatMessages, setMatchedUserSelectedChatMessages ] = useState([]);
    const [ disconnectedUserSelectedChat, setDisconnectedUserSelectedChat ] = useState(null);


    // Loading States
    const [loading, setLoading] = useState(false);
    const [loadingChatMessages, setLoadingChatMessages] = useState(false);

    const api = useAuthenticatedApi();

    // console.log("Suggestions For You:", suggestionsForYou);
    // console.log("Suggestion By You:", suggestionByYou);
    // console.log("Rook Notifications:", rookNotifications);
    // console.log("Rook Messages:", rookMessages);
    // console.log("Message Threads:", messageThreads);
    // console.log("Chat Threads:", chatThreads);
    console.log("Selected Chat in Provider:", matchedUserSelectedChat);

    useEffect(() => {
        if (!api) return;

        async function fetchInitial() {
            setLoading(true);
            const [suggestionByYouRes, suggestionForYouRes, rookNotificationsRes, rookMessagesRes, messageThreadsRes, chatThreadRes ] = await Promise.all([
                api.get('/v1/suggestions-by-user'),
                api.get('/v1/profile-suggestions'),
                api.get('/v1/rook-notifications'),
                api.get('/v1/rook-messages'),
                api.get('/v1/message-threads'),
                api.get('/v1/chat-threads'),
            ]);

            setSuggestionByYou(suggestionByYouRes.data);
            setSuggestionsForYou(suggestionForYouRes.data);
            setRookNotifications(rookNotificationsRes.data);
            setRookMessages(rookMessagesRes.data);
            setMessageThreads(messageThreadsRes.data);
            setChatThreads(chatThreadRes.data);
            setLoading(false);
        }
        fetchInitial();
    }, [api]);

    // console.log("Matched User Selected Chat in Provider:", matchedUserSelectedChat);

    useEffect(() => {
        setChats(chatsData);
    }, []);


    const fetchMessages = async (threadId) => {
        if (!api) return;
        setLoadingChatMessages(true);

        try {
            await api.get(`/v1/chat-thread/${threadId}`)
            .then((response) => {
                console.log("Fetched messages for thread:", response.data);
                setMatchedUserSelectedChatMessages(response.data);
            })
            .catch((error) => {
                console.error("Error fetching messages for thread:", error);
                toast.error("Failed to fetch messages for the selected chat. Please try again later.");
            })
            .finally(() => {
                setLoadingChatMessages(false);
            })
        } catch (error) {
            console.error("Error fetching chat threads:", error);
            toast.error("Failed to fetch chat threads. Please try again later.");
        }
    }

    const sendMessage = async (receiverExternalId, messageContent) => {
        if (!api) return;
        try {
            await api.post('/v1/chat-message', {
                "receiverExternalId": receiverExternalId,
                "messageContent": messageContent
            }).then(async (response) => {
                console.log("Message sent successfully:", response);
                fetchMessages(matchedUserSelectedChat?.threadId);
                // Update the messages list with the new message
                // setMatchedUserSelectedChatMessages((prevMessages) => [...prevMessages, response.data]);
            }).catch((error) => {
                console.error("Error sending message:", error);
                toast.error("Failed to send message. Please try again later.");
            }); 
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message. Please try again later.");
        }
    }


    const values = {
        loading,
        suggestionsForYou,
        suggestionByYou,
        rookNotifications,
        rookMessages,
        messageThreads,
        chatThreads,

        fetchMessages,
        sendMessage,
        loadingChatMessages,
        // Extra states for Chats
        chats,
        matchedUserSelectedChat,
        matchedUserSelectedChatMessages,
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