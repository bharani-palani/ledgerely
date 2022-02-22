import React, { useState, useEffect } from 'react'
import AwsFactory from "./AwsFactory";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Video from "../../mainApp/Video";

function SignedUrl(props) {
    const {className, style, appData, unsignedUrl, type, expiry, optionalAttr, customRef} = props;
	const [ url, setUrl ] = useState("");

	const getSignedUrl = (a) => {
        const pieces = unsignedUrl.split("/");
        let bucket = pieces[0];
        const path = unsignedUrl.split("/").slice(1, unsignedUrl.split("/").length).join("/")

        new AwsFactory(a)
        .getSignedUrl(path, expiry, bucket)
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
                    {...optionalAttr}
                    className={className}
                    placeholderSrc={require("../../../images/spinner-1.svg")}
                    src={url}
                    key={1}
                />
            case "video":
                return url && <Video ref={customRef} optionalAttr={optionalAttr} style={style} {...(className && {className})} videoRoot={url} />
            case "audio":
                return <audio
                className={className}
                ref={customRef}
                src={url}
                {...optionalAttr}
              />
            default:
                return <a target="_blank" rel="noopener noreferrer" href={url}>{props.children}</a>;
        }
    }

    return (
        renderTag()
    )
}

export default SignedUrl;