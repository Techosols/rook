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
      },
      {
        id: 9,
        label: "You",
        value: "you",
      },
      {
        id: 10,
        label: "Filters",
        value: "matchFilters",
      },
      {
        id: 11,
        label: "Messages",
        value: "messages",
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
