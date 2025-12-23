import React from 'react';
import { Replies } from './Replies';
import { MessageCircle, Clock } from 'lucide-react';

const SingleMessageThread = ({ message }) => {
  if (!message) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6">
        <MessageCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
        <p className="text-gray-500 dark:text-gray-400 font-medium">No results</p>
      </div>
    );
  }
  
  return (
    <div className="p-3 sm:p-6 space-y-6">
      {/* Original Message Card */}
      <div className="bg-gradient-to-br from-primary/5 to-blue-500/5 dark:from-primary/15 dark:to-blue-500/15 border border-primary/20 dark:border-primary/30 rounded-xl p-6 shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center font-bold">
              {message.receiver.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-900 dark:text-white">{message.receiver}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Original message</p>
            </div>
          </div>
        </div>

        {/* Message Content */}
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          {message.messageContent}
        </p>
      </div>

      {/* Replies Section */}
      {message.replies?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <div className="h-px flex-1 bg-gradient-to-r from-primary/0 to-primary/30 dark:to-primary/50"></div>
            <span className="text-sm font-semibold text-primary dark:text-primary flex items-center gap-1">
              <Clock size={16} />
              {message.replies.length} {message.replies.length === 1 ? 'Reply' : 'Replies'}
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-primary/0 to-primary/30 dark:to-primary/50"></div>
          </div>

          {/* Replies Component */}
          <div className="space-y-3">
            <Replies replies={message.replies} />
          </div>
        </div>
      )}

      {/* Empty Replies State */}
      {(!message.replies || message.replies.length === 0) && (
        <div className="flex flex-col items-center justify-center py-12 px-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <MessageCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
          <p className="text-gray-500 dark:text-gray-400 font-medium">No replies yet</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Start the conversation!</p>
        </div>
      )}
    </div>
  );
};
export default SingleMessageThread;