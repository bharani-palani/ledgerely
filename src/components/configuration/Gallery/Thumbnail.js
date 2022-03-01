import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../../../contexts/AppContext';
import SignedUrl from '../../configuration/Gallery/SignedUrl';

function Thumbnail(props) {
	const { object, bucket } = props;
	const [ appData ] = useContext(AppContext);

	useEffect(
		() => {
			makeThumbnail(object);
		},
		[ JSON.stringify(object) ]
	);

	const makeThumbnail = (object) => {
		let ext = /[.]/.exec(object.url) ? /[^.]+$/.exec(object.url)[0].toLowerCase() : undefined;
		if ([ 'jpg', 'jpeg', 'tiff', 'bmp', 'png', 'gif', 'svg' ].includes(ext)) {
			return (
				<SignedUrl
					className="img-fluid"
					type="image"
					appData={appData}
					unsignedUrl={`${bucket}/${object.url}`}
					optionalAttr={{ alt: object.tag }}
				/>
			);
		} else if ([ 'mp4', 'mov', 'webm' ].includes(ext)) {
			return (
				<SignedUrl
					className="img-fluid"
					type="video"
					optionalAttr={{ controls: true, autoPlay: false }}
					appData={appData}
					unsignedUrl={`${bucket}/${object.url}`}
				/>
			);
		} else if ([ 'mp3', 'ogg', 'wav' ].includes(ext)) {
			return (
				<SignedUrl
					className="audioThumb"
					type="audio"
					optionalAttr={{ controls: true, autoPlay: false }}
					appData={appData}
					unsignedUrl={`${bucket}/${object.url}`}
				/>
			);
		} else if ([ 'pdf' ].includes(ext)) {
			return (
				<SignedUrl appData={appData} unsignedUrl={`${bucket}/${object.url}`}>
					<i className="fa fa-file-pdf-o noPreview" />
				</SignedUrl>
			);
		} else {
			return (
				<SignedUrl className="img-fluid" appData={appData} unsignedUrl={`${bucket}/${object.url}`}>
					<i className="fa fa-picture-o noPreview" />
				</SignedUrl>
			);
		}
	};

	return <div className="thumbnail-height">{makeThumbnail(object)}</div>;
}

export default Thumbnail;
