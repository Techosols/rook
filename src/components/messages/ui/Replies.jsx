import { ReplyIcon, TrashIcon, Send, BanIcon } from "lucide-react";
import { useState } from "react";
import useChat from "../../../hooks/useChat";

export const Replies = ({ replies }) => {
  const [expandedReplyId, setExpandedReplyId] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [hoveredReplyId, setHoveredReplyId] = useState(null);
  const { sendReply, deleteReply } = useChat();
  const [deletingReplyId, setDeletingReplyId] = useState(null);

  if (!replies || replies.length === 0) return null;

  const toggleInput = (messageId) => {
    setExpandedReplyId(expandedReplyId === messageId ? null : messageId);
    setReplyContent("");
  };

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      console.log("Reply submitted:", replyContent);
      setReplyContent("");
      sendReply(expandedReplyId, replyContent);
      setExpandedReplyId(null);
    }
  };
  const handleDelete = async (messageId) => {
    setDeletingReplyId(messageId); // start loader
    try {
      await deleteReply(messageId); // call your API
    } finally {
      setDeletingReplyId(null); // stop loader
    }
  };

  return (
    <div className="ml-4 sm:ml-8 flex flex-col gap-3 mt-4 space-y-2">
      {replies.map((reply) => (
        <div
          key={reply.messageId}
          onMouseEnter={() => setHoveredReplyId(reply.messageId)}
          onMouseLeave={() => setHoveredReplyId(null)}
        >
          {/* Reply Card */}
          <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:border-primary/30 dark:hover:border-primary/50">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  {reply.sender}
                </p>
              </div>

              {/* Action Buttons */}
              <div
                className={`flex gap-1 transition-opacity duration-200 flex-shrink-0 ${
                  hoveredReplyId === reply.messageId
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                <button
                  className="text-primary hover:text-primary/80 dark:hover:text-primary/70 transition-all duration-200 cursor-pointer p-1.5 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-md"
                  onClick={() => toggleInput(reply.messageId)}
                  title="Reply to this message"
                >
                  <ReplyIcon size={16} />
                </button>
                {reply.sender === "You" && !reply.isDeleted && (
                  <button
                    className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-all duration-200 cursor-pointer p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md flex items-center justify-center"
                    title="Delete this reply"
                    onClick={() => handleDelete(reply.messageId)}
                    disabled={deletingReplyId === reply.messageId}
                  >
                    {deletingReplyId === reply.messageId ? (
                      <span className="w-5 h-5 border-4 border-red-400 border-t-transparent border-b-transparent rounded-full animate-spin shadow-md"></span>
                    ) : (
                      <TrashIcon size={16} />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Message Content */}
            <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
              {reply.isDeleted ? (
                <span className="italic text-gray-400 dark:text-gray-500">
                  <BanIcon size={16} className="inline mr-1" />
                  This reply has been deleted.
                </span>
              ) : (
                reply.messageContent
              )}
            </p>
          </div>

          {/* Reply Input */}
          {expandedReplyId === reply.messageId && (
            <div className="mt-3 pl-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 p-3 shadow-md">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleReplySubmit()}
                    autoFocus
                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md p-2.5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary dark:focus:border-primary focus:ring-1 focus:ring-primary/50 dark:focus:ring-primary/50 text-sm transition-colors duration-200"
                    placeholder="Type your reply..."
                  />
                  <button
                    onClick={() => handleReplySubmit()}
                    disabled={!replyContent.trim()}
                    className="bg-primary dark:bg-primary text-white p-2 rounded-md hover:bg-primary/90 dark:hover:bg-primary/80 disabled:bg-gray-300 dark:disabled:bg-gray-600 transition-all duration-200 flex items-center justify-center font-medium"
                    title="Send reply"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Nested Replies */}
          <Replies replies={reply.replies} />
        </div>
      ))}
    </div>
  );
};
