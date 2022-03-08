import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../../contexts/AppContext';
import SignedUrl from '../configuration/Gallery/SignedUrl';
import { Dropdown } from 'react-bootstrap';
import Switch from 'react-switch';
import helpers from '../../helpers';
import LoginUser from './loginUser';
import { socialMedias } from '../../mockData/menuData';

function GlobalHeader(props) {
	const { onLogAction } = props;
	let myAudio = React.createRef();
	const [ appData ] = useContext(AppContext);
	const [ dropDownShown, setdropDown ] = useState(false);
	const [ audioShown, setAudioShown ] = useState(false);
	const [ videoShown, setVideoShown ] = useState(false);
	const [ downloadStatus, setDownloadStatus ] = useState(false);
	const [ social, setSocial ] = useState([]);

	const onToggleHandler = (isOpen, e, metadata) => {
		if (metadata.source !== 'select') {
			setdropDown(isOpen);
		}
		setDownloadStatus(true);
	};

	useEffect(
		() => {
			if (myAudio.current !== null) {
				if (audioShown) {
					myAudio.current.play();
				} else {
					myAudio.current.pause();
				}
			}
		},
		[ audioShown ]
	);

	useEffect(
		() => {
			if (Object.keys(appData).length > 0) {
				if (appData.bgSongDefaultPlay === '1') {
					setDownloadStatus(true);
					setTimeout(() => {
						setAudioShown(true);
					}, 5000);
				}
				setVideoShown(appData.bgVideoDefaultPlay === '1');
				const appKeys = Object.keys(appData);
				let soc = [ ...socialMedias ].map((s) => {
					if (appKeys.includes(s.id)) {
						s.href = appData[s.id];
					}
					return s;
				});
				setSocial(soc);
			}
		},
		[ appData ]
	);

	const openBlank = (url) => {
		const win = window.open(url, '_blank');
		win.focus();
	};

	return (
		<div>
			{downloadStatus && (
				<SignedUrl
					customRef={myAudio}
					className="audio"
					optionalAttr={{ autoPlay: appData.bgSongDefaultPlay === '1', loop: true, preload: 'auto' }}
					type="audio"
					appData={appData}
					unsignedUrl={appData.bgSong}
					expiry={24 * 60 * 60}
				/>
			)}
			<SignedUrl
				className="videoTag d-print-none"
				optionalAttr={{ autoPlay: true, loop: true, muted: true }}
				style={{ display: videoShown ? 'block' : 'none' }}
				type="video"
				appData={appData}
				unsignedUrl={appData.bgVideo}
				expiry={24 * 60 * 60}
			/>
			<div className="globalHeader d-print-none d-flex justify-content-between bg-black fixed-top">
				<div>
					<SignedUrl
						type="image"
						appData={appData}
						unsignedUrl={appData.bannerImg}
						className="brand img-fluid"
					/>
				</div>
				<div className="text-end">
					<Dropdown
						show={dropDownShown}
						onToggle={(isOpen, e, metadata) => onToggleHandler(isOpen, e, metadata)}
					>
						<Dropdown.Toggle as="i">
							<i className="fa fa-th-large gIcon" />
						</Dropdown.Toggle>
						<Dropdown.Menu align="start">
							<Dropdown.Item>
								<LoginUser onLogAction={(o) => {onLogAction(o); setdropDown(true)}} />
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => {
									setAudioShown(!audioShown);
								}}
							>
								<div className="options">
									<div className="labelText">Music</div>
									<Switch
										onColor={helpers.fluorescentColor}
										offColor="#000"
										offHandleColor={helpers.fluorescentColor}
										onHandleColor="#000"
										handleDiameter={15}
										checkedIcon={false}
										uncheckedIcon={false}
										height={10}
										width={40}
										onChange={() => {
											setAudioShown(!audioShown);
										}}
										checked={audioShown === true}
									/>
								</div>
							</Dropdown.Item>
							<Dropdown.Item onClick={() => setVideoShown(!videoShown)}>
								<div className="options">
									<div className="labelText">Video</div>
									<Switch
										onColor={helpers.fluorescentColor}
										offColor="#000"
										offHandleColor={helpers.fluorescentColor}
										onHandleColor="#000"
										handleDiameter={15}
										checkedIcon={false}
										uncheckedIcon={false}
										height={10}
										width={40}
										onChange={() => setVideoShown(!videoShown)}
										checked={videoShown === true}
									/>
								</div>
							</Dropdown.Item>
							{social.length > 0 && (
								<Dropdown.Item>
									<div className="options text-center">
										{social.map((media, i) => (
											<a key={i} href={media.href} onClick={() => openBlank(media.href)}>
												<i className={`${media.icon} social-icons`} />
											</a>
										))}
									</div>
								</Dropdown.Item>
							)}
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
			{props.children}
		</div>
	);
}

export default GlobalHeader;
