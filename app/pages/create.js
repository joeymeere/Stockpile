import * as Yup from "yup";
import React, { useState } from "react";
import { IconUpload } from '@tabler/icons';
import { Group, Modal, LoadingOverlay } from '@mantine/core';
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
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

    const { createFundraiser } = useStockpile();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [websiteLink, setWebsiteLink] = useState("");
    const [contactLink, setContactLink] = useState("");
    const [username, setUsername] = useState("");
    const [imageLink, setImage] = useState(false);

    return(
    <>
    <DashboardLayout>
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
        imageLink={imageLink}
        setImage={setImage}
        onSubmit={async () => {
            await createFundraiser(name, description, websiteLink, contactLink, imageLink)
        }}
        />
    </DashboardLayout>
    </>
    )

}

export default Create;