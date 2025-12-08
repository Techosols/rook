import React, { useContext } from 'react'
import Notification from './ui/Notification'
import Section from './ui/Section'
import ChatContext from '../../contexts/Chat/ChatContext';

function MessageFromRook() {
  const { rookMessages } = useContext(ChatContext);
  return (
    <div>
      <Section title="Messages from Rook" description="You can delete a message to remove it from the list.">
        <Notification items={rookMessages} showDelete={true} />
      </Section>
    </div>
  )
}

export default MessageFromRook
