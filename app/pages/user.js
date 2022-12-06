import React, { useEffect, useState } from 'react';
import CardSection from '../components/CardSection'
import FundraiserCard from '../components/Card';
import { useStockpile } from '../components/Context';
import DashboardLayout from '../components/DashboardLayout'

const User = () => {

    const [ accounts, setAccounts ] = useState([]);

    const { initialized, publicKey, user, userAccounts } = useStockpile();

    console.log(userAccounts)

  return (
    <DashboardLayout>
        {initialized ? (
        <>
            <div>
                <div className="pt-6">
                    <h1 className="pt-6"><strong>View User</strong></h1>
                    <hr className="w-44"></hr>
                    <p>Manage your user account.</p>
                </div>
                <div>
                    <p>Username: {user.username}</p>
                    <br></br>
                    <p>Fundraisers Deployed: {user.fundraisers}</p>
                    <br></br>
                    <p>Contributions Made: {user.contributions}</p>
                </div>
                <div>
                    <h2 className="font-bold pt-12">🚀 My Fundraisers</h2>
                    <hr className="w-24 pb-6"></hr>
                </div>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 w-2/3 h-2/3">
              {
                userAccounts.map((item, i) => 
                    <FundraiserCard 
                    key={i} 
                    beneficiary={item.account.beneficiary}
                    creator={item.account.creator}
                    name={item.account.name}
                    description={item.account.description}
                    imageLink={item.account.imageLink}
                    contactLink={item.account.contactLink}
                    websiteLink={item.account.websiteLink}
                    raised={item.account.raised}
                    />
                 ) 
              }
            </div>
        </>
        ): (
            <p> Please create a user account. This can be done by connecting a wallet and creating a fundraiser or contributing to one.</p>
        )}
    </DashboardLayout>
  )
}

export default User;
