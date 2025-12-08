import React, { useState } from 'react';
import Section from './ui/Section';
import SingleMessageThread from './ui/SingleMessageThread';
import { MessageCircle } from 'lucide-react';

import useChat from '../../hooks/useChat';
import { getDateAndMonth } from '../../utils/functions';

function Message() {
  const [openMessageId, setOpenMessageId] = useState(null);
  const { messageThreads } = useChat()

  // CHECKING REPLIES ARE COMING THROUGH API => []
  //  const data = messageThreads.map(mess => console.log(mess.replies))
  // console.log('Message Threads founds in Message Component: ', data)


  // Toggle the selected message
  const handleToggle = (messageId) => {
    setOpenMessageId(openMessageId === messageId ? null : messageId);
  };

  // Find the selected message
  const selectedMessage = messageThreads?.find(
    msg => msg.messageId === openMessageId
  );

  return (
    <div className="space-y-6">
      {/* Inbox Section */}
      <Section title="Messages" description="Inbox Showing messages Threads">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">

          {/* Messages List */}
          <div className="h-[400px] overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
            {messageThreads && messageThreads.length > 0 ? (
              messageThreads.map((message) => (
                <div
                  key={message.messageId}
                  onClick={() => handleToggle(message.messageId)}
                  className={`grid grid-cols-12 gap-2 px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors duration-200 cursor-pointer border-l-4 ${
                    openMessageId === message.messageId
                      ? 'bg-primary/8 dark:bg-primary/15 border-l-primary'
                      : 'border-l-transparent hover:border-l-primary/40'
                  }`}
                >
                  <div className="col-span-2">
                    <p className={`font-semibold truncate text-sm ${
                      openMessageId === message.messageId
                        ? 'text-primary'
                        : 'text-gray-800 dark:text-gray-200'
                    }`}>
                      {message.receiver}
                    </p>
                  </div>
                  <div className="col-span-7">
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-1 text-sm">
                      {message.messageContent}
                    </p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-gray-500 dark:text-gray-500 text-sm text-right font-medium">
                      {getDateAndMonth(message.createdAt)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <MessageCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  No messages yet
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Single Message Thread Section */}
      {selectedMessage && (
        <Section
          title="A Single Message Thread"
          description="You can see replies of the selected message"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <SingleMessageThread message={selectedMessage} />
          </div>
        </Section> 
      )}
    </div>
  );
}

export default Message;
