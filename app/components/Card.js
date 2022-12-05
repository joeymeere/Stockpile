import React from 'react';
import Link from "next/link";
import { useStockpile } from './Context';

export const FundraiserCard = (props) => {

  let { beneficiary, creator, name, description, imageLink, contactLink, websiteLink, raised } = props;
  const { fundraiserPDA } = useStockpile();

  console.log(name)
  console.log(imageLink)
  console.log(raised)

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
          <Link
            href={{
              pathname: `/fundraiser/${name}`,
            }}
          >
            <button className="text-white font-bold rounded-full bg-gradient-to-r from-orange-500 to-orange-700">View</button>
          </Link>
        </div>
      </div>
    );
};

export default FundraiserCard;