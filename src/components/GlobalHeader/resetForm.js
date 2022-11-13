import React, { useState, useContext, useEffect } from 'react';
import apiInstance from '../../services/apiServices';
import { UserContext } from '../../contexts/UserContext';
import Loader from 'react-loader-spinner';
import helpers from '../../helpers';
import { FormattedMessage, useIntl } from 'react-intl';

function ResetForm(props) {
	const intl = useIntl();
	const { onClose } = props;
	const userContext = useContext(UserContext);
	const [email, setEmail] = useState('');
	const [otp, setOtp] = useState('');
	const [loader, setLoader] = useState(false);
	const [submitState, setSubmitState] = useState(true);
	const [sendState, setSendState] = useState(false);
	const [respId, setRespId] = useState(null);
	let [timer, setTimer] = useState(300);

	useEffect(
		() => {
			setSubmitState(!new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/).test(email));
		},
		[email]
	);

	const startTimer = () => {
		if (timer === 0) {
			stopTimer(startTimer);
		} else {
			timer--;
		}
		setTimer(timer);
		setTimeout(startTimer, 1000);
	};

	const stopTimer = () => {
		clearTimeout(startTimer);
	};

	useEffect(
		() => {
			if (sendState) {
				startTimer();
			}
		},
		[sendState]
	);

	const sendOtpAction = () => {
		setLoader(true);
		const formdata = new FormData();
		formdata.append('email', email);

		apiInstance
			.post('/sendOtp', formdata)
			.then((response) => {
				const userId = response.data.response;
				if (userId) {
					userContext.renderToast({ message: intl.formatMessage({ id: 'OtpSuccessfullyMailedToYou' }) });
					setRespId(userId);
					setSendState(true);
				} else {
					userContext.renderToast({
						type: 'error',
						icon: 'fa fa-times-circle',
						message: intl.formatMessage({ id: 'errorYourMailIsInValid' })
					});
				}
			})
			.catch((error) => {
				userContext.renderToast({
					type: 'error',
					icon: 'fa fa-times-circle',
					message: intl.formatMessage({ id: 'somethingWentWrong' })
				});
			})
			.finally(() => {
				setLoader(false);
			});
	};

	const validateOtpAction = () => {
		setLoader(true);
		const formdata = new FormData();
		formdata.append('otp', otp);
		formdata.append('id', respId);
		formdata.append('email', email);

		apiInstance
			.post('/resetPassword', formdata)
			.then((response) => {
				const bool = response.data.response;
				if (bool) {
					userContext.renderToast({ message: intl.formatMessage({ id: 'resetSuccess' }) });
					onClose();
				} else {
					userContext.renderToast({
						type: 'error',
						icon: 'fa fa-times-circle',
						message: intl.formatMessage({ id: 'OtpFailed' })
					});
				}
			})
			.catch((error) => {
				userContext.renderToast({
					type: 'error',
					icon: 'fa fa-times-circle',
					message: intl.formatMessage({ id: 'somethingWentWrong' })
				});
			})
			.finally(() => {
				setLoader(false);
			});
	};
	return (
		<div>
			{!loader ? (
				<div>
					{!sendState ? (
						<div className="form-floating mb-3">
							<input
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								type="email"
								className="form-control"
								placeholder={intl.formatMessage({ id: 'yourEmailPlease' })}
								id="email"
							/>
							<label htmlFor="email"><FormattedMessage id="yourEmailPlease" /></label>
						</div>
					) : (
						<div>
							<div className="form-floating mb-3">
								<input
									onChange={(e) => {
										setOtp(e.target.value);
									}}
									type="number"
									className="form-control"
									placeholder={intl.formatMessage({ id: 'enterOtp' })}
									id="otp"
								/>
								<label htmlFor="otp"><FormattedMessage id="enterOtp" /></label>
							</div>
							<div className="pb-2">
								<button
									disabled={timer > 0}
									onClick={() => sendOtpAction()}
									className="btn btn-sm btn-primary"
								>
									<FormattedMessage id="resendOtp" />
								</button>
							</div>
							{timer > 0 && (
								<div className="pb-2 text-danger fst-italic">
									<FormattedMessage id="enterOtp" values={{ seconds: timer }} />
								</div>
							)}
						</div>
					)}
					<div className="row">
						<div className="col-lg-6 py-2">
							<div className="d-grid">
								{!sendState ? (
									<button
										disabled={submitState}
										onClick={() => sendOtpAction()}
										className="btn btn-bni"
									>
										<FormattedMessage id="reset" />
									</button>
								) : (
									<button onClick={() => validateOtpAction()} className="btn btn-bni">
										<FormattedMessage id="send" />
									</button>
								)}
							</div>
						</div>
						<div className="col-lg-6 py-2">
							<div className="d-grid">
								<button onClick={onClose} className="btn btn-secondary">
									<FormattedMessage id="cancel" />
								</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="login-loader text-center py-3">
					<Loader
						type={helpers.loadRandomSpinnerIcon()}
						color={document.documentElement.style.getPropertyValue('--app-theme-bg-color')}
						height={100}
						width={100}
					/>
				</div>
			)}
		</div>
	);
}

export default ResetForm;
