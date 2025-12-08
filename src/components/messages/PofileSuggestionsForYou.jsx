import React, { useContext } from 'react'
import Section from './ui/Section'
import { AnnoyedIcon, FrownIcon, SmileIcon } from 'lucide-react'
import Suggestions from './ui/Suggestions'
import ChatContext from '../../contexts/Chat/ChatContext'

function ProfileSuggestionsForYou() {
  const {suggestionsForYou} = useContext(ChatContext)
  return (
      <Section title="Profile Suggestions From Other Users" description="You can react to each suggestion using one of three buttons">
        {suggestionsForYou.map((item) => (
          <Suggestions 
            key={item.suggestionId}
            username={item.preferredName}
            description={item.notes}  
            timeStamp={item.suggestedAt}
            category={item.categoryName}
          />
        ))}
      </Section>

  )
}

export default ProfileSuggestionsForYou
