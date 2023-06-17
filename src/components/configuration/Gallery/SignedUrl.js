import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Ban from '../../../images/ban.svg';
import Spinner from '../../../images/spinner-1.svg';
import { FactoryMap } from './FactoryMap';
import SvgRender from './SvgRender';
import VideoRender from './VideoRender';

function SignedUrl(props) {
  const {
    className,
    style,
    unsignedUrl,
    type,
    appData,
    optionalAttr,
    alt,
    view,
    ...rest
  } = props;
  const [url, setUrl] = useState('');
  const [ext, setExt] = useState('');
  const [, setFileName] = useState('');

  useEffect(() => {
    return () => {
      setUrl('');
    };
  }, []);

  useEffect(() => {
    if (Object.keys(appData).length > 0) {
      setUrl('');
      const pieces = unsignedUrl ? unsignedUrl.split('/') : ['/'];
      const ex = pieces[pieces.length - 1].split('.').pop();
      const serviceProvider = pieces[0];
      const path = pieces.slice(1, pieces.length).join('/');

      if(serviceProvider !== "https:") {
        const getSignedUrl = () => {
          const galleryFactory = FactoryMap(serviceProvider, appData).library;
          if(galleryFactory?.getSignedUrl) {
            galleryFactory
              .getSignedUrl(path)
              .then(link => {
                if (type === 'image' && ex !== 'svg') {
                  const myImage = new Image();
                  myImage.src = link;
                  myImage.onerror = e => {
                    setUrl(Ban);
                  };
                  myImage.onload = e => {
                    setUrl(link);
                  };
                }
                setUrl(link);
              })
              .catch(() => {
                setUrl(Ban)
              })
              .finally(() => {
                setExt(ex);
                setFileName(path);
              });
          }
        };
        getSignedUrl();
      } else {
        setUrl(unsignedUrl)
        setFileName(unsignedUrl);
        setExt(null)
      }
    }
  }, [appData, type, unsignedUrl]);

  const renderTag = () => {
    switch (type) {
      case 'image':
        return ext !== "svg" ? (
          <LazyLoadImage
            {...optionalAttr}
            className={className}
            placeholderSrc={Spinner}
            src={url}
            alt={alt}
            key={1}
            style={style}
            {...rest}
          />
        ) : (
          <SvgRender 
            src={url}
            unsignedUrl={unsignedUrl}
            className='mediaIcon'
            {...rest}
          />
        );
      case 'video':
        return (
          url && (
            <VideoRender
              optionalAttr={optionalAttr}
              style={style}
              {...(className && { className })}
              url={url}
              view={view}
              type={type}
              {...rest}
            />
          )
        );
      case 'audio':
        return (
          <VideoRender
            optionalAttr={optionalAttr}
            style={style}
            {...(className && { className })}
            url={url}
            view={view}
            type={type}
            {...rest}
          />
      );
      default:
        return (
          <a target="_blank" {...(type ? {rel:"noopener noreferrer", href:url} : {})} >
            {props.children}
          </a>
        );
    }
  };

  return renderTag();
}

export default SignedUrl;
