import React from 'react'
import Section from './ui/Section'
import Inbox from './ui/Inbox';
import SingleMessageThread from './ui/SingleMessageThread';

function Message() {
  return (
    <div>
      <Section title={'Messages'} description={'Inbox Showing messages Threads'}>
        <Inbox username={'Alana'} description={'Lets get some coffee........'} />
        <Inbox username={'John'} description={'Lets get some Tea and enjoy the party........'} />
        <Inbox username={'Smith'} description={'Lets get some Food, I am hungry........'} />
      </Section>
      <Section title={'A Single Message Thread'} description={'You can delete your own messages. Deleting soft deletes a message'}>
        <SingleMessageThread />
      </Section>
    </div>
  )
}

export default Message;
