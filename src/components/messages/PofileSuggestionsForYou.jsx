import React from 'react'
import Section from './ui/Section'
import { AnnoyedIcon, FrownIcon, SmileIcon } from 'lucide-react'
import Suggestions from './ui/Suggestions'

function ProfileSuggestionsForYou() {

// Sample data for profile suggestions
  const data = [
    { 
      id: 1,
      username: 'Alina',
      description: "Here the description of data Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam obcaecati ex a nemo corporis, eveniet vero reprehenderit temporibus maxime quis amet cupiditate vel perferendis distinctio praesentium assumenda aliquam dolore quos? Quasi sint eaque similique fugit necessitatibus aspernatur dolores veritatis aliquam impedit ut praesentium, minus at aperiam ipsam repudiandae quisquam eveniet dolorem adipisci, reprehenderit expedita earum? Laborum error veniam deserunt amet minus quia omnis recusandae quaerat animi possimus officiis non rem dolorem debitis reiciendis fuga mollitia reprehenderit qui temporibus consectetur praesentium, tenetur porro. Repudiandae omnis minus ad veritatis nemo aspernatur? Reprehenderit voluptas magni nam eum. Placeat consectetur cum praesentium excepturi! Dignissimos mollitia incidunt fuga ipsa asperiores nam, facere ducimus doloremque recusandae quaerat omnis id quis eveniet ab"}
      ,{
        id: 2,
        username: 'JohnDoe',
        description: 'This is a sample description for JohnDoe.'
      },
      {
        id: 3,
        username: 'Smith',
        description: 'JaneSmith is passionate about technology and innovation. This description highlights her key attributes and hobbies.'
      }
  ]
  return (
      <Section title="Profile Suggestions From Other Users" description="You can react to each suggestion using one of three buttons">
        {data.map((item) => (
          <Suggestions 
            key={item.id}
            username={item.username}
            description={item.description}
          />
        ))}
      </Section>

  )
}

export default ProfileSuggestionsForYou
