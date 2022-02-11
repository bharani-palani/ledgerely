import React, { useState, useContext, useEffect } from 'react'
import AppContext from "../../../contexts/AppContext";
import SignedUrl from "../../configuration/Gallery/SignedUrl";

function Thumbnail(props) {
    const {object} = props;
    const [appData] = useContext(AppContext);

    useEffect(() => {
        makeThumbnail(object);
    },[JSON.stringify(object)])

    const makeThumbnail = (object) => {
        let ext =  (/[.]/.exec(object.url)) ? /[^.]+$/.exec(object.url)[0].toLowerCase() : undefined;
        if(["jpg","jpeg","tiff","bmp","png","gif","svg"].includes(ext)) {
            return <SignedUrl className='img-responsive' type="image" appData={appData} unsignedUrl={object.url} optionalAttr={{alt: object.tag}} />
        } else if(["mp4", "mov", "webm"].includes(ext)) {
            // give expiry delay big for videos
            return <SignedUrl className='img-responsive' type="video" expiry={24*60*60} optionalAttr={{controls: true, autoPlay: false}} appData={appData} unsignedUrl={object.url} />
        } else if(["mp3", "ogg", "wav"].includes(ext)) {
            return <SignedUrl className='audioThumb' type="audio" expiry={24*60*60} optionalAttr={{controls: true, autoPlay: false}} appData={appData} unsignedUrl={object.url} />
        } else if(["pdf"].includes(ext)) {
            return <SignedUrl appData={appData} unsignedUrl={object.url}><i className="fa fa-file-pdf-o noPreview" /></SignedUrl>
        } else {
            return <SignedUrl className='img-responsive' appData={appData} unsignedUrl={object.url}><i className="fa fa-picture-o noPreview" /></SignedUrl>
        }
    }

    return (
        <div className='thumbnail-height'>
            {makeThumbnail(object)}
        </div>
    )
}

export default Thumbnail;