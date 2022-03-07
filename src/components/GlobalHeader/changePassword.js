import React, { useState, useContext, useEffect } from 'react';
import apiInstance from '../../services/apiServices';
import Loader from 'react-loader-spinner';
import helpers from '../../helpers';
import { UserContext } from '../../contexts/UserContext';

function ChangePassword(props) {
	const { onClose } = props;
	const userContext = useContext(UserContext);
	const [ userName, setUsername ] = useState('');
	const [ currentPass, setCurrentPass ] = useState('');
	const [ newPass, setNewPass ] = useState('');
	const [ repeatPass, setRepeatPass ] = useState('');
	const [ loader, setLoader ] = useState(false);
	const [ submitState, setSubmitState ] = useState(true);

	const [ CP, setCP ] = useState(false);
	const [ NP, setNP ] = useState(false);
	const [ RP, setRP ] = useState(false);

	useEffect(() => {
		setSubmitState(newPass.length === 0 || repeatPass.length === 0 || newPass !== repeatPass)
	}, [newPass, repeatPass]);

	const changeAction = () => {
		setLoader(true);
		const formdata = new FormData();
		formdata.append('userName', userName);
		formdata.append('currentPass', currentPass);
		formdata.append('newPass', newPass);
		formdata.append('repeatPass', repeatPass);

		apiInstance
			.post('/changePassword', formdata)
			.then((response) => {
				const bool = response.data.response.status;
				if (bool) {
					userContext.renderToast({ message: 'Password successfully changed..' });
					onClose();
					// todo: logout and make user to relogin
				} else {
					userContext.renderToast({
						type: 'error',
						icon: 'fa fa-times-circle',
						message: 'Password change failed. Please check your credentials'
					});
				}
			})
			.catch(() => {
				userContext.renderToast({
					type: 'error',
					icon: 'fa fa-times-circle',
					message: 'Oops.. Something went wrong. Please try again..'
				});
			})
			.finally(() => setLoader(false));
	};

	return (
		<div>
			{!loader ? (
				<div className="row">
					<div className="col-lg-12 py-2">
						<div class="form-floating">
							<input
								onChange={(e) => setUsername(e.target.value)}
								type="text"
								id="username"
								className="form-control"
							/>
							<label htmlFor="username">User name</label>
						</div>
					</div>
					<div className="col-lg-12 py-2">
						<div className="form-floating passwordArea">
							<input
								onChange={(e) => {
									setCurrentPass(e.target.value);
									setCP(true);
								}}
								type="password"
								className="form-control"
								placeholder="Current Password"
								onBlur={(e) => setCP(true)}
								id="currentPassword"
							/>
							{CP && <i className={`fa fa-${currentPass.length > 0 ? 'check good' : 'times bad'}`} />}
							<label htmlFor="currentPassword">Current Password</label>
						</div>
					</div>
					<div className="col-lg-12  py-2">
						<div className="form-floating passwordArea">
							<input
								onChange={(e) => {
									setNewPass(e.target.value);
									setNP(true);
								}}
								type="password"
								className="form-control"
								placeholder="New Password"
								onBlur={(e) => setNP(true)}
								id="newPassword"
							/>
							{NP && <i className={`fa fa-${newPass.length > 0 ? 'check good' : 'times bad'}`} />}
							<label htmlFor="newPassword">New Password</label>
						</div>
					</div>
					<div className="col-lg-12 py-2">
						<div className="form-floating passwordArea">
							<input
								onChange={(e) => {
									setRepeatPass(e.target.value);
									setRP(true);
								}}
								type="password"
								className="form-control"
								placeholder="Repeat Password"
								onBlur={(e) => setRP(true)}
								id="repeatPassword"
							/>
							{RP && (
								<i
									className={`fa fa-${repeatPass.length > 0 && repeatPass === newPass
										? 'check good'
										: 'times bad'}`}
								/>
							)}
							<label htmlFor="repeatPassword">Re-type Password</label>
						</div>
					</div>
					<div className="col-lg-12 py-2">
						<div className="row">
							<div className="col-lg-6">
								<div className="d-grid">
									<button
										disabled={submitState}
										onClick={() => changeAction()}
										className="btn btn-bni"
									>
										Submit
									</button>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="d-grid">
									<button onClick={onClose} className="btn btn-secondary">
										Cancel
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="login-loader text-center">
					<Loader
						type={helpers.LoadRandomSpinnerIcon()}
						color={helpers.fluorescentColor}
						height={100}
						width={100}
					/>
				</div>
			)}
		</div>
	);
}

export default ChangePassword;
