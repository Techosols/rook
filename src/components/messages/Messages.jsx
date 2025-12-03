import React, { useState } from 'react';
import Section from './ui/Section';
import Inbox from './ui/Inbox';
import InboxData from '../../data/Messages Tab/Inbox.json';
import SingleMessageThread from './ui/SingleMessageThread';

import useChat from '../../hooks/useChat';
import { getDateAndMonth  } from '../../utils/functions';

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
 const selectedMessage = messageThreads.find(
  msg => msg.messageId === openMessageId
);

  
  return (
    <div>
      {/* Inbox Section */}
      <Section title="Messages" description="Inbox Showing messages Threads">
        <div className="h-[190px] overflow-y-scroll">
          {messageThreads.map((message) => (
          <div key={message.messageId}>
            <tr className='flex gap-2 border-b-2 border-b-gray-700 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer' onClick={() => handleToggle(message.messageId)}>
              <td className='w-1/6 text-primary'>{message.receiver}</td>
              <td className='w-3/4 line-clamp-1'>{message.messageContent}</td>
              <td className='w-1/8 text-end text-gray-600'> {getDateAndMonth(message.createdAt)}</td>
            </tr>
            {/* <Inbox
              username={message.receiver}
              description={message.messageContent}
              handleToggle={() => handleToggle(message.messageId)} // pass ID
            /> */}
          </div>
        ))}

        </div>
      </Section>

      {/* Single Message Thread Section */}
      {selectedMessage && (
        <Section
          title="A Single Message Thread"
          description="You can see replies of the selected message"
        >
          <SingleMessageThread message={selectedMessage} />
        </Section>
      )}
    </div>
  );
}

export default Message;
