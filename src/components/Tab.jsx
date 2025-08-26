import useTab from "../hooks/useTab";
import useAuth from "../hooks/useAuth";

function ButtonGroup() {
  const { activeTab, setActiveTab, tabs } = useTab();
  const { isLoggedIn } = useAuth();

  // Filter tabs based on authentication state
  const visibleTabs = tabs.filter((tab) => {
    if (isLoggedIn) {
      // For logged in users, show main app tabs
      return ["matches", "you", "matchFilters", "messages"].includes(tab.value);
    } else {
      // For non-logged in users (including those needing profile completion)
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
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.value)}
            className={`py-1 px-8 lg:py-4 lg:px-12 border border-primary dark:border-primary-dark rounded-full cursor-pointer transition-all duration-300
              ${
                (tab.value === "pictures" || tab.value === "community")
                  ? "w-32 flex justify-center items-center text-center"
                  : ""
              }
              ${
                activeTab === tab.value
                  ? "bg-primary dark:bg-primary-dark text-white"
                  : "bg-background dark:bg-background-dark text-secondary dark:text-text-dark hover:bg-primary hover:dark:bg-primary-dark hover:text-white active:bg-primary active:dark:bg-primary-dark"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ButtonGroup;
