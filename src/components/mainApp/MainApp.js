import React, { useState, useEffect } from 'react';
import { Router } from 'react-router-dom';
import Wrapper from '../wrapper/wrapper';
import BackendUpdate from '../configuration/backendUpdate';
import { menus } from '../../mockData/menuData';
import MobileApp from './MobileApp';
import DesktopApp from './DesktopApp';
import history from '../../history';
import './MainApp.scss';

function MainApp(props) {
	const { logger } = props;
	const appData = props.appData;
	const [ navBarExpanded, setNavBarExpanded ] = useState(false);
	const [ openModal, setOpenModal ] = useState(false);
	const [ ls, setLs ] = useState(JSON.parse(localStorage.getItem('googleData')) || {});

	useEffect(
		() => {
			setLs(logger);
		},
		[ JSON.stringify(logger) ]
	);

	useEffect(
		() => {
			if (Object.keys(appData).length > 0) {
				window.addEventListener('keydown', function(event) {
					if (event.ctrlKey && event.keyCode === 66) {
						setOpenModal(true);
					}
				});
			}
		},
		[ appData ]
	);

	const onNavBarToggle = () => {
		setNavBarExpanded(!navBarExpanded);
	};

	const onNavBarClose = () => {
		setNavBarExpanded(false);
	};

	return (
		<React.Fragment>
			{Object.keys(appData).length > 0 && (
				<Router history={history}>
					<div className={`application-wrapper ${appData.webLayoutType}`}>
						<div className="overlay" />
						<div className={`application-content ${appData.webMenuType}`}>
							<div className={`menu-wrapper p-0 ${['sideMenuRight','sideMenuLeft'].includes(appData.webMenuType) ? 'col-sm-2' : ''}`}>
								<div class="fixed-content">
									{openModal && (
										<BackendUpdate
											show={openModal}
											onHide={(bool) => setOpenModal(bool)}
											size="sm"
											animation={false}
											style={{ zIndex: 9999 }}
										/>
									)}
									<DesktopApp
										menus={menus}
										appData={appData}
										ls={ls}
									/>
								</div>
								<MobileApp
									menus={menus}
									onNavBarToggle={onNavBarToggle}
									navBarExpanded={navBarExpanded}
									onNavBarClose={onNavBarClose}
									appData={appData}
									ls={ls}
								/>
							</div>
							<div
								className={`wrapper p-0 ${appData.webMenuType} ${['sideMenuRight','sideMenuLeft'].includes(appData.webMenuType) ? 'col-sm-10' : 'col-sm-12'}`}
							>
								<Wrapper />
							</div>
						</div>
						<div className="overlay" />
					</div>
				</Router>
			)}
		</React.Fragment>
	);
}

export default MainApp;
