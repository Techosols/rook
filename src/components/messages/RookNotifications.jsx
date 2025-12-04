import React from 'react'
import Notification from './ui/Notification'
import Section from './ui/Section'

function RookNotifications() {
  return (
    <div>
      <Section title="Notifications" description="Latest updates from Rook">
        <Notification />
      </Section>
    </div>
  )
}

export default RookNotifications
