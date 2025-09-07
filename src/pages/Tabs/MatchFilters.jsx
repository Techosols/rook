import { useState } from "react";
import AuthenticatedTabLayout from "../../components/ui/Authenticated Tab/AuthenticatedTabLayout";

// Components
import LocationStats from "../../components/match filters/LocationStats";
import EthnicitiesReligions from "../../components/match filters/EthnicitiesRelegions";
import GenderOrientation from "../../components/match filters/GenderOrientation";
import PoliticsPhysicalActivity from "../../components/match filters/PoliticsPhysicalActivity";
import Occupations from "../../components/match filters/Occupations";

function MatchFilters() {

  const tabs = [
    { id: 1, value: 'locationStats', label: 'Location, Stats, etc.' },
    { id: 2, value: 'ethnicitiesReligions', label: 'Ethnicities, Religions' },
    { id: 3, value: 'genderOrientation', label: 'Gender, Orientation' },
    { id: 4, value: 'politicsPhysicalActivity', label: 'Politics, Physical Activity' },
    { id: 5, value: 'occupations', label: 'Occupations' },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].value);

  function renderTabContent() {
    switch (activeTab) {
      case 'locationStats':
        return <LocationStats />;
      case 'ethnicitiesReligions':
        return <EthnicitiesReligions />;
      case 'genderOrientation':
        return <GenderOrientation />;
      case 'politicsPhysicalActivity':
        return <PoliticsPhysicalActivity />;
      case 'occupations':
        return <Occupations />;
    }
  }

  return (
    <section>
      <div className='bg-background dark:bg-background-dark dark:text-white h-[700px]'>
      <div className='container mx-auto max-w-[1200px] p-4 '>
        <AuthenticatedTabLayout
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        >
          {renderTabContent()}
        </AuthenticatedTabLayout>
      </div>
    </div>
    </section>
  )
}

export default MatchFilters