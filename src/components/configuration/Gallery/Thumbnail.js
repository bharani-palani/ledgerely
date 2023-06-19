import React, { useContext, useEffect } from 'react';
import AppContext from '../../../contexts/AppContext';
import {SignedUrl} from '../../configuration/Gallery/SignedUrl';

function Thumbnail(props) {
	const { object } = props;
	const [ appData ] = useContext(AppContext);

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
					mykey={object.tag}
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
					mykey={object.tag}
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
					mykey={object.tag}
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
				<SignedUrl 	
					mykey={object.tag}
					appData={appData} unsignedUrl={`${appData.fileStorageType}/${object.url}`}>
					<i className={`fa fa-file-pdf-o mediaIcon bg-secondary text-light`} />
				</SignedUrl>
			);
		} else {
			return (
				<SignedUrl 
					mykey={object.tag}
					className="img-fluid" appData={appData} unsignedUrl={`${appData.fileStorageType}/${object.url}`}>
					<i className={`fa fa-${isFile(object.url) ? "file" : "folder"}-o mediaIcon bg-secondary text-light`} />
				</SignedUrl>
			);
		}
	};

	return <div className="thumbnail-height">{makeThumbnail(object)}</div>;
}

export default Thumbnail;
