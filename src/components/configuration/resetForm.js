import React, { useState, useContext } from 'react';
import apiInstance from '../../services/apiServices';
import { UserContext } from '../../contexts/UserContext';
import Loader from 'react-loader-spinner';
import helpers from '../../helpers';

function ResetForm(props) {
	const { onClose } = props;
	const userContext = useContext(UserContext);
	const [ email, setEmail ] = useState([]);
	const [ loader, setLoader ] = useState(false);

	const resetAction = () => {
		setLoader(true);
		const formdata = new FormData();
		formdata.append('email', email);

		apiInstance
			.post('/resetPassword', formdata)
			.then((response) => {
				const bool = response.data.response;
				if (bool) {
					userContext.renderToast({ message: 'Password reset details successfully mailed to you.' });
				} else {
					userContext.renderToast({
						type: 'error',
						icon: 'fa fa-times-circle',
						message: 'Password reset failed. Please check your mail is valid..'
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
				onClose();
			});
	};

	return (
		<div>
			{!loader ? (
				<div>
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
					<div className="mb-3 text-danger fst-italic">The reset details will be mailed to you.</div>
					<div className="row">
						<div className="col-lg-6">
							<div className="d-grid">
								<button onClick={() => resetAction()} className="btn btn-bni">
									Reset
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
			) : (
				<div className="login-loader">
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

export default ResetForm;
