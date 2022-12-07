import React, { useEffect, useContext } from 'react';
import Link from "next/link";
import { useStateContext } from './state';
import { useRouter } from 'next/router';

export const FundraiserCard = (props) => {

  const router = useRouter();

  let { beneficiary, creator, name, description, imageLink, contactLink, websiteLink, raised } = props;

  const {
    updateCurrentBeneficiary,
    updateCurrentContactLink,
    updateCurrentCreator,
    updateCurrentDescription,
    updateCurrentImageLink,
    updateCurrentName,
    updateCurrentRaised,
    updateCurrentWebsiteLink
   } = useStateContext();

    return (

      <div className="bg-white shadow-md rounded-md py-6 px-5">
        <img
          src={imageLink}
          alt=""
          height={150}
          className="rounded-lg w-full mb-3"
        />
        <h3><strong>{name}</strong></h3>
        <p className="text-gray-400 py-4">
          {description}
        </p>
  
        <div className="mt-4 flex justify-between items-center">
          <h5 className=""><strong>{raised}</strong> SOL raised</h5>
            <button 
            className="text-white font-bold rounded-full bg-gradient-to-r from-orange-500 to-orange-700"
            onClick={async () => {
              updateCurrentBeneficiary(beneficiary);
              updateCurrentCreator(creator);
              updateCurrentName(name);
              updateCurrentDescription(description);
              updateCurrentImageLink(imageLink);
              updateCurrentContactLink(contactLink);
              updateCurrentWebsiteLink(websiteLink);
              updateCurrentRaised(raised);

              router.push( `/fundraiser/${name}`)
            }}
            >View</button>
        </div>
      </div>
    );
};


export default FundraiserCard;