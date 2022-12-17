import React, { useEffect, useState } from 'react';
import CardSection from '../components/IdSection'
import FundraiserCard from '../components/Card';
import { Modal, Group } from "@mantine/core";
import { useStockpile } from '../components/Context';
import DashboardLayout from '../components/DashboardLayout'
import toast from "react-hot-toast";

const User = () => {

    const { initialized, user, userAccounts, updateUser } = useStockpile();
    const [opened, setOpened] = useState(false);

    const [ username, setUsername ] = useState("");

  return (
    <DashboardLayout>
        {initialized ? (
        <>
          <Modal
            centered={true}
            radius="lg"
            opened={opened}
            onClose={() => {setOpened(false)}}>
            <div className="place-content-center">
                <Group pb="xl" position="center">
                <h2 className="font-bold">Update User</h2>
                    </Group>
                        <form>
                    <Group position="center">
                    <label className="font-semibold">
                        New Username
                        <br></br>
                            <label className="text-slate-400 font-light">
                               Add a new username to your account
                                    <input
                                    name="username"
                                    type="username"
                                    placeholder="Enter a new username..."
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required />
                            </label>
                    </label>
                    </Group>
                    <Group pt="xl" pb="md" position="center">
                <button 
                className="w-sm"
                onClick={async (e) => {
                  e.preventDefault();
                  await toast.promise(
                    updateUser(username),
                     {
                       loading: 'Submitting...',
                       success: <b>Successfully Updated Username!</b>,
                       error: <b>Transaction Failed.</b>,
                     }
                   );
                   setOpened(false);
                }}
                >Update</button>
                </Group>
                </form>
            </div>
            </Modal>

         <div className="mb-8">
            <div className="py-6">
                <div>
                    <h1 className="pt-6"><strong>⚡ View User</strong></h1>
                    <div className="my-2">
                            <p>Manage your user account.</p>
                        </div>
                    <hr className="w-44"></hr>
                </div>
                <div className="mb-6 h-full w-1/4 bg-gray-100 rounded-xl">
                  <div className="h-full pt-8 px-4">
                    <h3><strong>Username:</strong> {user.username}</h3>
                    <br></br>
                    <p><strong>Fundraisers Deployed:</strong> {user.fundraisers}</p>
                    <br></br>
                    <p><strong>Contributions Made:</strong> {user.contributions}</p>
                  </div>
                  <button className="my-4 mx-4"
                  onClick={() => setOpened(true)}
                  >Manage</button>
                </div>
                <div>
                    <h2 className="font-bold pt-12">🚀 My Fundraisers</h2>
                        <div className="my-2">
                            <p>View and manage your fundraisers.</p>
                        </div>
                    <hr className="w-24 pb-2"></hr>
                </div>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 w-2/3 h-2/3 pb-6">
              {
                userAccounts.map((item, i) => 
                    <FundraiserCard 
                    key={i} 
                    beneficiary={item.account.beneficiary}
                    creator={item.account.creator}
                    name={item.account.name}
                    description={item.account.description}
                    imageLink={item.account.imageLink}
                    contactLink={item.account.contactLink}
                    websiteLink={item.account.websiteLink}
                    raised={item.account.raised}
                    goal={item.account.goal}
                    />
                 ) 
              }
            </div>
         </div>
        </>
        ): (
          <div className="h-screen">
            <h2 className="font-bold">🚨 Please create a user account. This can be done by connecting a wallet, then creating a fundraiser or contributing to one! 🚨</h2>
          </div>
        )}
    </DashboardLayout>
  )
}

export default User;
