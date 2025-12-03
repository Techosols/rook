import React from 'react';
import { Replies } from './Replies';

const SingleMessageThread = ({ message }) => {
  if (!message) return <p className="text-gray-400 text-center">No results</p>;
  console.log(message, ' SINGLE MESSAGE CONSOLE')
  return (
    <div className="p-4 border shadow-sm rounded-md">
      <h2 className="font-bold text-xl mb-2 text-primary">{message.receiver}</h2>
      <p className="text-gray-700 mb-4">{message.messageContent}</p>

      {/* Render Replies */}
      {message.replies?.length > 0 && (
          <>
            <h2 className="text-primary">Replies:</h2>
            <Replies replies={message.replies} />
          </>
        )}
    </div>
  );
};

export default SingleMessageThread;
