import React, { useState } from 'react';
//import Link from 'next/link';
import { Modal, Group } from "@mantine/core";

const CardSection = () => {
    return (
        <div className="mt-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from(new Array(1)).map((_, i) => (
                <FundraiserCard key={i} />
                ))}
            </div>
        </div>
    );
};

const FundraiserCard = () => {

    const [opened, setOpened] = useState(false);
    const [ description, setDescription ] = useState("");
    const [ websiteLink, setWebsiteLink ] = useState("")
    const [ contactLink, setContactLink ] = useState("")

    console.log(description)
    console.log(websiteLink)
    console.log(contactLink)
    
    return (
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

      <div className="bg-white shadow-md rounded-md py-6 px-5">
        <img
          src="/clemson_club.png"
          alt="Clemson club"
          height={50}
          className="rounded-lg w-full mb-3"
        />
        <h3><strong>Clemson Blockchain Club</strong></h3>
        <p className="text-gray-400 py-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
          voluptatem tempora iure voluptatum! Soluta dolor atque unde fugiat
        </p>
  
        <div className="mt-4 flex justify-between items-center">
          <h5 className=""><strong>100</strong> SOL raised</h5>
            <button 
            onClick={() => setOpened(true)}
            className="text-white font-bold rounded-full bg-gradient-to-r from-orange-500 to-orange-700 mr-2">Manage</button>
            <button
            onClick={() => setOpened(true)} 
            className="text-white font-bold rounded-full bg-gradient-to-r from-orange-500 to-orange-700">Withdraw</button>
        </div>
      </div>
      </>
    );
};

export default CardSection;