import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Ban from '../../../images/ban.svg';
import Spinner from '../../../images/spinner-1.svg';
import { FactoryMap } from './FactoryMap';
import SvgRender from './SvgRender';
import VideoRender from './VideoRender';

const getServiceProvider = (us) => {
  const pieces = us ? us.split('/') : ['/'];
  const sp = pieces[0];
  return sp;
};

const SignedUrl = (props) => {
  const {
    mykey,
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
      setFileName('');
      setExt('');
    };
  }, []);

  useEffect(() => {
    if (appData && Object.keys(appData).length > 0) {
      setUrl('');
      const getSignedUrl = () => {
        const sp = getServiceProvider(unsignedUrl);
        const getUrl = FactoryMap(sp, appData)?.library?.getSignedUrl;
        if(getUrl) {
          getUrl(unsignedUrl)
            .then(link => {
              if (type === 'image' && link.extension !== 'svg') {
                const myImage = new Image();
                myImage.src = link.url;
                myImage.onerror = e => {
                  setUrl(Ban);
                };
                myImage.onload = e => {
                  setUrl(link.url);
                };
              }
              setUrl(link.url);
              setExt(link.extension);
              setFileName(link.path);
            })
            .catch(() => {
              setUrl(Ban)
            })
        } else {
          setUrl(Ban);
          setExt('');
          setFileName('');
        }
      };
      getSignedUrl();
    }
  }, [appData, type, unsignedUrl]);

  const renderTag = () => {
    switch (type) {
      case 'image':
        return ext !== "svg" ? (
          <LazyLoadImage
            key={mykey}
            {...optionalAttr}
            className={className}
            placeholderSrc={Spinner}
            src={url}
            alt={alt}
            style={style}
            {...rest}
          />
        ) : (
          <SvgRender 
            key={mykey}
            unsignedUrl={unsignedUrl}
            className='mediaIcon'
            {...rest}
          />
        );
      case 'video':
        return (
          <VideoRender
            key={mykey}
            optionalAttr={optionalAttr}
            style={style}
            {...(className && { className })}
            url={url}
            view={view}
            type={type}
            {...rest}
          />
        );
      case 'audio':
        return (
          <VideoRender
            key={mykey}
            optionalAttr={optionalAttr}
            style={style}
            {...(className && { className })}
            url={url}
            view={view}
            type={type}
            {...rest}
            config={{
              forceAudio: true
            }}
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

export {getServiceProvider, SignedUrl};