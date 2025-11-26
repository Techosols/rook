import { Loader2 } from "lucide-react";
import AuthenticatedTabSidebar from "./AuthenticatedTabSidebar"
import useAuth from "../../../hooks/useAuth"

function AuthenticatedTabLayout({children, tabs, activeTab, setActiveTab}) {
  const { token } = useAuth();

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-[200px] w-full">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
        loading
      </div>
    );
  }

  function handleTabClick(tabValue) {
    setActiveTab(tabValue);
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-2'>
        <div className="">
            <AuthenticatedTabSidebar tabs={tabs} onTabClick={handleTabClick} active={activeTab} />
        </div>
        <div  >
            {children}
        </div>
    </div>
  )
}

export default AuthenticatedTabLayout
