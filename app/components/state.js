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
  const [ currentContributions, setCurrentContributions ] = useState(0);
  const [ currentCategory, setCurrentCategory ] = useState({});
  const [ newDescription, setNewDescription ] = useState('');
  const [ newContact, setNewContact ] = useState('');
  const [ newWebsite, setNewWebsite ] = useState('');

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

  async function updateCurrentContributions(contributions) {
    setCurrentContributions(contributions)
  }

  async function updateCurrentCategory(category) {
    setCurrentCategory(category)
  }

  async function updateNewDescription(description) {
    setNewDescription(description)
  }

  async function updateNewContact(contact) {
    setNewContact(contact)
  }

  async function updateNewWebsite(website) {
    setNewWebsite(website)
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
        currentCategory,
        currentContributions,
        currentFundraiserPubkey,
        newDescription,
        newContact,
        newWebsite,
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
        updateCurrentContributions,
        updateCurrentCategory,
        updateNewContact,
        updateNewDescription,
        updateNewWebsite,
    }}>
        {children}
    </stateContext.Provider>
  );
}