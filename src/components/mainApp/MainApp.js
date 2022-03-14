import React, { useState, useEffect, useContext } from 'react';
import { Router } from 'react-router-dom';
import Wrapper from '../wrapper/wrapper';
import { menus } from '../../mockData/menuData';
import MobileApp from './MobileApp';
import DesktopApp from './DesktopApp';
import history from '../../history';
import { UserContext } from "../../contexts/UserContext";

function MainApp(props) {
	const { logger } = props;
	const userContext = useContext(UserContext);
	const appData = props.appData;
	const [ navBarExpanded, setNavBarExpanded ] = useState(false);
	const [ ls, setLs ] = useState(JSON.parse(localStorage.getItem('googleData')) || {});

	useEffect(
		() => {
			setLs(logger);
		},
		[ JSON.stringify(logger) ]
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
					<div className={`application-wrapper ${appData.webLayoutType} ${userContext.userData.theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
						<div className="" />
						<div className={`application-content ${appData.webMenuType}`}>
							<div className={`menu-wrapper d-print-none p-0 ${['sideMenuRight','sideMenuLeft'].includes(appData.webMenuType) ? 'col-sm-2' : ''}`}>
								<div className="fixed-content">
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
								className={`wrapper ${appData.webLayoutType} ${userContext.userData.theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'} p-0 ${appData.webMenuType} ${['sideMenuRight','sideMenuLeft'].includes(appData.webMenuType) ? 'col-sm-10' : 'col-sm-12'}`}
							>
								<Wrapper />
							</div>
						</div>
						<div className="" />
					</div>
				</Router>
			)}
		</React.Fragment>
	);
}

export default MainApp;
