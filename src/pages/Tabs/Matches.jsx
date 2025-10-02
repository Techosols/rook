import { useState } from "react";
import AuthenticatedTabLayout from "../../components/ui/Authenticated Tab/AuthenticatedTabLayout";
import useMatches from "../../hooks/useMatches";

// Components
import Connections from "../../components/matches/Connections";
import Match from "../../components/matches/Matches";
import RandomMatches from "../../components/matches/RandomMatches";
import ConnectionRequestsByYou from "../../components/matches/ConnectionRequestsByYou";
import ConnectionRequestToYou from "../../components/matches/ConnectionRequestToYou";
import BookmarkedByYou from "../../components/matches/BookmarkedByYou";
import BookmarkedByYouAcceptingConnections from "../../components/matches/BookmarkedByYouAcceptingConnections";
import WhoBookmarkedYou from "../../components/matches/WhoBookmarkedYou";
import ProfileViewedByYou from "../../components/matches/ProfileViewedByYou";
import WhoViewedProfile from "../../components/matches/WhoViewedProfile";
import BlockedByYou from "../../components/matches/BlockedByYou";
import IgnoredByYou from "../../components/matches/IgnoredByYou";

function Matches() {
  // Get matches data from context
  const { 
    matches, 
    randomMatches
  } = useMatches();

  const tabs = [
    { id: 1, value: 'matches', label: 'Matches' },
    { id: 2, value: 'connections', label: 'Connections' },
    { id: 3, value: 'connectionRequestsByYou', label: 'Connection Requests by You' },
    { id: 4, value: 'connectionRequestsToYou', label: 'Connection Requests to You' },
    { id: 5, value: 'bookmarkedByYou', label: 'Bookmarked by You' },
    { id: 6, value: 'bookmarkedByYouAcceptingConnections', label: 'Bookmarked by You + Accepting Connections' },
    { id: 7, value: 'whoBookmarkedYou', label: 'Who Bookmarked You?' },
    { id: 8, value: 'profileViewedByYou', label: 'Profile Viewed by You' },
    { id: 9, value: 'whoViewedYourProfile', label: 'Who Viewed Your Profile?' },
    { id: 10, value: 'blockedByYou', label: 'Blocked by You' },
    { id: 11, value: 'ignoredByYou', label: 'Ignored by You' },
    { id: 12, value: 'randomMatches', label: 'Random Matches' },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].value);

  function renderTabContent() {
    switch (activeTab) {
      case 'matches':
        return <Match matchesData={matches} />;
      case 'connections':
        return <Connections />;
      case 'connectionRequestsByYou':
        return <ConnectionRequestsByYou />;
      case 'connectionRequestsToYou':
        return <ConnectionRequestToYou />;
      case 'bookmarkedByYou':
        return <BookmarkedByYou />;
      case 'bookmarkedByYouAcceptingConnections':
        return <BookmarkedByYouAcceptingConnections />;
      case 'whoBookmarkedYou':
        return <WhoBookmarkedYou />;
      case 'profileViewedByYou':
        return <ProfileViewedByYou />;
      case 'whoViewedYourProfile':
        return <WhoViewedProfile />;
      case 'blockedByYou':
        return <BlockedByYou />;
      case 'ignoredByYou':
        return <IgnoredByYou />;
      case 'randomMatches':
        return <RandomMatches matchesData={randomMatches} />;
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

export default Matches