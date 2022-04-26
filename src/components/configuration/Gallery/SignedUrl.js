import React, { useState, useEffect } from 'react';
import AwsFactory from './AwsFactory';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Ban from '../../../images/ban.svg';
import Spinner from '../../../images/spinner-1.svg';

const Video = props => {
  const { videoRoot, style, className, optionalAttr } = props;

  return (
    <video style={style} className={className} {...optionalAttr}>
      <source src={videoRoot} type="video/mp4" />
      <source src={videoRoot} type={`video/mov`}></source>
      <source src={videoRoot} type={`video/webm`}></source>
    </video>
  );
};

function SignedUrl(props) {
  const {
    className,
    style,
    appData,
    unsignedUrl,
    type,
    expiry,
    optionalAttr,
    customRef,
  } = props;
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (Object.keys(appData).length > 0) {
      setUrl('');
      const getSignedUrl = a => {
        const pieces = unsignedUrl ? unsignedUrl.split('/') : ['/'];
        const bucket = pieces[0];
        const path = pieces.slice(1, pieces.length).join('/');

        new AwsFactory(a).getSignedUrl(path, expiry, bucket).then(link => {
          if (type === 'image') {
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
        });
      };
      getSignedUrl(appData);
    }
  }, [appData, expiry, type, unsignedUrl]);

  const renderTag = () => {
    switch (type) {
      case 'image':
        return (
          <LazyLoadImage
            {...optionalAttr}
            className={className}
            placeholderSrc={Spinner}
            src={url}
            alt={url}
            key={1}
            style={style}
          />
        );
      case 'video':
        return (
          url && (
            <Video
              ref={customRef}
              optionalAttr={optionalAttr}
              style={style}
              {...(className && { className })}
              videoRoot={url}
            />
          )
        );
      case 'audio':
        return (
          <audio
            className={className}
            ref={customRef}
            src={url}
            style={style}
            {...optionalAttr}
          />
        );
      default:
        return (
          <a target="_blank" rel="noopener noreferrer" href={url}>
            {props.children}
          </a>
        );
    }
  };

  return renderTag();
}

export default SignedUrl;
