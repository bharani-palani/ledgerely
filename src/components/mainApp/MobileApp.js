import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SignedUrl from '../configuration/Gallery/SignedUrl';

const MobileApp = (props) => {
	const { menus, onNavBarToggle, navBarExpanded, ls, appData } = props;

	const isAdminLogged =
		(ls && ls.profileObj && ls.profileObj.googleId && ls.profileObj.googleId === appData.google_id) ||
		(ls && ls.profileObj && ls.userId);
		
	let adminMenu = isAdminLogged ? menus : menus.filter((menu) => menu.showOnlyIfSuperUser === false);

	adminMenu = adminMenu.sort((a, b) => (a.label > b.label ? 1 : -1));

	return (
		<div className="mobile-menu">
			{/* todo: theme setting */}
			<Navbar style={{top: "50px"}} className="bg-black py-0 ps-2 pe-3" fixed={'top'} onToggle={onNavBarToggle} expanded={navBarExpanded} expand="lg">
				<Navbar.Brand className="navbar-brand">
					<SignedUrl type="image" appData={appData} unsignedUrl={appData.logoImg} className="brand img-fluid" />
				</Navbar.Brand>
				<Navbar.Toggle style={{boxShadow: "none"}} className='p-0 pe-1 fs-2 btn text-secondary border-1' aria-controls="basic-navbar-nav" bsPrefix="navbar-toggle">
					<i className="fa fa-bars" />
				</Navbar.Toggle>
				<Navbar.Collapse>
					<ul className="header-menu">
						{adminMenu.map((menu, i) => (
							<li key={i}>
								<Link
									onClick={onNavBarToggle}
									to={menu.href}
								>
									{menu.label}
								</Link>
							</li>
						))}
					</ul>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

MobileApp.propTypes = {
	property: PropTypes.string
};
MobileApp.defaultProps = {
	property: 'String name'
};

export default MobileApp;
