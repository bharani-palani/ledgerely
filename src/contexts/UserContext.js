import React, { createContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export const UserContext = createContext([ {}, () => {} ]);

function UserContextProvider(props) {
	const { config } = props;
	const [ userData, setUserData ] = useState({});
	// note: to set default on page load ls is required
	const ls = JSON.parse(localStorage.getItem('userData')) || {};

	const addUserData = (response) => {
		setUserData({ ...response, ...userData });
	};

	const updateUserData = (key, object) => {
		setUserData((prev) => ({ ...prev, [key]: object }));
	};

	const removeUserData = (keyArray) => {
		let copiedUserData = { ...userData };
		keyArray.forEach((key) => {
			delete copiedUserData[key];
		});
		setUserData((userData) => ({ ...copiedUserData }));
	};

	useEffect(() => {
		addUserData(JSON.parse(localStorage.getItem('userData')));
		updateUserData('theme', '');
	}, []);

	useEffect(
		() => {
			updateUserData('theme', config.webTheme);
			updateUserData('type', !ls.type ? 'public' : ls.type);
		},
		[ config ]
	);

	const renderToast = ({ autoClose = 5000, type = 'success', icon = 'fa fa-check-circle', message }) =>
		toast[type](
			<div>
				<span>
					<i className={icon} /> <span dangerouslySetInnerHTML={{ __html: message }} />
				</span>
			</div>,
			{
				autoClose
			}
		);

	const OffCanvas = () => {
		return (
			<div>
				<div className={`offcanvas offcanvas-end`} id="offcanvasSelector">
					<div className="offcanvas-header">
						<h5 className="offcanvas-title">Offcanvas</h5>
						<button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" />
					</div>
					<div className="offcanvas-body">
						{123}
					</div>
				</div>
			</div>
		);
	};

	const renderOffcanvasBtn = ({btnLabel, children}) => {
		return (
			<div>
				<button
					className="btn btn-primary"
					type="button"
					data-bs-toggle="offcanvas"
					data-bs-target="#offcanvasSelector"
				>
					{btnLabel}
				</button>
			</div>
		);
	};

	return (
		<UserContext.Provider
			value={{
				userData,
				addUserData,
				updateUserData,
				removeUserData,
				renderToast,
				renderOffcanvasBtn
			}}
		>
			<OffCanvas />
			<ToastContainer className="bniToaster" />
			{Object.keys(userData).length > 0 && props.children}
		</UserContext.Provider>
	);
}

export default UserContextProvider;
