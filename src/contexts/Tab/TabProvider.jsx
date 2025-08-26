import { useEffect, useState } from "react";
import TabContext from "./TabContext";
import { useMemo } from "react";

const TabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("");

  // Remove useAuth dependency to fix circular dependency
  // Tab visibility will be handled by the components themselves

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
      },
      {
        id: 9,
        label: "You",
        value: "you",
      },
      {
        id: 10,
        label: "Messages",
        value: "messages",
      },
      {
        id: 11,
        label: "Match Filters",
        value: "matchFilters",
      },
    ],
    []
  );

  useEffect(() => {
    // Restore activeTab from localStorage if present
    const savedTab = localStorage.getItem("CallbackTab");
    if (savedTab && tabs.some((tab) => tab.value === savedTab)) {
      setActiveTab(savedTab);
      localStorage.removeItem("CallbackTab");
    } else if (tabs.length > 0) {
      setActiveTab(tabs[0].value);
    }
  }, [tabs]);

  return (
    <TabContext.Provider
      value={{ activeTab, setActiveTab, tabs }}
    >
      {children}
    </TabContext.Provider>
  );
};

export default TabProvider;
