import { formateTime } from "../../../utils/functions"
import { BanIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import useChat from "../../../hooks/useChat";

function MessageCard({ message }) {
  const isYourMessage = message?.you === true;

  const [showDeleteOption, setShowDeleteOption] = useState(false);
  const { deleteMessage } = useChat();

  const handleDelete = () => {
    // Add delete logic here
    // console.log("Delete message:", message?.messageId);
    deleteMessage(message?.messageId);
  };

  return (
    <div 
      className={`flex ${isYourMessage ? 'justify-end' : 'justify-start'} mb-3 group`}
      onMouseEnter={() => setShowDeleteOption(true)}
      onMouseLeave={() => setShowDeleteOption(false)}
    >
      <div className="flex items-center gap-2">
        {/* Delete Button - Left side for sent messages (from me) */}
        {isYourMessage && showDeleteOption && (
          <button 
            onClick={handleDelete}
            className="flex-shrink-0 p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md transition-colors hover:cursor-pointer"
            title="Delete message"
          >
            <Trash2 size={16} className="text-red-500" />
          </button>
        )}

        <div className={`max-w-xs px-4 py-2 rounded-lg transition-all duration-200 ${
          isYourMessage 
            ? 'bg-primary text-white rounded-br-none' 
            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
        }`}>
          {message?.messageContent === '[Deleted]' ? (
            <p className="text-sm italic break-words opacity-70 select-none flex items-center gap-1">
              <BanIcon size={14} /> This message was deleted
            </p>
          ) : (
            <p className="text-sm break-words">{message?.messageContent}</p>
          )}
          <span className={`text-xs mt-1.5 block text-right opacity-70 ${
            isYourMessage ? 'text-gray-100' : 'text-gray-600 dark:text-gray-400'
          }`}>
            {formateTime(message?.sentAt)}
          </span>
        </div>

        {/* Delete Button - Right side for received messages */}
        {!isYourMessage && showDeleteOption && (
          <button 
            onClick={handleDelete}
            className="flex-shrink-0 p-1.5 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors hover:cursor-pointer"
            title="Delete message"
          >
            <Trash2 size={16} className="text-gray-500 dark:text-gray-400" />
          </button>
        )}
      </div>
    </div>
  )
}

export default MessageCard
