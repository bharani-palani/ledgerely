import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SignedUrl from '../configuration/Gallery/SignedUrl';
import { UserContext } from "../../contexts/UserContext";

const DesktopApp = (props) => {
	const { menu, appData } = props;
	const userContext = useContext(UserContext);

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
						{menu.map((m, i) => (
							<li key={i}>
								<Link className={userContext.userData.theme === 'dark' ? 'text-white-50' : 'text-black'} to={{pathname: m.href, state: m.page_object}}>
									{m.label}
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
