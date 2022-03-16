import React, { useState, useContext, useEffect } from 'react';
import apiInstance from '../../services/apiServices';
import { UserContext } from '../../contexts/UserContext';
import Loader from 'react-loader-spinner';
import helpers from '../../helpers';

function ResetForm(props) {
	const { onClose } = props;
	const userContext = useContext(UserContext);
	const [ email, setEmail ] = useState('');
	const [ otp, setOtp ] = useState('');
	const [ loader, setLoader ] = useState(false);
	const [ submitState, setSubmitState ] = useState(true);
	const [ sendState, setSendState ] = useState(false);
	const [ respId, setRespId ] = useState(null);
	let [ timer, setTimer ] = useState(300);

	useEffect(
		() => {
			setSubmitState(!new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/).test(email));
		},
		[ email ]
	);

	const startTimer = () => {
        if (timer === 0) {
            stopTimer(startTimer)
        } else {
            timer--;
        }
        setTimer(timer);      
        setTimeout(startTimer, 1000);
    };

	const stopTimer = () => {
        clearTimeout(startTimer)
    }


	useEffect(
		() => {
			if (sendState) {
				startTimer();
			}
		},
		[ sendState ]
	);

	const sendOtpAction = () => {
		// here otp is send
		setLoader(true);
		const formdata = new FormData();
		formdata.append('email', email);

		apiInstance
			.post('/sendOtp', formdata)
			.then((response) => {
				const userId = response.data.response;
				if (userId) {
					userContext.renderToast({ message: 'OTP successfully mailed to you..' });
					setRespId(userId);
					setSendState(true);
				} else {
					userContext.renderToast({
						type: 'error',
						icon: 'fa fa-times-circle',
						message: 'Error. Your mail is in-valid..'
					});
				}
			})
			.catch((error) => {
				userContext.renderToast({
					type: 'error',
					icon: 'fa fa-times-circle',
					message: 'Oops.. Something went wrong. Please try again..'
				});
			})
			.finally(() => {
				setLoader(false);
			});
	};

	const validateOtpAction = () => {
		// here db update is done
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
					userContext.renderToast({ message: 'Reset password successfully mailed to you..'});
					onClose();
				} else {
					userContext.renderToast({
						type: 'error',
						icon: 'fa fa-times-circle',
						message: 'Failed. OTP is in-valid or expired. Please try again..'
					});
				}
			})
			.catch((error) => {
				userContext.renderToast({
					type: 'error',
					icon: 'fa fa-times-circle',
					message: 'Oops.. Something went wrong. Please try again..'
				});
			})
			.finally(() => {
				setLoader(false);
			});
	}
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
								placeholder="Your email.."
								id="email"
							/>
							<label htmlFor="email">Your email please</label>
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
									placeholder="Type OTP"
									id="otp"
								/>
								<label htmlFor="otp">Type OTP</label>
							</div>
							<div className='pb-2'>
								<button disabled={timer > 0} onClick={() => sendOtpAction()} className="btn btn-sm btn-primary">Resend OTP</button>
							</div>
							{timer > 0 && <div className="pb-2 text-danger fst-italic">OTP expires in {timer} seconds</div>}
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
										Reset
									</button>
								) : (
									<button onClick={() => validateOtpAction()} className="btn btn-bni">
										Send
									</button>
								)}
							</div>
						</div>
						<div className="col-lg-6 py-2">
							<div className="d-grid">
								<button onClick={onClose} className="btn btn-secondary">
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="login-loader text-center py-3">
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

export default ResetForm;
