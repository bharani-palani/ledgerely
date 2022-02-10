import React, { useState, useEffect } from 'react'
import AwsFactory from "./AwsFactory";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Video from "../../mainApp/Video";

function SignedUrl(props) {
    const {className, appData, unsignedUrl, type, width, height} = props;
	const [ url, setUrl ] = useState("");

	const getSignedUrl = (a) => {
        new AwsFactory(a)
        .getSignedUrl(unsignedUrl)
        .then(link => {
            setUrl(link);
        })
        .catch(() => setUrl(""))
    }
    
	useEffect(() => {
        if(Object.keys(appData).length > 0){
            getSignedUrl(appData);
        }
    },[appData])


    const renderTag = () => {
        switch(type) {
            case "image":
               return <LazyLoadImage
                    width={width}
                    height={height}
                    className={className}
                    placeholderSrc={require("../../../images/spinner-1.svg")}
                    src={url}
                    key={1}
                />
            case "video":
                return url && <Video {...(className && {className})} videoRoot={url} />
            case "audio":
                return url && <Video {...(className && {className})} videoRoot={url} />
                default:
                return <div>unknown</div>
        }
    }

    return (
        renderTag()
    )
}

export default SignedUrl;