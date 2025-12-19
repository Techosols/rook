import ChatContext from "./ChatContext";
import chatsData from "../../data/Messages Tab/Chats.json";
import { useEffect, useState } from "react";
import useAuthenticatedApi from "../../hooks/useAuthenticatedApi";
import { toast } from "react-toastify";

const ChatProvider = ({ children }) => {

    const [suggestionsForYou, setSuggestionsForYou] = useState([]);
    const [suggestionByYou, setSuggestionByYou] = useState([]);
    const [rookNotifications, setRookNotifications] = useState([]);
    const [rookMessages, setRookMessages] = useState([]);
    const [messageThreads, setMessageThreads] = useState([]);
    const [messageReplies, setMessageReplies] = useState(null);
    const [chatThreads, setChatThreads] = useState([]);

    // Extra states for Chats - 
    const [chats, setChats] = useState(null);
    const [matchedUserSelectedChat, setMatchedUserSelectedChat] = useState(null);
    const [matchedUserSelectedChatMessages, setMatchedUserSelectedChatMessages] = useState([]);
    const [disconnectedUserSelectedChat, setDisconnectedUserSelectedChat] = useState(null);

    const [openMessageId, setOpenMessageId] = useState(null);

    // Loading States
    const [loading, setLoading] = useState(false);
    const [loadingChatMessages, setLoadingChatMessages] = useState(false);

    const api = useAuthenticatedApi();

    // console.log("Suggestions For You:", suggestionsForYou);
    // console.log("Suggestion By You:", suggestionByYou);
    // console.log("Rook Notifications:", rookNotifications);
    // console.log("Rook Messages:", rookMessages);
    // console.log("Message Threads:", messageThreads);
    // // console.log("Chat Threads:", chatThreads);
    // console.log("Selected Chat in Provider:", matchedUserSelectedChat);

    useEffect(() => {
        if (!api) return;

        async function fetchInitial() {
            setLoading(true);
            const [suggestionByYouRes, suggestionForYouRes, rookNotificationsRes, rookMessagesRes, messageThreadsRes, chatThreadRes] = await Promise.all([
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
                updateMessages(matchedUserSelectedChat?.threadId);

            }).catch((error) => {
                console.error("Error sending message:", error);
                toast.error("Failed to send message. Please try again later.");
            });
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message. Please try again later.");
        }
    }

    const fetchReplies = async (messageId) => {
        if (!api) return;
        setLoading(true);
        try {
            setMessageReplies(null);
            await api.get(`/v1/message-thread/${messageId}`)
                .then((response) => {
                    console.log("Fetched replies for message:", response.data);
                    setMessageReplies(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching replies for message:", error);
                    toast.error("Failed to fetch replies for the message. Please try again later.");
                }).finally(() => {
                    setLoading(false);
                });
        } catch (error) {
            console.error("Error fetching replies:", error);
            toast.error("Failed to fetch replies. Please try again later.");
        }
    }

    const sendReply = async (parentMessageId, replyContent) => {
        if (!api) return;
        try {
            await api.post('/v1/user-message-reply', {
                "parentMessageId": parentMessageId,
                "messageContent": replyContent,
            }
            ).then(async (response) => {
                console.log("Reply sent successfully:", response);
                updateReplies();
            }).catch((error) => {
                console.error("Error sending reply:", error);
                toast.error("Failed to send reply. Please try again later.");
            });
        } catch (error) {
            console.error("Error sending reply:", error);
            toast.error("Failed to send reply. Please try again later.");
        }
    }

    const deleteMessage = async (messageId) => {
        if (!api) return;
        try {
            await api.delete(`/v1/chat-message/${messageId}`)
                .then(async (response) => {
                    console.log("Message deleted successfully:", response);
                    updateMessages(matchedUserSelectedChat?.threadId);
                })
                .catch((error) => {
                    console.error("Error deleting message:", error);
                    toast.error("Failed to delete message. Please try again later.");
                });
        } catch (error) {
            console.error("Error deleting message:", error);
            toast.error("Failed to delete message. Please try again later.");
        }
    }

    const deleteReply = async (messageId) => {
        if (!api) return;
        try {
            await api.delete(`/v1/user-message/${messageId}`)
                .then(async (response) => {
                    console.log("Reply deleted successfully:", response);
                    updateReplies();
                })
                .catch((error) => {
                    console.error("Error deleting reply:", error);
                    toast.error("Failed to delete reply. Please try again later.");
                });
        } catch (error) {
            console.error("Error deleting reply:", error);
            toast.error("Failed to delete reply. Please try again later.");
        }
    }

    const updateReplies = async () => {
        if (!api) return;
        try {
            await api.get(`/v1/message-thread/${openMessageId}`)
                .then((response) => {
                    console.log("Updated replies for message:", response.data);
                    setMessageReplies(response.data);
                })
                .catch((error) => {
                    console.error("Error updating replies for message:", error);
                    toast.error("Failed to update replies for the message. Please try again later.");
                });
        } catch (error) {
            console.error("Error updating replies:", error);
            toast.error("Failed to update replies. Please try again later.");
        }

    }

    const updateMessages = async (threadId) => {
        if (!api) return;

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
        } catch (error) {
            console.error("Error fetching chat threads:", error);
            toast.error("Failed to fetch chat threads. Please try again later.");
        }
    }

    const suggestFeedback = async (suggestionId, feedbackResult) => {
        if (!api) return;
        try {
            await api.post('/v1/actions/record', {
                "object": "event",
                "type": "user.suggestion-result",
                "data": {
                    "occurredAt": new Date().toISOString(),
                    "suggestionId": suggestionId,
                    "suggestionResultName": feedbackResult
                }
            }).then(async (response) => {
                console.log("Feedback submitted successfully:", response);
            });
        } catch (error) {
            console.error("Error submitting feedback:", error);
            toast.error("Failed to submit feedback. Please try again later.");
        }
    }

    const handleToggle = (messageId) => {
        console.log("Toggling message ID:", messageId);
        setOpenMessageId(messageId); // openMessageId === messageId ? null : messageId
        fetchReplies(messageId);
    };

    const values = {
        loading,
        suggestionsForYou,
        suggestionByYou,
        rookNotifications,
        rookMessages,
        messageThreads,
        chatThreads,
        messageReplies,
        openMessageId,

        fetchMessages,
        sendMessage,
        fetchReplies,
        sendReply,
        deleteMessage,
        deleteReply,
        suggestFeedback,
        handleToggle,
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