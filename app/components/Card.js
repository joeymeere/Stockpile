import React, { useEffect, useContext } from 'react';
import Link from "next/link";
import { useStateContext } from './state';
import { useRouter } from 'next/router';

export const FundraiserCard = (props) => {

  const router = useRouter();

  let { pubkey, beneficiary, creator, name, description, imageLink, contactLink, websiteLink, raised, goal, contributions, category } = props;

  const {
    updateCurrentBeneficiary,
    updateCurrentContactLink,
    updateCurrentCreator,
    updateCurrentDescription,
    updateCurrentImageLink,
    updateCurrentName,
    updateCurrentRaised,
    updateCurrentWebsiteLink,
    updateCurrentGoal,
    updateCurrentFundraiserPubkey,
    updateCurrentContributions,
    updateCurrentCategory,
   } = useStateContext();

   function truncateString(str, len, append) {
    var newLength;
    append = append || "";  //Optional: append a string to str after truncating. Defaults to an empty string if no value is given
    
    if (append.length > 0)
        {
        append = " "+append;  //Add a space to the beginning of the appended text
        }
    if (str.indexOf(' ')+append.length > len)
    {
        return str;   //if the first word + the appended text is too long, the function returns the original String
    }
    
    str.length+append.length > len ? newLength = len-append.length : newLength = str.length; // if the length of original string and the appended string is greater than the max length, we need to truncate, otherwise, use the original string
    
        var tempString = str.substring(0, newLength);  //cut the string at the new length
        tempString = tempString.replace(/\s+\S*$/, ""); //find the last space that appears before the substringed text

    
    if (append.length > 0)
        {
        tempString = tempString + append;
        }

    return tempString;
    }

    return (

      <div className="bg-white shadow-md rounded-md py-6 px-5">
        <img
          src={String(imageLink)}
          alt=""
          height={150}
          className="rounded-lg w-full mb-3"
        />
        <h3><strong>{String(name)}</strong></h3>
        <p className="text-gray-400 py-4">
          {truncateString(description, 70) + '...'}
        </p>
  
        <div className="mt-4 flex justify-between items-center">
          <h5 className=""><strong>{String(raised /= 100)}</strong> SOL raised</h5>
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
              updateCurrentGoal(goal);
              updateCurrentFundraiserPubkey(pubkey);
              updateCurrentContributions(contributions);
              updateCurrentCategory(category);
              router.push( `/fundraiser/${String(name)}`)
            }}
            >View</button>
        </div>
      </div>
    );
};


export default FundraiserCard;