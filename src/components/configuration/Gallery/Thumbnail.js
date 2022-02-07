import React, { useState, useContext, useEffect } from 'react'
import AwsFactory from "./AwsFactory";
import AppContext from "../../../contexts/AppContext";

function Thumbnail(props) {
    const [appData] = useContext(AppContext);
    const {object} = props;
    const [signedUrl, setSignedUrl] = useState("");
    const getSignedUrl = () => {
        new AwsFactory(appData)
        .getSignedUrl(object.url)
        .then(d => setSignedUrl(d))
    }

    useEffect(() => {
        getSignedUrl();
        return () => {
            setSignedUrl("")
        }
    },[JSON.stringify(object)])

    const makeThumbnail = (object) => {
        let ext =  (/[.]/.exec(object.url)) ? /[^.]+$/.exec(object.url)[0].toLowerCase() : undefined;
        if(["jpg","jpeg","tiff","bmp","png","gif","svg"].includes(ext)) {
            return <img src={signedUrl} alt={object.ETag} className='img-responsive' />
        } else if(["mp4", "mov", "webm"].includes(ext)) {
            return <video className='img-responsive' controls>
            <source src={signedUrl} type={`video/mp4`}></source>
            <source src={signedUrl} type={`video/mov`}></source>
            <source src={signedUrl} type={`video/webm`}></source>
          </video>
      
        } else {
            return <div>unknown</div>
        }
    }

    return (
        <div className='thumbnail-height'>
            {signedUrl && makeThumbnail(object)}
        </div>
    )
}

export default Thumbnail;