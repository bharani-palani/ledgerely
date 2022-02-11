import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../../contexts/AppContext';
import SignedUrl from "../configuration/Gallery/SignedUrl";
import { Dropdown } from "react-bootstrap";
import Switch from "react-switch";
import helpers from "../../helpers";

function GlobalHeader(props) {
	let myAudio = React.createRef();

	const [ appData ] = useContext(AppContext);
	const [dropDownShown, setdropDown] = useState(false);
	const [audioShown, setAudioShown] = useState(false);
	const [videoShown, setVideoShown] = useState(true);
	const [downloadStatus, setDownloadStatus] = useState(false);

  
	const onToggleHandler = (isOpen, e, metadata) => {
		if  (metadata.source !== 'select') {
			setdropDown(isOpen);
		}
		setDownloadStatus(true);
	}
	
	useEffect(() => {
		if(myAudio.current !== null){
			if(audioShown){
				myAudio.current.play();
			} else {
				myAudio.current.pause();
			}
		}
	}, [audioShown])

	return (
		<div>
			{downloadStatus && <SignedUrl 
				customRef={myAudio}
				className="audio" 
				optionalAttr={{ loop:true, preload:"auto"}} 
				type="audio" 
				appData={appData} 
				unsignedUrl={appData.bgSong} 
				expiry={24*60*60}
			/>}
			<SignedUrl 
				className="videoTag hidden-print" 
				optionalAttr={{autoPlay: true, loop:true}} 
				style={{display: videoShown ? "block" : "none"}} 
				type="video" 
				appData={appData} 
				unsignedUrl={appData.bgVideo} 
				expiry={24*60*60}
			/>
			<div className="globalHeader hidden-print">
				<div>
					<a href="/">
						<SignedUrl type="image" appData={appData} unsignedUrl={appData.logoImg} className="brand" />
					</a>
				</div>
				<div className="text-right">
					<Dropdown
						show={dropDownShown}
						onToggle={(isOpen, e, metadata) => onToggleHandler(isOpen, e, metadata)}
					>
						<Dropdown.Toggle as="i">
							<i className="fa fa-th-large gIcon" />
						</Dropdown.Toggle>
						<Dropdown.Menu align="start">
							<Dropdown.Item onClick={() => {setAudioShown(!audioShown);}}>
								<div className='options'>
									<div>Music</div>
									<Switch
										onColor={helpers.fluorescentColor}
										offColor="#333"
										checkedIcon={false}
										uncheckedIcon={false}
										height={15}
										width={35}
										onChange={() => {setAudioShown(!audioShown);}}
										checked={audioShown === true}
									/>

								</div>
							</Dropdown.Item>
							<Dropdown.Item onClick={() => setVideoShown(!videoShown)}>
								<div className='options'>
									<div>Video</div>
									<Switch
										onColor={helpers.fluorescentColor}
										offColor="#333"
										checkedIcon={false}
										uncheckedIcon={false}
										height={15}
										width={35}
										onChange={() => setVideoShown(!videoShown)}
										checked={videoShown === true}
									/>

								</div>
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
			{props.children}
		</div>
	);
}

export default GlobalHeader;
