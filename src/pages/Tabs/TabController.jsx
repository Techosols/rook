import React from 'react'
import useTab from '../../hooks/useTab'

import BackgroundChecks from './BackgroundChecks';
import Pricing from './Pricing';
import Filters from './Filters';
import Pictures from './Pictures';
import Community from './Community';
import Stats from './Stats';
import Join from './Join';

function TabController() {
  const { activeTab} = useTab();

  console.log("Active Tab:", activeTab);

  return (
    <div>
        <div className="tab-content">
            {activeTab === 'background' && <BackgroundChecks />}
            {activeTab === 'pricing' && <Pricing />}
            {activeTab === 'filter' && <Filters />}
            {activeTab === 'pictures' && <Pictures />}
            {activeTab === 'community' && <Community />}
            {activeTab === 'stats' && <Stats />}
            {activeTab === 'join' && <Join />}
        </div>
    </div>
  )
}

export default TabController