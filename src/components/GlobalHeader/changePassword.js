import React, { useState, useContext, useEffect } from 'react';
import apiInstance from '../../services/apiServices';
import Loader from 'react-loader-spinner';
import helpers from '../../helpers';
import { UserContext } from '../../contexts/UserContext';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

function ChangePassword(props) {
	const { onClose, ...rest } = props;
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

	useEffect(
		() => {
			const conditions = [
				userName.length === 0,
				newPass.length === 0,
				repeatPass.length === 0,
				newPass !== repeatPass,
				!new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/).test(newPass),
				!new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/).test(repeatPass)
			];
			setSubmitState(conditions.some((e) => e === true));
		},
		[ newPass, repeatPass, userName ]
	);

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
				} else {
					userContext.renderToast({
						type: 'error',
						icon: 'fa fa-times-circle',
						message: 'Password change failed. In-valid credentials..'
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
			.finally(() => {
				setLoader(false);
				setNewPass('');
				setRepeatPass('');
			});
	};

	const renderCloneTooltip = (props, content, id) => {
		const Html = () =>
			content.length > 1 ? (
				<ul
					style={{
						listStyle: 'decimal',
						padding: '10px',
						textAlign: 'left',
						margin: '5px'
					}}
				>
					{content.map((c) => <li dangerouslySetInnerHTML={{ __html: c }} />)}
				</ul>
			) : (
				<div dangerouslySetInnerHTML={{ __html: content[0] }} />
			);
		return (
			<Tooltip style={{zIndex: 10000}} id={`tooltip-${id}`} className="in show" {...rest}>
				<Html key={`html-1`} />
			</Tooltip>
		);
	};

	const HelpContent = (props) => {
		const { label, id } = props;
		return (
			<OverlayTrigger placement="right" overlay={renderCloneTooltip(props, label, id)} trigger="click">
				<i className="fa fa-question-circle help text-secondary" />
			</OverlayTrigger>
		);
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
					<div className="col-12">
					<HelpContent label={[
						`Min 8 letters long`,
						`Atleast 1 Capital letter`,
						`Atleast 1 Special (!@#$%^&*) character`,
						`Atleast 1 Number`,
						`All the above criteria are required`
					]} id={1} />
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
							<div className="col-lg-6 pb-3">
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
						color={document.documentElement.style.getPropertyValue("--app-theme-bg-color")}
						height={100}
						width={100}
					/>
				</div>
			)}
		</div>
	);
}

export default ChangePassword;
