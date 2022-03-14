import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SignedUrl from '../configuration/Gallery/SignedUrl';
import { UserContext } from "../../contexts/UserContext";

const DesktopApp = (props) => {
	const { menus, ls, appData } = props;
	const userContext = useContext(UserContext);
	const isAdminLogged =
		(ls && ls.profileObj && ls.profileObj.googleId && ls.profileObj.googleId === appData.google_id) ||
		(ls && ls.profileObj && ls.userId);

	let adminMenu = isAdminLogged ? menus : menus.filter((menu) => menu.showOnlyIfSuperUser === false);

	adminMenu = adminMenu.sort((a, b) => (a.label > b.label ? 1 : -1));

	return (
		<header className={`vertical-header ${appData.webLayoutType}`}>
			<div className={`vertical-header-wrapper ${appData.webMenuType}`}>
				<nav className={`nav-menu ${appData.webMenuType} ${appData.webLayoutType} ${userContext.userData.theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
					<div className="nav-header">
						<span className="">
							<SignedUrl type="image" appData={appData} unsignedUrl={appData.logoImg} className="brand img-fluid" />
						</span>
					</div>
					<ul className={`header-menu ${appData.webMenuType}`}>
						{adminMenu.map((menu, i) => (
							<li key={i}>
								<Link className={userContext.userData.theme === 'dark' ? 'text-white-50' : 'text-black'} to={menu.href}>
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
