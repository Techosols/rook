import React from 'react'
import Notification from './ui/Notification'
import Section from './ui/Section'

function MessageFromRook() {
  return (
    <div>
      <Section title="Messages from Rook" description="You can delete a message to remove it from the list.">
        <Notification />
      </Section>
    </div>
  )
}

export default MessageFromRook
