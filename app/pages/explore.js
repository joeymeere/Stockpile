import React from 'react'
import ExploreSection from '../components/ExploreSection'
import DashboardLayout from '../components/DashboardLayout'

const Home = () => {
  return (
    <DashboardLayout>
      <div>
        <h1 className="pt-6"><strong>Explore Fundraisers</strong></h1>
          <hr className="w-44"></hr>
        <p>View fundraisers worldwide, both physical and digital.</p>
      </div>
        <h2 className="font-bold pt-12">📈 Trending</h2>
        <hr className="w-24 pb-6"></hr>
      <ExploreSection />
    </DashboardLayout>
  )
}

export default Home
