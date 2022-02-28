import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SignedUrl from '../configuration/Gallery/SignedUrl';

const MobileApp = (props) => {
	const { menus, onNavBarToggle, navBarExpanded, ls, appData } = props;

	const isGoogleLogged =
		ls && ls.profileObj && ls.profileObj.googleId && ls.profileObj.googleId === appData.google_id;
	let googleMenu = isGoogleLogged ? menus : menus.filter((menu) => menu.showOnlyIfSuperUser === false);

	googleMenu = googleMenu.sort((a, b) => (a.label > b.label ? 1 : -1));

	return (
		<div className="mobile-menu d-print-none">
			{/* todo: theme setting */}
			{/* fixed={'top'} bg="dark" */}
			<Navbar onToggle={onNavBarToggle} expanded={navBarExpanded} expand="lg">
				<Navbar.Brand className="navbar-brand">
					<SignedUrl type="image" appData={appData} unsignedUrl={appData.logoImg} className="brand" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" bsPrefix="navbar-toggle">
					<i className="fa fa-bars" />
				</Navbar.Toggle>
				<Navbar.Collapse>
					<ul className="header-menu">
						{googleMenu.map((menu, i) => (
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
