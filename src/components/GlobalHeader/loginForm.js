import React, { useState, useContext } from 'react';
import apiInstance from '../../services/apiServices';
import Loader from 'react-loader-spinner';
import helpers from '../../helpers';
import { UserContext } from '../../contexts/UserContext';

function LoginForm(props) {
	const userContext = useContext(UserContext);
	const { onToggle, onClose, onSuccess } = props;
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ passwordType, setPasswordType ] = useState(false);
	const [ loader, setLoader ] = useState(false);

	const onEnter = (e) => {
		if (e.which === 13 || e.keyCode === 13) {
			loginAction();
		}
	};

	const loginAction = () => {
		setLoader(true);
		const formdata = new FormData();
		formdata.append('username', username);
		formdata.append('password', password);

		apiInstance
			.post('/validateUser', formdata)
			.then((response) => {
				const resp = response.data.response;
				if(resp) {
					const obj = {
						userId: resp.user_id,
						type: resp.user_type,
						email: resp.user_email,
						name: resp.user_display_name,
						imageUrl: resp.user_image_url,
					};
					onSuccess(obj);
					onClose();
				} else {
					userContext.renderToast({
						type: 'error',
						icon: 'fa fa-times-circle',
						message: 'Invalid user or password'
					});
				}
			})
			.catch((error) => {
				console.log('bbb', error)
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
								onKeyDown={(e) => onEnter(e)}
								placeholder="User name"
							/>
							<label htmlFor="username">User name</label>
						</div>
					</div>
					<div className="col-lg-12 py-2">
						<div class="form-floating passwordArea">
							<input
								onChange={(e) => setPassword(e.target.value)}
								type={!passwordType ? 'password' : 'text'}
								id="userPassword"
								className="form-control"
								onKeyDown={(e) => onEnter(e)}
								placeholder="Password"
							/>
							<i
								onClick={() => setPasswordType(!passwordType)}
								className={`fa fa-${!passwordType ? 'eye' : 'eye-slash'}`}
							/>
							<label htmlFor="userPassword">Password</label>
						</div>
					</div>
					<div className="pt-3 col-lg-12 text-center">
						<div className="d-grid">
							<button onClick={() => onToggle('Change password')} className="btn btn-sm btn-primary mb-2">
								Change Password
							</button>
							<button onClick={() => onToggle('Reset password')} className="btn btn-sm btn-danger">
								Reset Password
							</button>
						</div>
					</div>
					<div className="pt-3 col-lg-12">
						<div className="row">
							<div className="col-lg-6 pb-3">
								<div className="d-grid gap-2">
									<button onClick={() => loginAction()} className="btn btn-bni">
										Submit
									</button>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="d-grid gap-2">
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

export default LoginForm;
