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

  // Debug logging
  console.log("🟡 Tab component - isLoggedIn:", isLoggedIn);
  console.log("🟡 Tab component - activeTab:", activeTab);
  console.log(
    "🟡 Tab component - visibleTabs:",
    visibleTabs.map((t) => t.value)
  );

  return (
    <div className="mx-auto p-4 bg-background dark:bg-background-dark text-text dark:text-text-dark">
      <div className="flex gap-4 items-center my-4 md:flex-row flex-col justify-center mt-20">
        {visibleTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.value)}
            className={`py-4 px-12 border border-primary dark:border-primary-dark rounded-full cursor-pointer transition-all duration-300
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
