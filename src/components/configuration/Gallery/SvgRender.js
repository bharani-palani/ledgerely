import React, { useEffect, useState, useContext } from "react";
import { FactoryMap } from "./FactoryMap";
import { getServiceProvider } from "./SignedUrl";
import { GlobalContext } from "../../../contexts/GlobalContext";

const SvgRender = props => {
  const globalContext = useContext(GlobalContext);
  const { unsignedUrl, className } = props;
  const [element, setElement] = useState("");

  const pieces = unsignedUrl ? unsignedUrl.split("/") : ["/"];
  const path = pieces.slice(1, pieces.length).join("/");
  const sp = getServiceProvider(unsignedUrl);
  const galleryFactory = FactoryMap(sp, globalContext)?.library?.fetchStream(
    path,
  );

  useEffect(() => {
    if (galleryFactory) {
      galleryFactory
        .then(ele => {
          setElement(ele);
        })
        .catch(() => {
          setElement(false);
        });
    } else {
      setElement(false);
    }
  });

  return (
    element && (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: element }}
      ></div>
    )
  );
};

export default SvgRender;
