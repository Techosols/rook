import React from "react";
import useTab from "../../hooks/useTab";

import BackgroundChecks from "./BackgroundChecks";
import Pricing from "./Pricing";
import Filters from "./Filters";
import Pictures from "./Pictures";
import Community from "./Community";
import Stats from "./Stats";
import Join from "./Join";
import Matches from "./Matches";
import MatchFilters from "./MatchFilters";
import You from "./You";
import Messages from "./Messages";

function TabController() {
  const { activeTab } = useTab();

  // Debug logging
  console.log("🟠 TabController - activeTab:", activeTab);

  return (
    <div>
      <div className="">
        {activeTab === "background" && <BackgroundChecks />}
        {activeTab === "pricing" && <Pricing />}
        {activeTab === "filters" && <Filters />}
        {activeTab === "pictures" && <Pictures />}
        {activeTab === "community" && <Community />}
        {activeTab === "stats" && <Stats />}
        {activeTab === "join" && (
          <>
            {console.log("🟢 Rendering Join component")}
            <Join />
          </>
        )}
        {activeTab === "matches" && <Matches />}
        {activeTab === "you" && <You />}
        {activeTab === "matchFilters" && <MatchFilters />}
        {activeTab === "messages" && <Messages />}
      </div>
    </div>
  );
}

export default TabController;
