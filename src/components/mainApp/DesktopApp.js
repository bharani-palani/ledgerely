import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SignedUrl from '../configuration/Gallery/SignedUrl';

const DesktopApp = (props) => {
	const { menus, ls, appData } = props;

	const isGoogleLogged =
		ls && ls.profileObj && ls.profileObj.googleId && ls.profileObj.googleId === appData.google_id;

	let googleMenu = isGoogleLogged ? menus : menus.filter((menu) => menu.showOnlyIfSuperUser === false);

	googleMenu = googleMenu.sort((a, b) => (a.label > b.label ? 1 : -1));

	return (
		<header className={`vertical-header d-print-none ${appData.webLayoutType}`}>
			<div className={`vertical-header-wrapper ${appData.webMenuType}`}>
				<nav className={`nav-menu ${appData.webMenuType} ${appData.webLayoutType}`}>
					<div className="nav-header">
						<span className="">
							<SignedUrl type="image" appData={appData} unsignedUrl={appData.logoImg} className="brand" />
						</span>
					</div>
					<ul className={`header-menu ${appData.webMenuType}`}>
						{googleMenu.map((menu, i) => (
							<li key={i}>
								<Link to={menu.href}>
									{menu.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
};

DesktopApp.propTypes = {
	property: PropTypes.string
};
DesktopApp.defaultProps = {
	property: 'String name'
};

export default DesktopApp;
