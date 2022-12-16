import DashboardLayout from "components/DashboardLayout";
import Link from "next/link";
import ContributeOne from "components/Contribute/StepOne";
import ContributeTwo from "components/Contribute/StepTwo";
import WithdrawOne from "components/Withdraw/StepOne";
import React, { useContext, useState } from "react";
import { Modal } from "@mantine/core";
import { useStateContext } from "../../components/state";
import { useStockpile } from "../../components/Context";

const Fundraiser = (props) => {

  const [opened, setOpened] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const { publicKey } = useStockpile();
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
    if (pubkey != currentBeneficiary) {
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
              return (<ContributeTwo
                    setSelectedType={setSelectedType}
                    selectedType={selectedType}
                    onContinue={() => setStep((s) => s + 1)}
                    />);

            case 3:
              return (<div></div>);

            default:
              console.log("Congratulations!")
              return <Congratulation />;
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

        <h2 className="mt-6 pt-4">📈 Top Contributors</h2>
        <hr className="w-44 pb-3"></hr>
        <ul>
          {Array.from(new Array(2)).map((_, i) => (
            <li key={i} className="flex justify-between items-center mb-3 bg-gray-100 font-semibold max-w-[50%] rounded-full">
              <h5 className="m-4">yJRXL...5eAwM</h5>
              <h6 className="m-4">21 SOL</h6>
            </li>
          ))}
        </ul>

        <h2 className="mt-6 pt-4">🚀 Related Fundraisers</h2>
        <hr className="w-44 pb-3"></hr>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from(new Array(3)).map((_, i) => (
            <FundraiserCard key={i} />
          ))}
        </div>
    
      </DashboardLayout>
    </>
  );
};

const FundraiserCard = () => {

  return (
    <div className="bg-white shadow-md rounded-md py-6 px-5">
      <img
        src="/clemson_club.png"
        alt="Clemson club"
        height={150}
        className="rounded-lg w-full mb-3"
      />
      <h4>Clemson Blockchain Club</h4>
      <p className="text-gray-400 py-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur,
        odit.
      </p>

      <div className="mt-4 flex justify-between items-center">
        <h5 className="font-bold"><strong>100</strong> SOL raised</h5>
        <Link
          href={{
            pathname: `/fundraiser/1`,
          }}
        
        >
          <button className="text-white font-bold rounded-full bg-gradient-to-r from-orange-500 to-orange-700">View</button>
        </Link>
      </div>
    </div>
  );
};

const Congratulation = () => {
  const [opened, setOpened] = useState(false);
  return (
    <Modal
    centered
    opened={opened}
    onClose={() => setOpened(false)}
    title="Congratulations!">
    <div className="flex flex-col justify-center items-center">
      <h2>Congratulations!</h2>
      <p>Your Fundraiser was successfully deployed.</p>
      <button className='font-semibold'>View My Fundraiser</button>
    </div>
    </Modal>
  );
};

export default Fundraiser;
