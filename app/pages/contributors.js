import React from 'react';
import DashboardLayout from '../components/DashboardLayout'
import Link from "next/link";

const Contributors = () => {

    return (
    <DashboardLayout>
     <div className="h-screen">
        <h1 className="pt-6">💸 For Contributors</h1>
        <hr className="w-44"></hr>
        <br></br>
        <p className="w-2/3">
          With Stockpile, the power is in your hands. Contribute to
          transformational fundraisers all over the world, with quick, low-fee,
          near instant settling payments.
        </p>
        <br></br>
        <p className="w-2/3">
          Powered by Solana, we utilize publicly deployed programs on the
          blockchain to facilitate fast, seamless payments worldwide. This is
          further utilized to provide future tooling and contribution options for
          the true Web3 crowdfunding experience.
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
            className="bg-gradient-to-r from-orange-500 to-orange-700"
            href={{
              pathname: "/explore",
            }}
          >
            <button className="text-white font-semibold rounded-full bg-gradient-to-r from-orange-500 to-orange-700">Explore Fundraiser</button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
    )
}

export default Contributors;