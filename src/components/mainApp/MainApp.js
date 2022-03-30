import React, { useState, useEffect, useContext } from 'react';
import { Router } from 'react-router-dom';
import Wrapper from '../wrapper/wrapper';
// import { menus } from '../../mockData/menuData';
import MobileApp from './MobileApp';
import DesktopApp from './DesktopApp';
import history from '../../history';
import { UserContext } from '../../contexts/UserContext';
import apiInstance from '../../services/apiServices';

function MainApp(props) {
	const userContext = useContext(UserContext);
	const appData = props.appData;
	const [ navBarExpanded, setNavBarExpanded ] = useState(false);
	const [ menu, setMenu ] = useState([]);

	useEffect(
		() => {
			apiInstance
				.post('/getPages')
				.then((res) => {
					let serialisedMenu = res.data.response.filter((menu) =>
						menu.hasAccessTo.includes(userContext.userData.type)
					);
					serialisedMenu = serialisedMenu.sort((a, b) => (a.label > b.label ? 1 : -1));
					setMenu(serialisedMenu);
				})
				.catch(() => {
					setMenu([]);
					userContext.renderToast({
						type: 'error',
						icon: 'fa fa-times-circle',
						message: 'Oops.. Unable to fetch menu. Please try again.'
					});
				});
		},
		[ JSON.stringify(userContext.userData) ]
	);

	const onNavBarToggle = () => {
		setNavBarExpanded(!navBarExpanded);
	};

	const onNavBarClose = () => {
		setNavBarExpanded(false);
	};

	return (
		<React.Fragment>
			{Object.keys(appData).length > 0 &&
			menu.length > 0 && (
				<Router history={history}>
					<div
						className={`application-wrapper ${appData.webLayoutType} ${userContext.userData.theme === 'dark'
							? 'bg-dark'
							: 'bg-light'}`}
					>
						<div className="" />
						<div className={`application-content ${appData.webMenuType}`}>
							<div
								className={`menu-wrapper d-print-none p-0 ${[
									'sideMenuRight',
									'sideMenuLeft'
								].includes(appData.webMenuType)
									? 'col-sm-2'
									: ''}`}
							>
								<div className="fixed-content">
									<DesktopApp menu={menu} appData={appData} />
								</div>
								<MobileApp
									menu={menu}
									onNavBarToggle={onNavBarToggle}
									navBarExpanded={navBarExpanded}
									onNavBarClose={onNavBarClose}
									appData={appData}
								/>
							</div>
							<div
								style={{ opacity: userContext.userData.videoShown ? 0.9 : 1 }}
								className={`wrapper ${appData.webLayoutType} ${userContext.userData.theme === 'dark'
									? 'bg-dark text-light'
									: 'bg-light text-dark'} p-0 ${appData.webMenuType} ${[
									'sideMenuRight',
									'sideMenuLeft'
								].includes(appData.webMenuType)
									? 'col-sm-10'
									: 'col-sm-12'}`}
							>
								<Wrapper menu={menu} />
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
