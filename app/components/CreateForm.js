import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useStockpile } from "./Context";
import { Uploader } from './Uploader';
import { CldUploadWidget } from 'next-cloudinary';
import { LoadingOverlay } from "@mantine/core";

export const CreateForm = (props) => {

    const { program, publicKey, initialized } = useStockpile();
    const [ uploaded, setUploaded ] = useState(false);
    const [visible, setVisible] = useState(false);
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
        goal,
        setGoal,
      } = props;

      const FILE_SIZE = 3000000;
      const SUPPORTED_FORMATS = [
            "image/jpg",
            "image/jpeg",
            "image/gif",
            "image/png"
            ];

      const schema = Yup.object().shape({
        name: Yup.string().required().label("Name").min(4, 'Name should have at least 4 letters'),
        creator: Yup.string().required().label("Creator").min(4, 'Creator name should have at least 4 letters'),
        description: Yup.string().required().label("Description").min(20, 'Description should have at least 20 letters'),
        contact: Yup.string().required().label("Contact"),
        website: Yup.string().url().required().label("Website"),
        goal: Yup.number().required().label("Goal").min(1, "Goal must be above 1 SOL.")
       // image: Yup.mixed().required("A file is required").test("fileSize", "File too large", value => value && value.size <= FILE_SIZE).test("fileFormat", "Unsupported Format", value => value && SUPPORTED_FORMATS.includes(value.type)),
        });

      const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema),
      });

      const submitForm = (data) => {
        console.log(data);
      };

        return (
            <>
            <div className="w-2/4 place-content-center"> 
            
            {publicKey && program ? (

                <form onSubmit={handleSubmit(submitForm)}>

            <h1 className="pt-6"><strong>🧱 Create a Fundraiser</strong></h1>
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
                    {...register('name', {
                        required: "Required",
                      })}
                    onChange={e => setName(e.target.value)}
                    className="enabled:active:border-orange-400"
                    required />
                </label>
        </label>
        <p> {errors.name?.message} </p>
            {initialized ? (
                    <div></div>
                ) : (
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
                            {...register('creator', {
                                required: "Required",
                              })}
                            onChange={e => setUsername(e.target.value)}
                            className="enabled:active:border-orange-400"
                            required />
                        </label>
                </label>
                )}
                <p> {errors.creator?.message} </p>
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
                    {...register('description', {
                        required: "Required",
                      })}
                    onChange={e => setDescription(e.target.value)}
                    className="enabled:active:border-orange-400"
                    required />
                </label>
        </label>
        <p> {errors.description?.message} </p>

        <label className="font-semibold">
            Image
            <br></br>
                <label className="text-slate-400 font-light">
                    Logo or selected image for your fundraiser.
                    <div className="bg-gray-100 rounded-xl mx-6 my-6 px-4 py-4">
                        <LoadingOverlay loaderProps={{color: "orange"}} radius="lg" visible={visible} overlayBlur={2} onClick={() => setVisible(false)} />
                        {imageLink && uploaded ? (
                            <div>
                                <img alt="not found" width={"250px"} src={imageLink} />
                            <br />
                            <button onClick={()=>{setImage(null); setUploaded(false)}}>Remove</button>
                            </div>
                        ) : ( 
                            <div className="pt-2">
                                <CldUploadWidget uploadPreset="ml_default"
                                onUpload={(error, result, widget) => {
                                        if (error) {
                                            console.log(error)
                                        } else {
                                            console.log(result?.info);
                                            setImage(String(result?.info.url));
                                            console.log(imageLink);
                                            setUploaded(true)
                                            setVisible(false)
                                            widget.close();
                                        }
                                        }}>
                                            {({ open }) => {
                                                function handleOnClick(e) {
                                                e.preventDefault();
                                                setVisible(true)
                                                open();
                                                }
                                                return (
                                                <button onClick={handleOnClick}>
                                                    Upload an Image
                                                </button>
                                                );
                                            }}
                                </CldUploadWidget>
                            </div>
                        )}
                    </div>
                </label>
        </label>
        
        <label className="font-semibold">
            Goal
            <br></br>
                <label className="text-slate-400 font-light">
                    Where a representative of your fundraiser can be reached
                        <input
                        name="goal"
                        type="number"
                        placeholder="Enter a goal..."
                        value={goal}
                        {...register('goal', {
                            required: "Required",
                          })}
                        onChange={e => setGoal(e.target.value)}
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
                        {...register('website', {
                            required: "Required",
                          })}
                        onChange={e => setWebsiteLink(e.target.value)}
                        required />
                </label>
        </label>
        <p> {errors.websiteLink?.message} </p>

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
                        {...register('contact', {
                            required: "Required",
                          })}
                        onChange={e => setContactLink(e.target.value)}
                        className="enabled:active:border-orange-400"
                        required />
                </label>
        </label>
        <p> {errors.contactLink?.message} </p>

        <div className="pb-6 py-2">
            <button 
            onClick={async (event) => {
            event.preventDefault();
            await onSubmit()
            }}>Submit</button>
        </div>
        </form> ) : (
        <p>Please Connect a Wallet</p> 
        )}
            
        </div>
        </>
        )
        }

export default CreateForm;