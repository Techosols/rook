import React, { useState } from 'react'
import Banner from '../components/Banner'
import Tab from '../components/Tab'
import BackgroundChecks from './BackgroundChecks'
import Pricing from './Pricing'
import Pictures from './Pictures'   
import Community from './Community'
import Stats from './Stats'
import Join from './Join'

function Home() {
  return (
    <div>
      <Banner />
      <Tab />
      <BackgroundChecks />
      <Pricing />
      <Pictures />
      <Community />
      <Stats />
      <Join />
    </div>
  )
}

export default Home