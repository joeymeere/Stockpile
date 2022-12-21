import React, { useState } from 'react'
import ExploreSection from '../components/ExploreSection'
import DashboardLayout from '../components/DashboardLayout'
import { useStockpile } from '../components/Context'
import ReactSearchBox from "react-search-box";
import TrendingSection from '../components/TrendingSection';
import TimeSection from '../components/TimeSection';

const Home = () => {

  const { fundraisers } = useStockpile();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const query = async () => {
    let queriedAccounts = fundraisers.filter(fundraiser => fundraiser.account.name.toString() === searchQuery);
    setSearchResults(queriedAccounts)
 }

  return (
    <DashboardLayout>
      <div className="w-1/3">
        <h1 className="pt-6"><strong>🌐 Explore Fundraisers</strong></h1>
          <div className="my-2">
              <p>View new fundraisers of all different types.</p>
          </div>
          <hr className="w-44"></hr>
      </div>
      <div className="mb-2">
        <h2 className="font-bold pt-16">📈 Popular Fundraisers</h2>
        <hr className="w-24 pb-6"></hr>
        <TrendingSection />
      </div>
      <div className="mb-2">
        <h2 className="font-bold pt-16">✨ New Fundraisers</h2>
        <hr className="w-24 pb-6"></hr>
        <TimeSection />
      </div>
      <div className="mb-2">
        <h2 className="font-bold pt-16">🌎 All Fundraisers</h2>
        <hr className="w-24 pb-6"></hr>
        <ExploreSection />
      </div>
    </DashboardLayout>
  )
}

export default Home
