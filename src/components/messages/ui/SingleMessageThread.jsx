import React, { useState } from 'react';
import InboxData from '../../../data/Messages Tab/Inbox.json';
import { Replies } from './Replies';

const SingleMessageThread = () => {
  const [openMessageId, setOpenMessageId] = useState(null);

  const handleToggle = (messageId) => {
    setOpenMessageId(openMessageId === messageId ? null : messageId);

    const message = InboxData.find((msg) => msg.messageId === messageId);
    if (message) {
      console.log(`Replies for ${message.sender}:`, message.replies);
    }
  };

  return (
    <div className="p-4">
      <ul className="flex flex-col gap-3">
        {InboxData.map((message) => (
          <li
            key={message.messageId}
            className="border p-5 flex flex-col shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <div
              className="flex items-start justify-between"
              onClick={() => handleToggle(message.messageId)}
            >
              {/* LEFT SECTION */}
              <div className="flex items-start gap-4">
                <span className="bg-primary text-white font-semibold w-12 h-12 flex items-center justify-center rounded-full text-lg">
                  {message.sender[0]}
                </span>
                <div className="flex flex-col">
                  <h1 className="font-bold text-lg">{message.sender}</h1>
                  <p className="text-gray-400 mt-1">{message.messageContent}</p>
                </div>
              </div>

              <p className="text-primary underline cursor-pointer hover:opacity-80 whitespace-nowrap self-end pb-1">
                Reply
              </p>
            </div>

            {/* REPLIES SECTION */}
            {openMessageId === message.messageId && (
              <Replies replies={message.replies} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleMessageThread;
