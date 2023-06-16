import React, { useContext, useEffect } from 'react';
import AppContext from '../../../contexts/AppContext';
import SignedUrl from '../../configuration/Gallery/SignedUrl';
import { UserContext } from '../../../contexts/UserContext';

function Thumbnail(props) {
	const { object } = props;
	const [ appData ] = useContext(AppContext);
    const userContext = useContext(UserContext);

	useEffect(
		() => {
			makeThumbnail(object);
		},
		[ JSON.stringify(object) ]
	);

	const isFile = pathname => {
		return pathname.split('/').pop().indexOf('.') > -1;
	};
	
	const makeThumbnail = (object) => {
		const ext = /[.]/.exec(object.url) ? /[^.]+$/.exec(object.url)[0].toLowerCase() : undefined;
		if ([ 'jpg', 'jpeg', 'tiff', 'bmp', 'png', 'gif', 'svg' ].includes(ext)) {
			return (
				<SignedUrl
					className={`img-fluid`}
					type="image"
					appData={appData}
					unsignedUrl={`${appData.fileStorageType}/${object.url}`}
					alt={""}
				/>
			);
		} else if ([ 'mp4', 'mov', 'webm' ].includes(ext)) {
			return (
				<SignedUrl
					className="modalVideo"
					type="video"
					view="thumbnail"
					optionalAttr={{ controls: true, playing: true, width: '100%', height: '100%'}}
					appData={appData}
					style={{lineHeight: 0}}
					unsignedUrl={`${appData.fileStorageType}/${object.url}`}	
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
					unsignedUrl={`${appData.fileStorageType}/${object.url}`}
				/>
			);
		} else if ([ 'pdf' ].includes(ext)) {
			return (
				<SignedUrl appData={appData} unsignedUrl={`${appData.fileStorageType}/${object.url}`}>
					<i className={`fa fa-file-pdf-o mediaIcon ${userContext.userData.theme === 'dark' ? 'bg-secondary text-light' : 'bg-light text-dark'}`} />
				</SignedUrl>
			);
		} else {
			return (
				<SignedUrl className="img-fluid" appData={appData} unsignedUrl={`${appData.fileStorageType}/${object.url}`}>
					<i className={`fa fa-${isFile(object.url) ? "file" : "folder"}-o mediaIcon ${userContext.userData.theme === 'dark' ? 'bg-secondary text-light' : 'bg-light text-dark'}`} />
				</SignedUrl>
			);
		}
	};

	return <div className="thumbnail-height">{makeThumbnail(object)}</div>;
}

export default Thumbnail;
