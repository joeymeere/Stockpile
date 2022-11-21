import * as Yup from "yup";
import React, { useState } from "react";
import { IconUpload } from '@tabler/icons';
import { TextInput, Button, Group, Textarea, FileInput, LoadingOverlay } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { findProgramAddress } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { useStockpile } from "../components/Context";
import DashboardLayout from "../components/DashboardLayout";
import toast from "react-hot-toast";
import { IDL } from '../utils/stockpile'
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
    const [imageLink, setImage] = useState(false);

    return(
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
        imageLink={imageLink}
        setImage={setImage}
        onSubmit={async () => await createFundraiser(name, description, websiteLink, contactLink, imageLink)}
        />
    </DashboardLayout>
    )

}

export default Create;