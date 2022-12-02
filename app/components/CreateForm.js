import React, { useState } from "react";
import { Group, Modal, LoadingOverlay } from '@mantine/core';
import toast from "react-hot-toast";
import { useStockpile } from "./Context";

export const CreateForm = (props) => {

    const { program, publicKey, initializeFundraiser } = useStockpile();
    const {
        onSubmit,
        name,
        setName,
        description,
        setDescription,
        websiteLink,
        setWebsiteLink,
        contactLink,
        setContactLink,
        imageLink,
        setImage,
        username,
        setUsername,
        buttonText = "Fundraiser",
      } = props;
      const [loading, setLoading] = useState(false);
      const [visible, setVisible] = useState(false);
      const [opened, setOpened] = useState(false);


        return (
            <>
            <div className="w-2/4 place-content-center"> 
            
            {publicKey && program ? (

                <form onSubmit={async (event) => {
                    event.preventDefault();
                    await onSubmit();
                }}>

            <h1 className="pt-6"><strong>Create a Fundraiser</strong></h1>
            <hr className="w-44"></hr>

        <label className="font-semibold">
            Name
            <br></br>
                <label className="text-slate-400 font-light">
                    The name of your fundraiser.
                    <input
                    name="name"
                    type="name"
                    placeholder="Enter a name..."
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="enabled:active:border-orange-400"
                    required />
                </label>
        </label>

        <label className="font-semibold">
            Creator
            <br></br>
                <label className="text-slate-400 font-light">
                    A friendly name for the person creating this fundraiser.
                    <input
                    name="username"
                    type="username"
                    placeholder="Enter a user name..."
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="enabled:active:border-orange-400"
                    required />
                </label>
        </label>

        <label className="font-semibold">
            Description
            <br></br>
                <label className="text-slate-400 font-light">
                    A description of your fundraiser and its goals. 
                    <textarea
                    name="description"
                    type="description"
                    placeholder="Enter a description..."
                    value={description}
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
                        placeholder="Enter a website..."
                        value={websiteLink}
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
                        placeholder="Enter an email, twitter, or other contact..."
                        value={contactLink}
                        onChange={e => setContactLink(e.target.value)}
                        className="enabled:active:border-orange-400"
                        required />
                </label>
        </label>

        <label className="font-semibold">
            Image
            <br></br>
                <label className="text-slate-400 font-light">
                   A link to an image for your fundraiser
                        <input
                        name="image"
                        type="contact"
                        placeholder="Enter an image link...."
                        value={imageLink}
                        onChange={e => setImage(e.target.value)}
                        className="enabled:active:border-orange-400"
                        required />
                </label>
        </label>

        
        <button 
        onClick={async () => {
           await onSubmit()
        }}>Submit</button>
        </form> ) : (
        <p>Please Connect a Wallet</p> 
        )}
            
        </div>
        </>
        )
        }

export default CreateForm;