import React from 'react';
import CardSection from '../components/CardSection'
import DashboardLayout from '../components/DashboardLayout'

const Home = () => {
  return (
    <DashboardLayout>
      <div>
      <h1 className="pt-6"><strong>Explore Fundraisers</strong></h1>
      <hr className="w-44"></hr>
      <p>View fundraisers worldwide, both physical and digital.</p>
      </div>
      <CardSection />
    </DashboardLayout>
  )
}

export default Home
