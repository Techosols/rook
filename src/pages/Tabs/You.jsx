import AuthenticatedTabLayout from '../../components/ui/Authenticated Tab/AuthenticatedTabLayout'
import { useState } from 'react';

// Components
import YourInfo from '../../components/you/YourInfo';
import AboutYou from '../../components/you/AboutYou';
import YourPictures from '../../components/you/YourPictures';
import YourHobbies from '../../components/you/YourHobbies';

function You() {
  const tabs = [
    { id: 1, value: 'info', label: 'Your Info' },
    { id: 2, value: 'pictures', label: 'Your Pictures' },
    { id: 3, value: 'about', label: 'About You' },
    { id: 4, value: 'hobbies', label: 'Your Hobbies, Pets, etc.' }
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].value);

  function renderTabContent() {
    switch (activeTab) {
      case 'info':
        return <YourInfo />;
      case 'pictures':
        return <YourPictures />;
      case 'about':
        return <AboutYou />;
      case 'hobbies':
        return <YourHobbies />;
    }
  }

  return (
    <section>
      <div className='bg-background dark:bg-background-dark dark:text-white'>
        <div className='container mx-auto max-w-[1200px] p-4 gap-2'>
          <AuthenticatedTabLayout
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            <div>
              {renderTabContent()}
            </div>
          </AuthenticatedTabLayout>
        </div>
      </div>
    </section>
  )
}

export default You
     