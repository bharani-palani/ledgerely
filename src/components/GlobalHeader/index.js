import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../../contexts/AppContext';
import SignedUrl from '../configuration/Gallery/SignedUrl';
import { Dropdown } from 'react-bootstrap';
import Switch from 'react-switch';
import LoginUser from './loginUser';
import { socialMedias } from '../../mockData/menuData';
import { UserContext } from '../../contexts/UserContext';

function GlobalHeader(props) {
	const { onLogAction } = props;
	const myAudio = React.createRef();
	const [ appData ] = useContext(AppContext);
	const userContext = useContext(UserContext);
	const [ dropDownShown, setdropDown ] = useState(false);
	const [ audioShown, setAudioShown ] = useState(false);
	const [ videoShown, setVideoShown ] = useState(false);
	const [ downloadStatus, setDownloadStatus ] = useState(false);
	const [ social, setSocial ] = useState([]);
	const [ theme, setTheme ] = useState(userContext.userData.theme);

	const onToggleHandler = (isOpen, e) => {
		if (e.source !== 'select') {
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
			userContext.updateUserData('theme', theme);
			userContext.updateUserData('videoShown', videoShown);
		},
		[ theme, videoShown ]
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
				const soc = [ ...socialMedias ].map((s) => {
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
			<div
				className={`globalHeader d-print-none d-flex justify-content-between ${userContext.userData.theme ===
				'dark'
					? 'bg-dark'
					: 'bg-white'} fixed-top`}
			>
				<div>
					<SignedUrl
						type="image"
						appData={appData}
						unsignedUrl={appData.bannerImg}
						className="brand img-fluid"
					/>
				</div>
				<div className="text-end">
					<Dropdown show={dropDownShown} onToggle={onToggleHandler}>
						<Dropdown.Toggle as="i">
							<i className={`fa fa-th-large gIcon icon-bni`} />
						</Dropdown.Toggle>
						<Dropdown.Menu
							align="start"
							className={
								userContext.userData.theme === 'dark' ? 'bg-dark text-white-50' : 'bg-light text-black'
							}
						>
							<Dropdown.Item as="div">
								<LoginUser
									onLogAction={(o) => {
										onLogAction(o);
										setdropDown(true);
									}}
								/>
							</Dropdown.Item>
							{Boolean(Number(appData.switchSongFeatureRequired)) && (
								<Dropdown.Item
									as="div"
									onClick={() => {
										setAudioShown(!audioShown);
									}}
								>
									<div className="options">
										<div className="labelText">Music</div>
										<Switch
											onColor={'#aaa'}
											offColor={'#aaa'}
											offHandleColor={
												userContext.userData.theme === 'dark' ? '#ffffff' : '#000000'
											}
											onHandleColor={
												userContext.userData.theme === 'dark' ? '#ffffff' : '#000000'
											}
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
							)}
							{Boolean(Number(appData.switchVideoFeatureRequired)) && (
								<Dropdown.Item as="div" onClick={() => setVideoShown(!videoShown)}>
									<div className="options">
										<div className="labelText">Video</div>
										<Switch
											onColor={'#aaa'}
											offColor={'#aaa'}
											offHandleColor={
												userContext.userData.theme === 'dark' ? '#ffffff' : '#000000'
											}
											onHandleColor={
												userContext.userData.theme === 'dark' ? '#ffffff' : '#000000'
											}
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
							)}
							{Boolean(Number(appData.switchThemeFeatureRequired)) && (
								<Dropdown.Item as="div">
									<div className="options">
										<button
											className={`btn border-2 btn-sm btn-secondary`}
											onClick={() => setTheme('dark')}
										>
											<small>Dark</small>
										</button>
										<button
											className={`btn border-2 btn-sm btn-secondary`}
											onClick={() => setTheme('light')}
										>
											<small>Light</small>
										</button>
									</div>
								</Dropdown.Item>
							)}
							{Boolean(Number(appData.switchSocialMediaFeatureRequired)) &&
							social.length > 0 && (
								<Dropdown.Item as="div">
									<div className="options text-center">
										{social.map((media, i) => (
											<a
												className={
													userContext.userData.theme === 'dark' ? (
														'text-white-50'
													) : (
														'text-black-50'
													)
												}
												key={i}
												href={media.href}
												onClick={() => openBlank(media.href)}
											>
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
