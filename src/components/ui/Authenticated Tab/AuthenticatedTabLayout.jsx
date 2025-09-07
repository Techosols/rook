import AuthenticatedTabSidebar from "./AuthenticatedTabSidebar"

function AuthenticatedTabLayout({children, tabs, activeTab, setActiveTab}) {
  function handleTabClick(tabValue) {
    setActiveTab(tabValue);
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-2'>
        <div>
            <AuthenticatedTabSidebar tabs={tabs} onTabClick={handleTabClick} active={activeTab} />
        </div>
        <div  >
            {children}
        </div>
    </div>
  )
}

export default AuthenticatedTabLayout
