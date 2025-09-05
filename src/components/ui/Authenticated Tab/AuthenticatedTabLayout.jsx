import AuthenticatedTabSidebar from "./AuthenticatedTabSidebar"

function AuthenticatedTabLayout({children, tabs}) {
  return (
    <div className='grid grid-cols-1 gird-cols-[1fr_2fr]'>
        <div>
            <AuthenticatedTabSidebar tabs={tabs}/>
        </div>
        {children}
    </div>
  )
}

export default AuthenticatedTabLayout
