import DashboardLayout from "components/DashboardLayout";
import Link from "next/link";
import ContributeOne from "components/Contribute/StepOne";
import ContributeTwo from "components/Contribute/StepTwo";
import WithdrawOne from "components/Withdraw/StepOne";
import React, { useContext, useState } from "react";
import { Modal, Progress, Badge, LoadingOverlay, Group } from "@mantine/core";
import IdSection from '../../components/IdSection';
import { useStateContext } from "../../components/state";
import { useStockpile } from "../../components/Context";
import Register from "../../components/Register";
import toast from 'react-hot-toast';

const Fundraiser = (props) => {

  const [opened, setOpened] = useState(false);
  const [up, setUp] = useState(false);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const { publicKey, initialized, updateFundraiser } = useStockpile();
  const {currentRaised, 
        currentWebsiteLink,
        currentContactLink,
        currentImageLink,
        currentDescription, 
        currentName,
        currentCreator,
        currentBeneficiary,
        currentGoal,
        currentContributions,
        currentCategory,
        newDescription,
        newContact,
        newWebsite,
        updateNewDescription,
        updateNewContact,
        updateNewWebsite,
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
              return ((<ContributeTwo
              onContribute={() => {
                setOpened(false);
              }}
              />));

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
              return (<ContributeTwo
              onContribute={() => {
                  setOpened(false);
              }}
              />);
            }
      } else {
        switch (step) {
          case 1:
            return (
              <WithdrawOne
              onWithdraw={() => {
                setOpened(false);
              }}
               />
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
      <Modal
      centered={true}
      radius="lg"
      opened={up}
      onClose={() => {setUp(false)}}>
            <>
             <div className="items-centers">
              <div>
                <LoadingOverlay loaderProps={{color: "orange"}} radius="lg" visible={visible} overlayBlur={2} onClick={() => setVisible(false)} />
                <h2 className="font-bold">Update Fundraiser</h2>
                <p className="text-slate-400 font-light">Change your fundraiser's description, contact & website.</p>
                <hr className="w-24 pb-2"></hr>
              </div>
              <div>
                <label className="font-semibold">
                  Description
                  <textarea
                    name="description"
                    type="description"
                    placeholder="Enter a new description..."
                    value={newDescription}
                    onChange={(e) => updateNewDescription(e.target.value)}
                    className="enabled:active:border-orange-400 font-light"
                    required />
                </label>

                <label className="font-semibold"> 
                  Contact
                  <input
                    name="contact"
                    type="contact"
                    placeholder="Enter a new contact..."
                    value={newContact}
                    onChange={(e) => updateNewContact(e.target.value)}
                    className="enabled:active:border-orange-400 font-light"
                    required />
                </label>

                <label className="font-semibold">
                  Website
                  <input
                    name="website"
                    type="website"
                    placeholder="Enter a new website link..."
                    value={newWebsite}
                    onChange={(e) => updateNewWebsite(e.target.value)}
                    className="enabled:active:border-orange-400 font-light"
                    required />
                </label>
              </div>

              <br></br>
              
              <div>
                <button onClick={async () => {setVisible((v) => !v)
                      await toast.promise(
                        updateFundraiser(newDescription, newWebsite, newContact),
                        {
                          loading: 'Submitting...',
                          success: <b>Successfully Updated Fundraiser</b>,
                          error: <b>Transaction Failed.</b>,
                        }
                      );
                      setVisible(false);
                      setUp(false);
                    }} 
                    className="w-sm">Update</button>
              </div>
             </div>
            </>
      </Modal>
      <DashboardLayout>
        <h1 className="pt-6">{String(currentName)}</h1>
        <hr className="w-44 pb-4"></hr>
        <div className="fundraisercard h-7/12 w-7/12 flex gap-4 items-center">
          <img className="w-7/12 h-full rounded-lg" src={String(currentImageLink)} alt="" />
          <div className="h-full bg-gray-100 rounded-lg">
          <div className="h-full m-16">
            <div className="mb-6 content-center top-0">
              <h2 className="pb-2 font-normal content-center top-0"><strong>{String(currentRaised)}</strong> of <strong>{String(currentGoal / 100)}</strong> SOL raised</h2>
              <Progress color="orange" value={currentRaised / (currentGoal / 100) * 100} />
            </div>
            <ul>
              <li className="pb-4">
                <strong>beneficiary: </strong> {String(currentBeneficiary).slice(0, 4) + "..." + String(currentBeneficiary).slice(40, 45)}
              </li>
              <li className="pb-4">
                <strong>Total Contributions:</strong> {String(currentContributions)}
              </li>
              <li className="pb-4">
                <strong>Created By: </strong> {String(currentCreator)}
              </li>
              <li className="pb-4">
                <strong>Website: </strong> <Link href={{
                  pathname: currentWebsiteLink,
                }}>{String(currentWebsiteLink)}</Link>
              </li>
              <li className="pb-4">
                <strong>Contact: </strong> {String(currentContactLink)}
              </li>
              <li className="pb-4">
                <div>
                <strong>Category: </strong>
                 {currentCategory == 'project' ? (
                   <Badge size="lg" variant="gradient" gradient={{ from: 'orange', to: 'red' }}>Project</Badge>
                    ) : (
                  <span></span>
                    )}
                  {currentCategory == 'individual' ? (
                   <Badge size="lg" variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>Individual</Badge>
                    ) : (
                   <span></span>
                    )}
                  </div>
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
                </div>
              ) : (
                <div className="bottom-0">
                 <button
                   onClick={() => setOpened(true)}
                   className="mt-2 mr-4 inset-x-0 bottom-0 w-full"
                 >
                   Withdraw
                 </button>
                 <button 
                   className="text-white font-semibold rounded-full mr-4 inset-x-0 bottom-0 w-full mt-2"
                   onClick={() => setUp(true)}
                 >
                  Manage</button>
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
