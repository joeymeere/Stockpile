import React, { useState } from "react";
import { useStockpile } from "../components/Context";
import DashboardLayout from "../components/DashboardLayout";
import toast from "react-hot-toast";
import { CreateForm } from "../components/CreateForm";


const FILE_SIZE = 3000000;
const SUPPORTED_FORMATS = [
      "imageLink/jpg",
      "imageLink/jpeg",
      "imageLink/gif",
      "imageLink/png"
    ];

const Create = () => {

    const { create } = useStockpile();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [websiteLink, setWebsiteLink] = useState("");
    const [contactLink, setContactLink] = useState("");
    const [username, setUsername] = useState("");
    const [imageLink, setImage] = useState("");
    const [goal, setGoal] = useState("");

    return(
    <>
    <DashboardLayout>
        <div>
        <CreateForm
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        websiteLink={websiteLink}
        setWebsiteLink={setWebsiteLink}
        contactLink={contactLink}
        setContactLink={setContactLink}
        username={username}
        setUsername={setUsername}
        goal={goal}
        setGoal={setGoal}
        imageLink={imageLink}
        setImage={setImage}
        onSubmit={async () => {
            console.log(username, name, description, websiteLink, contactLink, imageLink, goal)
            await toast.promise(
                create(username, name, description, websiteLink, contactLink, imageLink, goal),
                 {
                   loading: 'Submitting...',
                   success: <b>Fundraiser Successfully Created!</b>,
                   error: <b>Transaction Failed.</b>,
                 }
               );
        }}
        />
        </div>
    </DashboardLayout>
    </>
    )

}

export default Create;