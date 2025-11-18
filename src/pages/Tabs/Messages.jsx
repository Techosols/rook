import { useState } from "react"
import AuthenticatedTabLayout from '../../components/ui/Authenticated Tab/AuthenticatedTabLayout'

// Components
import Chats from "../../components/messages/Chats";
import MessageFromRook from "../../components/messages/MessageFromRook";
import RookNotifications from "../../components/messages/RookNotifications";
import Message from "../../components/messages/Messages";
import ProfileSuggestionsByYou from "../../components/messages/ProfileSuggestionsByYou";
import ProfileSuggestionsForYou from "../../components/messages/PofileSuggestionsForYou";

function Messages() {

  const tabs = [
    { id: 1, value: 'chats', label: 'Chats' },
    { id: 2, value: 'messages', label: 'Messages' },
    { id: 3, value: 'profileSuggestionsForYou', label: 'Profile Suggestions for You' },
    { id: 4, value: 'profileSuggestionsByYou', label: 'Profile Suggestions by You' },
    { id: 5, value: 'messagesFromRook', label: 'Messages from Rook' },
    { id: 6, value: 'rookNotifications', label: 'Rook Notifications' },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].value);

  function renderTabContent() {
    switch (activeTab) {
      case 'chats':
        return <Chats />;
      case 'messages':
        return <Message />;
      case 'profileSuggestionsForYou':
        return <ProfileSuggestionsForYou />;
      case 'profileSuggestionsByYou':
        return <ProfileSuggestionsByYou />;
      case 'messagesFromRook':
        return <MessageFromRook />;
      case 'rookNotifications':
        return <RookNotifications />;
    }
  }

  return (
   <section>
     <div className='bg-background dark:bg-background-dark dark:text-white'>
      <div className='container mx-auto max-w-[1200px] p-4 '>
        <AuthenticatedTabLayout
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        >
          {renderTabContent()}
        </AuthenticatedTabLayout>
      </div>
    </div>
   </section>
  )
}

export default Messages