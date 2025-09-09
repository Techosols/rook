import useTab from "../hooks/useTab";
import useAuth from "../hooks/useAuth";

import Button from "./ui/Button";

function ButtonGroup() {
  const { activeTab, setActiveTab, tabs } = useTab();
  const { isLoggedIn } = useAuth();

  // Filter tabs based on authentication state
  const visibleTabs = tabs.filter((tab) => {
    if (isLoggedIn) {
      return ["matches", "you", "matchFilters", "messages"].includes(tab.value);
    } else {
      return [
        "background",
        "pricing",
        "filters",
        "pictures",
        "community",
        "stats",
        "join",
      ].includes(tab.value);
    }
  });


  return (
    <div className="mx-auto p-4 bg-background dark:bg-background-dark text-text dark:text-text-dark">
      <div className="flex flex-row flex-wrap gap-2 items-center my-4 justify-center mt-20">
        {visibleTabs.map((tab) => (
          <Button key={tab.id} onClick={() => setActiveTab(tab.value)} active={activeTab === tab.value} text={tab.label} size="md"/>
        ))}
      </div>
    </div>
  );
}

export default ButtonGroup;
