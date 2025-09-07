import { useEffect, useState, useMemo } from "react";
import TabContext from "./TabContext";

const TabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("");

  const tabs = useMemo(
    () => [
      {
        id: 1,
        label: "Background Checks",
        value: "background",
      },
      {
        id: 2,
        label: "Pricing",
        value: "pricing",
      },
      {
        id: 3,
        label: "Filters",
        value: "filters",
      },
      {
        id: 4,
        label: "Pictures",
        value: "pictures",
      },
      {
        id: 5,
        label: "Community",
        value: "community",
      },
      {
        id: 6,
        label: "Stats",
        value: "stats",
      },
      {
        id: 7,
        label: "Join",
        value: "join",
      },
      {
        id: 8,
        label: "Matches",
        value: "matches",
        subTabs: [
          { id: 1, label: "Matches", value: "matches" },
          { id: 2, label: "Connections", value: "connections" },
          { id: 3, label: "Connection Request by You", value: "connectionRequestsByYou" },
          { id: 4, label: "Connection Request to You", value: "connectionRequestsToYou" },
          { id: 5, label: "Bookmarked by You", value: "bookmarkedByYou" },
          { id: 6, label: "Bookmarked by You + Accepting Connections", value: "bookmarkedByYouAcceptingConnections" },
          { id: 7, label: "Who Bookmarked You?", value: "whoBookmarkedYou" },
          { id: 8, label: "Profile Viewed by You", value: "profileViewedByYou" },
          { id: 9, label: "Who Viewed Your Profile?", value: "whoViewedYourProfile" },
          { id: 10, label: "Blocked by You", value: "blockedByYou" },
          { id: 11, label: "Ignored by You", value: "ignoredByYou" },
          { id: 12, label: "Random Matches", value: "randomMatches" },
        ],
      },
      {
        id: 9,
        label: "You",
        value: "you",
        subTabs: [
          { id: 1, label: "Your Info", value: "yourInfo" },
          { id: 2, label: "Your Pictures", value: "yourPictures" },
          { id: 3, label: "About You", value: "aboutYou" },
          { id: 4, label: "Your Hobbies, Pets, etc.", value: "yourHobbiesPets" },
        ],
      },
      {
        id: 10,
        label: "Filters",
        value: "matchFilters",
        subTabs: [
          { id: 1, label: "Location, Stats, etc.", value: "locationStats" },
          { id: 2, label: "Ethnicities, Religions", value: "ethnicitiesReligions" },
          { id: 3, label: "Gender, Orientation", value: "genderOrientation" },
          { id: 4, label: "Politics, Physical Activity", value: "politicsPhysicalActivity" },
          { id: 5, label: "Occupations", value: "occupations" },
        ],
      },
      {
        id: 11,
        label: "Messages",
        value: "messages",
        subTabs: [
          { id: 1, label: "Chats", value: "chats" },
          { id: 2, label: "Messages", value: "messages" },
          { id: 3, label: "Profile Suggestions for You", value: "profileSuggestionsForYou" },
          { id: 4, label: "Profile Suggestions by You", value: "profileSuggestionsByYou" },
          { id: 5, label: "Messages from Rook", value: "messagesFromRook" },
          { id: 6, label: "Rook Notifications", value: "rookNotifications" },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab && tabs.some((tab) => tab.value === savedTab)) {
      setActiveTab(savedTab);
    } else if (tabs.length > 0) {
      setActiveTab(tabs[0].value);
    }
  }, [tabs]);

  useEffect(() => {
    if (activeTab) {
      localStorage.setItem("activeTab", activeTab);
    }
  }, [activeTab]);



  return (
    <TabContext.Provider
      value={{ activeTab, setActiveTab, tabs }}
    >
      {children}
    </TabContext.Provider>
  );
};

export default TabProvider;
