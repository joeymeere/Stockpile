import * as web3 from '@solana/web3.js';
import React, { useEffect, useState } from 'react';
import FundraiserCard from "./Card";
//import * as borsh from 'borsh';
import * as borsh from '@project-serum/borsh';
import { Fundraiser, useStockpile, getAllFundraisers } from './Context';

const PROGRAM_ID = new web3.PublicKey("7iApoMteJ7ANz4dpN5kM6LdGjNRcaieqzxPHD6cddFY4");

export const ExploreSection = () => {

    const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
    const [fundraisers, setFundraisers] = useState([])


    useEffect(() => {
        connection.getProgramAccounts(new web3.PublicKey(PROGRAM_ID)).then(async (accounts) => {
            const fundraisers = accounts.reduce((accum, { pubkey, account }) => {
            const fundraiser = Fundraiser.deserialize(account.data)
                if (!fundraiser) {
                    return accum
                }
            return [...accum, fundraiser]
    },[])
    console.log(fundraisers);
    setFundraisers(fundraisers);
  }
)
             }, []);

/*    useEffect((fundraiser) => {
        setFundraiser(fundraiser);
        setName(fundraiser.name);
        setDescription(fundraiser.description);
        setRaised(0);
        setImage(fundraiser.imageLink);
    }, [fundraiser]) */

    
    return (
        <div className="mt-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {
				fundraisers.map((fundraiser, i) =>
                    <FundraiserCard 
                    key={i} 
                    name={fundraiser.name}
                    description={fundraiser.description}
                    imageLink={fundraiser.imageLink}
                    raised={fundraiser.raised}
                    />
            )}
            </div>
        </div>
    );
};

export default ExploreSection;