import React from 'react';
import DashboardLayout from "components/DashboardLayout";
import CardSection from '../components/CardSection'
import Link from "next/link";
import { useStockpile } from '../components/Context';
import { useWallet } from '@solana/wallet-adapter-react';

const Dashboard = () => {

  const { connected } = useWallet();

  return (
    <DashboardLayout>
    <div>
      <h1 className="pt-6">My Fundraisers</h1>
      <hr className="w-44"></hr>
      <p>View and manage fundraisers you've deployed</p>
      </div>
      <div className="mt-4">
        <div>
          {connected ? (
            <CardSection />
          ) : (
            <div>
              <p>You have no created fundraisers</p>
              <Link
                  href={{
                    pathname: "/create",
                  }}
                >
                  <button className="text-white font-semibold rounded-full bg-gradient-to-r from-orange-500 to-orange-700">Create a Fundraiser</button>
                </Link>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}


export default Dashboard;