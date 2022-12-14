import React, {useState} from 'react';

const axios = require('axios');
 
    export const Uploader = async (imageLink) => {

        const uploadImg = (imageLink) => {
            const data = new FormData();
            data.append("image", imageLink);
            const res = axios.post("https://api.imgbb.com/1/upload?expiration=600&key=66384412ba715c13288c90a042da7c79", data);
            console.log(res)
            if (res.status === 200) {
            console.log(res.data.url);
            return res.data
            } else {
                return `Error: ${res.statusText}`
            }
        };
    uploadImg(imageLink);
    }

export default Uploader;