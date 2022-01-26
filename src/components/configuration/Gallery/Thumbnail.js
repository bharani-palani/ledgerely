import React, { useState, useContext, useEffect } from 'react'
import AwsFactory from "./AwsFactory";
import AppContext from "../../../contexts/AppContext";

function Thumbnail(props) {
    const [appData] = useContext(AppContext);
    const {object} = props;
    const [signedUrl, setSignedUrl] = useState("");

    const getSignedUrl = () => {
        new AwsFactory(appData)
        .loadImage(object.url)
        .then(d => setSignedUrl(d))
    }

    useEffect(() => {
        getSignedUrl();
    },[JSON.stringify(object)])

    const makeThumbnail = (object) => {
        let ext =  (/[.]/.exec(object.url)) ? /[^.]+$/.exec(object.url)[0].toLowerCase() : undefined;
        if(["jpg","png","gif","jpeg", "svg"].includes(ext)) {
            return <img src={signedUrl} alt={object.ETag} className='img-responsive' />
        } else if(["mp4", "mov"].includes(ext)) {
            return <video className='img-responsive' name="media" controls autoplay>
            <source src={signedUrl} type="video/mp4"></source>
          </video>
      
        } else {
            return <div>unknown</div>
        }
    }

    return (
        <div style={{margin: "auto"}}>
            {makeThumbnail(object)}
        </div>
    )
}

export default Thumbnail;