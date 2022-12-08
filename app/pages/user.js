import React, { useEffect, useState } from 'react';
import CardSection from '../components/CardSection'
import FundraiserCard from '../components/Card';
import { Modal, Group } from "@mantine/core";
import { useStockpile } from '../components/Context';
import DashboardLayout from '../components/DashboardLayout'

const User = () => {

    const { initialized, user, userAccounts } = useStockpile();
    const [opened, setOpened] = useState(false);

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
                <h2 className="font-bold">Update Fundraiser</h2>
                    </Group>
                        <form>
                    <Group position="center">
                        <label className="font-semibold">
                        Description
                        <br></br>
                            <label className="text-slate-400 font-light">
                                A description of your fundraiser and its goals. 
                                <textarea
                                name="description"
                                type="description"
                                placeholder="Enter a new description..."
                                value={null}
                                onChange={e => setDescription(e.target.value)}
                                className="enabled:active:border-orange-400"
                                required />
                            </label>
                    </label>

                    <label className="font-semibold">
                        Website
                        <br></br>
                            <label className="text-slate-400 font-light">
                                A website or webage where your fundraiser can be contacted.
                                    <input
                                    name="website"
                                    type="website"
                                    placeholder="Enter a new website..."
                                    value={null}
                                    onChange={e => setWebsiteLink(e.target.value)}
                                    required />
                            </label>
                    </label>

                    <label className="font-semibold">
                        Contact
                        <br></br>
                            <label className="text-slate-400 font-light">
                                Where a representative of your fundraiser can be reached
                                    <input
                                    name="contact"
                                    type="contact"
                                    placeholder="Enter a new email, twitter, or other contact..."
                                    value={null}
                                    onChange={e => setContactLink(e.target.value)}
                                    className="enabled:active:border-orange-400"
                                    required />
                            </label>
                    </label>
                    </Group>
                    <Group pt="xl" pb="md" position="center">
                <button className="w-sm">Update</button>
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
