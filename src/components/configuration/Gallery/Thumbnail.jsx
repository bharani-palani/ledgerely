import React, { useContext, useEffect } from "react";
import { SignedUrl } from "../../configuration/Gallery/SignedUrl";
import { GlobalContext } from "../../../contexts/GlobalContext";

function Thumbnail(props) {
  const { object } = props;
  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    makeThumbnail(object);
  }, [JSON.stringify(object)]);

  const isFile = pathname => {
    return pathname.split("/").pop().indexOf(".") > -1;
  };

  const makeThumbnail = object => {
    const ext = /[.]/.exec(object.url)
      ? /[^.]+$/.exec(object.url)[0].toLowerCase()
      : undefined;
    if (["jpg", "jpeg", "tiff", "bmp", "png", "gif", "svg"].includes(ext)) {
      return (
        <SignedUrl
          mykey={object.tag}
          className={`img-fluid`}
          type='image'
          appData={globalContext}
          unsignedUrl={`${globalContext.fileStorageType}/${object.url}`}
          alt={""}
        />
      );
    } else if (["mp4", "mov", "webm"].includes(ext)) {
      return (
        <SignedUrl
          mykey={object.tag}
          className='modalVideo'
          type='video'
          view='thumbnail'
          optionalAttr={{
            controls: true,
            playing: true,
            width: "100%",
            height: "100%",
          }}
          appData={globalContext}
          style={{ lineHeight: 0 }}
          unsignedUrl={`${globalContext.fileStorageType}/${object.url}`}
        />
      );
    } else if (["mp3", "ogg", "wav"].includes(ext)) {
      return (
        <SignedUrl
          mykey={object.tag}
          className={``}
          type='audio'
          view='thumbnail'
          optionalAttr={{
            controls: true,
            playing: true,
            width: "100%",
            height: "50px",
          }}
          appData={globalContext}
          style={{ width: "-webkit-fill-available", height: "revert" }}
          unsignedUrl={`${globalContext.fileStorageType}/${object.url}`}
        />
      );
    } else if (["pdf"].includes(ext)) {
      return (
        <SignedUrl
          mykey={object.tag}
          appData={globalContext}
          unsignedUrl={`${globalContext.fileStorageType}/${object.url}`}
        >
          <i className={`fa fa-file-pdf-o mediaIcon bg-secondary text-light`} />
        </SignedUrl>
      );
    } else {
      return (
        <SignedUrl
          mykey={object.tag}
          className='img-fluid'
          appData={globalContext}
          unsignedUrl={`${globalContext.fileStorageType}/${object.url}`}
        >
          <i
            className={`fa fa-${
              isFile(object.url) ? "file" : "folder"
            }-o mediaIcon bg-secondary text-light`}
          />
        </SignedUrl>
      );
    }
  };

  return <div className='thumbnail-height'>{makeThumbnail(object)}</div>;
}

export default Thumbnail;
