import DashboardLayout from "components/DashboardLayout";
import Link from "next/link";
import ContributeOne from "components/Contribute/StepOne";
import ContributeTwo from "components/Contribute/StepTwo";
import WithdrawOne from "components/Withdraw/StepOne";
import React, { useContext, useState } from "react";
import { Modal } from "@mantine/core";
import IdSection from '../../components/IdSection';
import { useStateContext } from "../../components/state";
import { useStockpile } from "../../components/Context";
import Register from "../../components/Register";

const Fundraiser = (props) => {

  const [opened, setOpened] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const { publicKey, initialized } = useStockpile();
  const {currentRaised, 
        currentWebsiteLink,
        currentContactLink,
        currentImageLink,
        currentDescription, 
        currentName,
        currentCreator,
        currentBeneficiary,
        currentGoal,
   } = useStateContext();

  const pubkey = String(publicKey);

  const renderStep = (step) => {
    if (initialized == false) {
        switch (step) {
          case 1:
            return (
              <ContributeOne
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                onContinue={() => setStep((s) => s + 1)}
              />
            );

            case 2:
              return (<Register
                    selectedType={selectedType}
                    onContinue={() => setStep((s) => s + 1)}
                    />);

            case 3:
              return ((<ContributeTwo/>));

        }
      } else if (pubkey != currentBeneficiary) {
        switch (step) {
          case 1:
            return (
              <ContributeOne
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                onContinue={() => setStep((s) => s + 1)}
              />
            );

            case 2:
              return (<ContributeTwo/>);
            }
      } else {
        switch (step) {
          case 1:
            return (
              <WithdrawOne />
            );
          }
      }
    }

  return (
    <>
      <Modal
      centered={true}
      radius="lg"
      opened={opened}
      onClose={() => {setOpened(false); setStep((s) => s = 1)}}>
      {renderStep(step)}
      </Modal>
      <DashboardLayout>
        <h1 className="pt-6">{String(currentName)}</h1>
        <hr className="w-44 pb-4"></hr>
        <div className="fundraisercard h-7/12 w-7/12 flex gap-4 items-center">
          <img className="w-7/12 h-full rounded-lg" src={String(currentImageLink)} alt="" />
          <div className="h-full bg-gray-100 rounded-lg">
          <div className="h-full m-16">
            <h2 className="pb-4 font-normal content-center top-0"><strong>{String(currentRaised)}</strong> SOL raised</h2>
            <ul>
              <li className="pb-4">
                <strong>beneficiary: </strong> {String(currentBeneficiary).slice(0, 4) + "..." + String(currentBeneficiary).slice(40, 45)}
              </li>
              <li className="pb-4">
                <strong>Total Contributions:</strong> 112
              </li>
              <li className="pb-4">
                <strong>Goal: </strong> {String(currentGoal / 100)} SOL
              </li>
              <li className="pb-4">
                <strong>Created By: </strong> {String(currentCreator)}
              </li>
              <li className="pb-4">
                <strong>Token Enabled: </strong> No
              </li>
            </ul>
            {pubkey != currentBeneficiary ? (
                <div className="bottom-0">
                <button
                  onClick={() => setOpened(true)}
                  className="mt-2 mr-4 inset-x-0 bottom-0 w-full"
                >
                  Contribute
                </button>
                <button className="text-white font-semibold rounded-full mr-4 inset-x-0 bottom-0 w-full mt-2">More Info</button>
                </div>
              ) : (
                <div className="bottom-0">
                 <button
                   onClick={() => setOpened(true)}
                   className="mt-2 mr-4 inset-x-0 bottom-0 w-full"
                 >
                   Withdraw
                 </button>
                 <button className="text-white font-semibold rounded-full mr-4 inset-x-0 bottom-0 w-full mt-2">Manage</button>
                 </div>
            )}
            </div>
          </div>
        </div>

        <h2 className="mt-6 pt-4">📝 About {String(currentName)}</h2>
        <hr className="w-44 pb-3"></hr>
        <p>
          {String(currentDescription)}
        </p>

        <h2 className="mt-6 pt-4">🚀 Related Fundraisers</h2>
        <hr className="w-44 pb-3"></hr>
        <div className="">
            <IdSection />
        </div>
    
      </DashboardLayout>
    </>
  );
};

export default Fundraiser;
