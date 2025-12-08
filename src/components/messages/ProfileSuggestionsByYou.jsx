import React, { useContext } from 'react'
import Section from './ui/Section'
import Suggestions from './ui/Suggestions'
import ChatContext from '../../contexts/Chat/ChatContext'

function ProfileSuggestionsByYou() {
  const {suggestionByYou} = useContext(ChatContext);
  // console.log("Suggestion By You in Component:", suggestionByYou);

  return (
    <div>
      <Section title={'Profile Suggestions By You'} description={"You left a suggestion for another user but they havn't responded yet."}>
        {suggestionByYou.map((item) => (
          <Suggestions 
            key={item.suggestionId}
            username={item.preferredName}
            description={item.notes}  
            timeStamp={item.suggestedAt}
            category={item.categoryName}
              result={item.result}
              readOnly={true}
          />
        ))}
      </Section>
    </div>
  )
}

export default ProfileSuggestionsByYou
