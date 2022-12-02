import DashboardLayout from "components/DashboardLayout";
import Link from "next/link";
import ContributeOne from "components/Contribute/StepOne";
import ContributeTwo from "components/Contribute/StepTwo";
import React, { useState } from "react";
import { Modal } from "@mantine/core";
import { useRouter } from 'next/router'
//import Link from 'react-router'

const Fundraiser = (props) => {

  const { beneficiary, creator, name, description, imageLink, contactLink, websiteLink, raised } = props;

  const [opened, setOpened] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);


  const renderStep = (step) => {
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
          console.log("Contribute Step 2...", selectedType);
          
          return (<ContributeTwo
                setSelectedType={setSelectedType}
                selectedType={selectedType}
                onContinue={() => setStep((s) => s + 1)}
                 />);

        case 3:
          console.log("Contribute Step 3...", selectedType);
          return (<div></div>);

        default:
          console.log("Congratulations!")
          return <Congratulation />;
    }
  };

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
        <h1 className="pt-6">{name}</h1>
        <hr className="w-44 pb-4"></hr>
        <div className="fundraisercard h-7/12 w-7/12 flex gap-4 items-center">
          <img className="w-7/12 h-full" src="/clemson_club.png" alt="" />
          <div className="h-full bg-gray-100 rounded-lg">
          <div className="h-full m-16">
            <h2 className="pb-4 font-normal content-center top-0"><strong>{raised}</strong> SOL raised</h2>
            <ul>
              <li className="pb-4">
                <strong>Total Contributions:</strong> 112
              </li>
              <li className="pb-4">
                <strong>Average Contributions: </strong> 1.223 SOL
              </li>
              <li className="pb-4">
                <strong>Created By: </strong> {creator}
              </li>
              <li className="pb-4">
                <strong>Token Enabled: </strong> No
              </li>
            </ul>
            <div className="bottom-0">
            <button
              onClick={() => setOpened(true)}
              className="mt-2 mr-4 inset-x-0 bottom-0 w-full"
            >
              Contribute
            </button>
            <button className="text-white font-semibold rounded-full mr-4 inset-x-0 bottom-0 w-full mt-2">More Info</button>
            </div>
            </div>
          </div>
        </div>

        <h2 className="mt-6 pt-4">📝 About {name}</h2>
        <hr className="w-44 pb-3"></hr>
        <p>
          {description}
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
