import React, { useState } from 'react';
import FundraiserCard from "./Card";
import { useStockpile } from './Context';

export const TimeSection = () => {

    const { fundraisers } = useStockpile();

    let timeSortedAccounts = fundraisers.sort((a, b) => b.account.time - a.account.time);

    let timeAccountsArray = timeSortedAccounts.slice(0, 3);
    
    return (
        <div className="mt-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 w-2/3 h-2/3">
            {
			    timeAccountsArray.map((item, i) =>
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
                    goal={item.account.goal}
                    pubkey={item.publicKey}
                    contributions={item.account.contributions}
                    category={Object.keys(item.account.category)}
                    />
            )}
            </div>
        </div>
    );
};

export default TimeSection;