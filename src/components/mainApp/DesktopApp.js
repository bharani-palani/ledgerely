import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SignedUrl from "../configuration/Gallery/SignedUrl";

const DesktopApp = (props) => {
	const {
		menus,
		socialMedias,
		ls,
		openBlank,
		setToggleSideBar,
		toggleSideBar,
		appData
	} = props;

	const toggleStyle = () => {
		return toggleSideBar ? { display: 'none' } : { display: 'block' };
	};

	const isGoogleLogged =
		ls && ls.profileObj && ls.profileObj.googleId && ls.profileObj.googleId === appData.google_id;

	let googleMenu = isGoogleLogged ? menus : menus.filter((menu) => menu.showOnlyIfSuperUser === false);

	googleMenu = googleMenu.sort((a, b) => (a.label > b.label ? 1 : -1));

	return (
		<header className="vertical-header hidden-print">
				<i
					onClick={() => setToggleSideBar(!toggleSideBar)}
					className={`fa ${toggleSideBar
						? 'fa-angle-double-right dToggleIcon collapsed'
						: 'fa-angle-double-left dToggleIcon open'}`}
				/>
			<div style={toggleStyle()} className="vertical-header-wrapper slideRight">
				<nav className="nav-menu">
					<ul className="nav-header">
						<li className="p-5">
							<SignedUrl type="image" appData={appData} unsignedUrl={appData.logoImg} className="brand" />
						</li>
					</ul>
					<ul className="primary-menu">
						{googleMenu.map((menu, i) => (
							<li
								key={i}
								className={`child-menu ${i === googleMenu.length - 1 ? 'last-child-menu' : ''}`}
							>
								<Link className={menu.showOnlyIfSuperUser ? 'admin' : ''} to={menu.href}>
									{menu.label}
								</Link>
							</li>
						))}
					</ul>
					<div className="menu-social">
						<ul className="list-inline text-center pb-10">
							{socialMedias.map((media, i) => (
								<li key={i}>
									<Link to="" onClick={() => openBlank(media.href)}>
										<i className={media.icon} />
									</Link>
								</li>
							))}
						</ul>
						{/* <div className="text-center designedBy">
							Design and development by{' '}
							<a className="normalLink" href={'mailto:barani.potshot@gmail.com'}>
								Bharani
							</a>
						</div> */}
					</div>
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
