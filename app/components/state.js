import React, { createContext, useContext, useState } from "react";

const stateContext = createContext();

export const useStateContext = () => {
    const context = useContext(stateContext);
    if (!context) {
        throw new Error("Parent must be wrapped inside StateProvider")
    }

    return context;
}

export const StateProvider = ({ children }) => {
  const [ currentBeneficiary, setCurrentBeneficiary ] = useState('');
  const [ currentCreator, setCurrentCreator ] = useState('');
  const [ currentName, setCurrentName ] = useState('');
  const [ currentDescription, setCurrentDescription ] = useState('');
  const [ currentImageLink, setCurrentImageLink ] = useState('');
  const [ currentContactLink, setCurrentContactLink ] = useState('');
  const [ currentWebsiteLink, setCurrentWebsiteLink ] = useState('');
  const [ currentRaised, setCurrentRaised ] = useState(0);
  const [ currentGoal, setCurrentGoal ] = useState(0);
  const [ currentAmount, setCurrentAmount ] = useState(0);
  const [ currentFundraiserPubkey, setCurrentFundraiserPubkey ] = useState('');

  async function updateCurrentBeneficiary(beneficiary) {
    setCurrentBeneficiary(beneficiary)
  }

  async function updateCurrentCreator(creator) {
    setCurrentCreator(creator)
  }

  async function updateCurrentName(name) {
    setCurrentName(name)
  }

  async function updateCurrentDescription(description) {
    setCurrentDescription(description)
  }

  async function updateCurrentImageLink(imageLink) {
    setCurrentImageLink(imageLink)
  }

  async function updateCurrentContactLink(contactLink) {
    setCurrentContactLink(contactLink)
  }

  async function updateCurrentWebsiteLink(websiteLink) {
    setCurrentWebsiteLink(websiteLink)
  }

  async function updateCurrentRaised(raised) {
    setCurrentRaised(raised)
  }

  async function updateCurrentGoal(goal) {
    setCurrentGoal(goal)
  }

  async function updateCurrentAmount(amount) {
    setCurrentAmount(amount)
  }

  async function updateCurrentFundraiserPubkey(fundraiserPubkey) {
    setCurrentFundraiserPubkey(fundraiserPubkey)
  }

  return (
    <stateContext.Provider 
    value={{
        currentRaised, 
        currentWebsiteLink,
        currentContactLink,
        currentImageLink,
        currentDescription, 
        currentName,
        currentCreator,
        currentBeneficiary,
        currentGoal,
        currentAmount,
        currentFundraiserPubkey,
        updateCurrentBeneficiary,
        updateCurrentContactLink,
        updateCurrentCreator,
        updateCurrentDescription,
        updateCurrentImageLink,
        updateCurrentName,
        updateCurrentRaised,
        updateCurrentWebsiteLink,
        updateCurrentGoal,
        updateCurrentAmount,
        updateCurrentFundraiserPubkey,
    }}>
        {children}
    </stateContext.Provider>
  );
}