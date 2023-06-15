import React, { useContext, useEffect } from 'react';
import AppContext from '../../../contexts/AppContext';
import SignedUrl from '../../configuration/Gallery/SignedUrl';
import { UserContext } from '../../../contexts/UserContext';

function Thumbnail(props) {
	const { object, bucket } = props;
	const [ appData ] = useContext(AppContext);
    const userContext = useContext(UserContext);

	useEffect(
		() => {
			makeThumbnail(object);
		},
		[ JSON.stringify(object) ]
	);

	const makeThumbnail = (object) => {
		const ext = /[.]/.exec(object.url) ? /[^.]+$/.exec(object.url)[0].toLowerCase() : undefined;
		if ([ 'jpg', 'jpeg', 'tiff', 'bmp', 'png', 'gif', 'svg' ].includes(ext)) {
			return (
				<SignedUrl
					className={`img-fluid`}
					type="image"
					appData={appData}
					unsignedUrl={`${bucket}/${object.url}`}
					alt={""}
				/>
			);
		} else if ([ 'mp4', 'mov', 'webm' ].includes(ext)) {
			return (
				<SignedUrl
					className="img-fluid"
					type="video"
					view="thumbnail"
					optionalAttr={{ controls: true, playing: true, width: '100%', height: '100%'}}
					appData={appData}
					style={{lineHeight: 0}}
					unsignedUrl={`${bucket}/${object.url}`}	
				/>
			);
		} else if ([ 'mp3', 'ogg', 'wav' ].includes(ext)) {
			return (
				<SignedUrl
					className={``}
					type="audio"
					view="thumbnail"
					optionalAttr={{ controls: true, playing: true, width: "100%", height: "50px" }}
					appData={appData}
					style={{width: "-webkit-fill-available", height: "revert"}}
					unsignedUrl={`${bucket}/${object.url}`}
				/>
			);
		} else if ([ 'pdf' ].includes(ext)) {
			return (
				<SignedUrl appData={appData} unsignedUrl={`${bucket}/${object.url}`}>
					<i className={`fa fa-file-pdf-o videoIcon ${userContext.userData.theme === 'dark' ? 'bg-secondary text-light' : 'bg-light text-dark'}`} />
				</SignedUrl>
			);
		} else {
			return (
				<SignedUrl className="img-fluid" appData={appData} unsignedUrl={`${bucket}/${object.url}`}>
					<i className={`fa fa-file-o videoIcon ${userContext.userData.theme === 'dark' ? 'bg-secondary text-light' : 'bg-light text-dark'}`} />
				</SignedUrl>
			);
		}
	};

	return <div className="thumbnail-height">{makeThumbnail(object)}</div>;
}

export default Thumbnail;
