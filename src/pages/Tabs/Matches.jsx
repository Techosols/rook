import React, { useState, useEffect } from "react";
import AuthenticatedTabLayout from "../../components/ui/Authenticated Tab/AuthenticatedTabLayout";
import useMatches from "../../hooks/useMatches";

// Tab Components
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
  const {
    matches,
    randomMatches,
    connections,
    blockedUsers,
    ignoredUsers,
    bookmarkedByMeUsers,
    bookmarkedMeUsers,
    profilesViewedByMe,
    profilesViewedMe,
    connectionRequestsSent,
    connectionRequestsReceived,
    bookmarkedByMeAcceptingConnections,
    // ⬇️ re-fetch functions (from your useMatches hook)
    fetchMatches,
    fetchConnections,
    fetchBlockedUsers,
    fetchIgnoredUsers,
    fetchBookmarkedByMeUsers,
  } = useMatches();

  const tabs = [
    { id: 1, value: "matches", label: "Matches" },
    { id: 2, value: "connections", label: "Connections" },
    { id: 3, value: "connectionRequestsByYou", label: "Connection Requests by You" },
    { id: 4, value: "connectionRequestsToYou", label: "Connection Requests to You" },
    { id: 5, value: "bookmarkedByYou", label: "Bookmarked by You" },
    { id: 6, value: "bookmarkedByYouAcceptingConnections", label: "Bookmarked by You + Accepting Connections" },
    { id: 7, value: "whoBookmarkedYou", label: "Who Bookmarked You?" },
    { id: 8, value: "profileViewedByYou", label: "Profile Viewed by You" },
    { id: 9, value: "whoViewedYourProfile", label: "Who Viewed Your Profile?" },
    { id: 10, value: "blockedByYou", label: "Blocked by You" },
    { id: 11, value: "ignoredByYou", label: "Ignored by You" },
    { id: 12, value: "randomMatches", label: "Random Matches" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const [mountedTabs, setMountedTabs] = useState(new Set(["matches"]));

  // Lazy mount tabs (so each mounts once and stays alive)
  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
    setMountedTabs((prev) => new Set(prev).add(tabValue));
  };

  // Optional: refresh tab data when user revisits (keeps data synced)
  useEffect(() => {
    switch (activeTab) {
      case "matches":
        fetchMatches?.();
        break;
      case "connections":
        fetchConnections?.();
        break;
      case "bookmarkedByYou":
        fetchBookmarkedByMeUsers?.();
        break;
      case "blockedByYou":
        fetchBlockedUsers?.();
        break;
      case "ignoredByYou":
        fetchIgnoredUsers?.();
        break;
      default:
        break;
    }
  }, [activeTab]);

  return (
    <section>
      <div className="bg-background dark:bg-background-dark dark:text-white">
        <div className="container mx-auto max-w-[1200px] p-4">
          <AuthenticatedTabLayout
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={handleTabChange}
          >
            {/* Keep mounted once, hide inactive ones */}
            {mountedTabs.has("matches") && (
              <div style={{ display: activeTab === "matches" ? "block" : "none" }}>
                <Match matchesData={matches} />
              </div>
            )}

            {mountedTabs.has("connections") && (
              <div style={{ display: activeTab === "connections" ? "block" : "none" }}>
                <Connections connectionsData={connections} />
              </div>
            )}

            {mountedTabs.has("connectionRequestsByYou") && (
              <div style={{ display: activeTab === "connectionRequestsByYou" ? "block" : "none" }}>
                <ConnectionRequestsByYou data={connectionRequestsSent} />
              </div>
            )}

            {mountedTabs.has("connectionRequestsToYou") && (
              <div style={{ display: activeTab === "connectionRequestsToYou" ? "block" : "none" }}>
                <ConnectionRequestToYou data={connectionRequestsReceived} />
              </div>
            )}

            {mountedTabs.has("bookmarkedByYou") && (
              <div style={{ display: activeTab === "bookmarkedByYou" ? "block" : "none" }}>
                <BookmarkedByYou data={bookmarkedByMeUsers} />
              </div>
            )}

            {mountedTabs.has("bookmarkedByYouAcceptingConnections") && (
              <div style={{ display: activeTab === "bookmarkedByYouAcceptingConnections" ? "block" : "none" }}>
                <BookmarkedByYouAcceptingConnections data={bookmarkedByMeAcceptingConnections} />
              </div>
            )}

            {mountedTabs.has("whoBookmarkedYou") && (
              <div style={{ display: activeTab === "whoBookmarkedYou" ? "block" : "none" }}>
                <WhoBookmarkedYou data={bookmarkedMeUsers} />
              </div>
            )}

            {mountedTabs.has("profileViewedByYou") && (
              <div style={{ display: activeTab === "profileViewedByYou" ? "block" : "none" }}>
                <ProfileViewedByYou data={profilesViewedByMe} />
              </div>
            )}

            {mountedTabs.has("whoViewedYourProfile") && (
              <div style={{ display: activeTab === "whoViewedYourProfile" ? "block" : "none" }}>
                <WhoViewedProfile data={profilesViewedMe} />
              </div>
            )}

            {mountedTabs.has("blockedByYou") && (
              <div style={{ display: activeTab === "blockedByYou" ? "block" : "none" }}>
                <BlockedByYou data={blockedUsers} />
              </div>
            )}

            {mountedTabs.has("ignoredByYou") && (
              <div style={{ display: activeTab === "ignoredByYou" ? "block" : "none" }}>
                <IgnoredByYou data={ignoredUsers} />
              </div>
            )}

            {mountedTabs.has("randomMatches") && (
              <div style={{ display: activeTab === "randomMatches" ? "block" : "none" }}>
                <RandomMatches matchesData={randomMatches} />
              </div>
            )}
          </AuthenticatedTabLayout>
        </div>
      </div>
    </section>
  );
}

export default Matches;
