import React, { useContext } from 'react'
import Notification from './ui/Notification'
import Section from './ui/Section'
import ChatContext from '../../contexts/Chat/ChatContext';

function RookNotifications() {
  const { rookNotifications } = useContext(ChatContext);
  return (
    <div>
      <Section title="Notifications" description="Latest updates from Rook">
        <Notification items={rookNotifications} />
      </Section>
    </div>
  )
}

export default RookNotifications
