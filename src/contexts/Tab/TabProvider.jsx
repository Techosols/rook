import { useEffect, useState } from "react";
import TabContext from "./TabContext";
import { useMemo } from "react";
import useAuth from "../../hooks/useAuth";

const TabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("");
  const { isLoggedIn } = useAuth();

  const tabs = useMemo(
    () =>
      isLoggedIn
        ? [
            {
              id: 1,
              label: "Matches",
              value: "matches",
            },
            {
              id: 2,
              label: "You",
              value: "you",
            },
            {
              id: 3,
              label: "Filters",
              value: "matchFilters",
            },
            {
              id: 4,
              label: "Messages",
              value: "messages",
            },
          ]
        : [
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
          ],
    [isLoggedIn]
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
    <TabContext.Provider value={{ activeTab, setActiveTab, tabs }}>
      {children}
    </TabContext.Provider>
  );
};

export default TabProvider;
