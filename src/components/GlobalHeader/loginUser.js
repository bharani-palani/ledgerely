import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';
import AppContext from '../../contexts/AppContext';
import { UserContext } from '../../contexts/UserContext';
import ConfirmationModal from '../configuration/Gallery/ConfirmationModal';
import AdminLogin from './adminLogin';
import SignedUrl from '../configuration/Gallery/SignedUrl';

const LoginUser = (props) => {
	const { onLogAction } = props;
	const userContext = useContext(UserContext);
	const [ appData ] = useContext(AppContext);
	const [ ls, setLs ] = useState(JSON.parse(localStorage.getItem('googleData')) || {});
	const [ animateType, setAnimateType ] = useState('');
	const [ openModal, setOpenModal ] = useState(false); // change to false
	const [ openAppLoginModal, setOpenAppLoginModal ] = useState(false); // change to false

	/*
    Bounce types available @
    https://github.com/animate-css/animate.css/tree/a8d92e585b1b302f7749809c3308d5e381f9cb17
    */

	const responseGoogle = (response) => {
		setLs(response);
		localStorage.setItem('googleData', JSON.stringify(response));
		userContext.updateUserData(response);
		onLogAction(response);
		setAnimateType('slideInRight');
	};

	const errorGoogle = () => {
		userContext.renderToast({
			type: 'error',
			icon: 'fa fa-times-circle',
			message: 'Unable to fetch from Google API'
		});
	};

	const onLogout = () => {
		setLs({});
		userContext.removeUserData();
		localStorage.removeItem('googleData');
		onLogAction({});
		setOpenModal(false);
	};

	const onLogoutInit = (id) => {
		setOpenModal(true);
	};

	return (
		<React.Fragment>
			{openAppLoginModal && (
				<AdminLogin
					show={openAppLoginModal}
					size="sm"
					animation={false}
					style={{ zIndex: 9999 }}
					onClose={() => setOpenAppLoginModal(false)}
					onSuccess={responseGoogle}
				/>
			)}
			<ConfirmationModal
				show={openModal}
				confirmationstring={`Are you sure to logout this session?`}
				handleHide={() => {
					setOpenModal(false);
				}}
				handleYes={() => onLogout()}
				size="md"
				animation={false}
			/>
			{Object.keys(ls).length > 0 ? (
				<div className={`d-print-none animate__animated animate__${animateType}`}>
					<div className="options welcomeText">Welcome</div>
					<div className="options">
						<div className="welcomeText pb-10">{ls.profileObj.name}</div>
					</div>
					<div className="options pt-3">
						{ls.profileObj.imageUrl && (
							<img
								className="userImage"
								alt="userImage"
								src={ls.profileObj.imageUrl || require('../../images/spinner-1.svg')}
							/>
						)}
						{ls.profileObj.appImageUrl && (
							<SignedUrl
								type="image"
								appData={appData}
								unsignedUrl={ls.profileObj.appImageUrl}
								className="userImage"
							/>
						)}
						<div className="">
							<i title="Logout" onClick={onLogoutInit} className="fa fa-sign-out logout" />
						</div>
					</div>
				</div>
			) : (
				<div className="options">
					<div className="labelText">Log In</div>
					<div className="google">
						<GoogleLogin
							clientId={appData.google_login_auth_token}
							buttonText=""
							onSuccess={responseGoogle}
							onFailure={errorGoogle}
							cookiePolicy={'single_host_origin'}
						/>
					</div>
					<div>
						<button onClick={() => setOpenAppLoginModal(true)} className="btn btn-light rounded-circle">
							<i className="fa fa-sign-in" />
						</button>
					</div>
				</div>
			)}
		</React.Fragment>
	);
};

LoginUser.propTypes = {
	toggleSideBar: PropTypes.bool,
	userData: PropTypes.object
};
LoginUser.defaultProps = {};

export default LoginUser;