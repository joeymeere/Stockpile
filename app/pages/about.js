import React from 'react';
import DashboardLayout from '../components/DashboardLayout'
import Link from "next/link";

const About = () => {
  return (
    <DashboardLayout>
      <h1 className="pt-6">For Fundraisers</h1>
      <hr className="w-44"></hr>
      <br></br>
      <p className="w-2/3">
        Mobius Protocol is the only crowdfunding platform that provides seamless
        fundraising for non-profits and public goods who want quick, easy,
        global payments in the age of decentralized tech.
      </p>
      <br></br>
      <p className="w-2/3">
        Quickly and easily create a crowdfund, and start raising immediately.
        Accept contributions all over the world with the power of
        cryptocurrency. That's what we mean by funding without barriers. Mobius
        is designed as a crowdfunding protocol that puts the power in the hands
        of the user.
      </p>
      <br></br>
      <p className="w-2/3">
        When you create a fundraiser on Mobius, you're participating in a global
        crowdfunding revolution. Our mission is at the ethos of Web3, providing
        a solution to enable the trailblazers of tomorrow to create, while
        empowering the contributors.
      </p>

      <div className="mt-6 py-6">
        <Link
          href={{
            pathname: "/create",
          }}
        >
         <button className="text-white font-semibold rounded-full bg-gradient-to-r from-orange-500 to-orange-700">Create a Fundraiser</button>
        </Link>
      </div>

      <h1 className="pt-6">For Contributors</h1>
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
        When you create a fundraiser on Mobius, you're participating in a global
        crowdfunding revolution. Our mission is at the ethos of Web3, providing
        a solution to enable the trailblazers of tomorrow to create, while
        empowering the contributors.
      </p>

      <div className="mt-6 py-6">
        <Link
          className="bg-gradient-to-r from-orange-500 to-orange-700"
          href={{
            pathname: "/explore",
          }}
        >
          <button className="text-white font-semibold rounded-full bg-gradient-to-r from-orange-500 to-orange-700">Explore Fundraiser</button>
        </Link>
      </div>
    </DashboardLayout>
  );
}

export default About;