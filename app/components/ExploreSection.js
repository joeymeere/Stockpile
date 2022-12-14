import React, { useState } from 'react';
import FundraiserCard from "./Card";
import { useStockpile } from './Context';

export const ExploreSection = () => {

    const { fundraisers } = useStockpile();
    
    return (
        <div className="mt-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 w-2/3 h-2/3">
            {
			    fundraisers.map((item, i) =>
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
                    />
            )}
            </div>
        </div>
    );
};

export default ExploreSection;