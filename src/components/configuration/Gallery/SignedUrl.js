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
    expiry,
    optionalAttr,
    customRef,
    alt,
    view
  } = props;
  const [url, setUrl] = useState('');
  const [ext, setExt] = useState('');
  const [fileName, setFileName] = useState('');
  const galleryFactory = FactoryMap(appData).library;

  useEffect(() => {
    return () => {
      setUrl('');
    };
  }, []);

  useEffect(() => {
    if (Object.keys(appData).length > 0) {
      setUrl('');
      const getSignedUrl = a => {
        const pieces = unsignedUrl ? unsignedUrl.split('/') : ['/'];
        const bucket = pieces[0];
        const ex = pieces[pieces.length - 1].split('.').pop();
        const path = pieces.slice(1, pieces.length).join('/');

        galleryFactory
          .getSignedUrl(path, expiry, bucket)
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
      };
      getSignedUrl(appData);
    }
  }, [appData, expiry, type, unsignedUrl]);

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
          />
        ) : (
          <SvgRender 
            src={url}
            unsignedUrl={unsignedUrl}
            className='mediaIcon'
          />
        );
      case 'video':
        return (
          url && (
            <VideoRender
              ref={customRef}
              optionalAttr={optionalAttr}
              style={style}
              {...(className && { className })}
              url={url}
              view={view}
              fileName={fileName}
              type={type}
            />
          )
        );
      case 'audio':
        return (
          <VideoRender
            ref={customRef}
            optionalAttr={optionalAttr}
            style={style}
            {...(className && { className })}
            url={url}
            view={view}
            fileName={fileName}
            type={type}
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
