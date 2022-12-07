import React from 'react';
import DashboardLayout from '../components/DashboardLayout'
import Link from "next/link";

const ForFundraisers = () => {

    return (
    <DashboardLayout>
      <div className="h-screen">
        <h1 className="pt-6">💰 For Fundraisers</h1>
        <hr className="w-44"></hr>
        <br></br>
        <p className="w-2/3">
          Stockpile Protocol is the only crowdfunding platform that provides seamless
          fundraising for non-profits and public goods who want quick, easy,
          global payments in the age of decentralized tech.
        </p>
        <br></br>
        <p className="w-2/3">
          Quickly and easily create a crowdfund, and start raising immediately.
          Accept contributions all over the world with the power of
          cryptocurrency. That's what we mean by funding without barriers. Stockpile
          is designed as a crowdfunding protocol that puts the power in the hands
          of the user.
        </p>
        <br></br>
        <p className="w-2/3">
          When you create a fundraiser on Stockpile, you're participating in a global
          crowdfunding revolution. Our mission is at the ethos of Web3, providing
          a solution to enable the trailblazers of tomorrow to create, while
          empowering the contributors.
        </p>

        <div className="mt-6 py-6 items-center">
          <Link
            href={{
              pathname: "/create",
            }}
          >
          <button className="text-white font-semibold rounded-full bg-gradient-to-r from-orange-500 to-orange-700">Create a Fundraiser</button>
          </Link>
        </div>
        </div>
    </DashboardLayout>
    );
}

export default ForFundraisers;