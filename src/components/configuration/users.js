import React, { useState, useContext, useEffect } from 'react';
import { userCreateForm } from '../configuration/backendTableConfig';
import ReactiveForm from './ReactiveForm';
import apiInstance from '../../services/apiServices';
import { UserContext } from '../../contexts/UserContext';
import Loader from 'react-loader-spinner';
import helpers from '../../helpers';
import md5 from 'md5';
import ConfirmationModal from './Gallery/ConfirmationModal';

function Users(props) {
	const userContext = useContext(UserContext);
	const [ formStructure, setFormStructure ] = useState(userCreateForm);
	const [ loader, setLoader ] = useState(false);
	const [ users, setUsers ] = useState([]);
	const [ requestType, setRequestType ] = useState('Create');
	const [ openModal, setOpenModal ] = useState(false);
	const [ modalUser, setModalUser ] = useState({});

	const onMassagePayload = (index, value) => {
		let backupStructure = [ ...formStructure ];
		backupStructure = backupStructure.map((backup) => {
			if (backup.id === index) {
				backup.value = value;
			}
			return backup;
		});
		setFormStructure(backupStructure);
	};

	useEffect(() => {
		fetchUsers();
		return () => {
			resetForm();
		};
	}, []);

	const editUser = (userObject) => {
		setFormStructure([]);
		let backupStructure = [ ...formStructure ];
		backupStructure = backupStructure.map((backup) => {
			backup.value = userObject.hasOwnProperty(backup.id) ? userObject[backup.id] : '';
			return backup;
		});
		setFormStructure(backupStructure);
		setRequestType('Update');
	};

	const deleteUser = (userObject) => {
		setModalUser(userObject);
		setOpenModal(true);
	};

	const handleDeteleUser = () => {
		const payload = {
			Table: 'users',
			updateData: [
				{
					user_id: modalUser.user_id,
					user_status: '0'
				}
			]
		};
		apiAction(payload, 'User successfully deleted');
	};

	const fetchUsers = () => {
		setLoader(true);
		const formdata = new FormData();
		formdata.append('TableRows', [
			'user_id',
			'user_status',
			'user_name',
			'user_display_name',
			'user_profile_name',
			'user_email',
			'user_mobile',
			'user_image_url',
			'user_type',
            'user_is_founder'
		]);
		formdata.append('Table', 'users');
		apiInstance
			.post('getBackend', formdata)
			.then((res) => {
				setUsers(res.data.response);
			})
			.catch(() =>
				userContext.renderToast({
					type: 'error',
					icon: 'fa fa-times-circle',
					message: 'Oops.. Unable to fetch users. Please try again.'
				})
			)
			.finally(() => setLoader(false));
	};

	const fetchIfUserExist = (checkUser, checkEmail) => {
		const formdata = new FormData();
		formdata.append('username', checkUser);
		formdata.append('email', checkEmail);
		return apiInstance.post('checkUserExists', formdata);
	};

	const onReactiveFormSubmit = () => {
		let payload = [ ...formStructure ].map((f) => {
			return { [f.id]: f.id === 'user_password' ? md5(f.value) : f.value };
		});
		payload = Object.assign({}, ...payload);
		const options = {
			Create: { key: 'insertData', responseString: 'User successfully created..' },
			Update: { key: 'updateData', responseString: 'User successfully updated..' }
		};

		const newPayload = {
			Table: 'users',
			[options[requestType].key]: [ payload ]
		};
        if(options[requestType].key === "insertData") {
            const instance = fetchIfUserExist(payload.user_name, payload.user_email);
            instance
                .then((res) => {
                    const flag = res.data.response;
                    if (!flag) {
                        apiAction(newPayload, options[requestType].responseString);
                    } else {
                        userContext.renderToast({
                            type: 'error',
                            icon: 'fa fa-times-circle',
                            message: 'This user already exist. Please try another user name or email..'
                        });
                    }
                })
                .catch(() =>
                    userContext.renderToast({
                        type: 'error',
                        icon: 'fa fa-times-circle',
                        message: 'Oops.. Unable to validate user. Please try again..'
                    })
                );
        } else {
            apiAction(newPayload, options[requestType].responseString);
        }
	};

	const apiAction = (newPayload, responseString) => {
		setLoader(true);
		const formdata = new FormData();
		formdata.append('postData', JSON.stringify(newPayload));
		apiInstance
			.post('/postBackend', formdata)
			.then((res) => {
				if (res.data.response) {
					resetForm();
					fetchUsers();
					userContext.renderToast({ message: responseString });
				}
			})
			.catch((e) =>
				userContext.renderToast({
					type: 'error',
					icon: 'fa fa-times-circle',
					message: 'Oops.. Something went wrong. Please try again.'
				})
			)
			.finally(() => {
				setLoader(false);
				setOpenModal(false);
			});
	};

	const resetForm = () => {
		setFormStructure([]);
		let backupStructure = [ ...formStructure ];
		backupStructure = backupStructure.map((backup) => {
			if (backup.id !== 'user_status') {
				backup.value = '';
			}
			return backup;
		});
		setFormStructure(backupStructure);
		setRequestType('Create');
	};

	return (
		<div className="container-fluid mt-3 text-dark">
			<ConfirmationModal
				show={openModal}
				confirmationstring={`Are you sure to delete user ${modalUser.user_display_name}?`}
				handleHide={() => {
					setOpenModal(false);
					setModalUser({});
				}}
				handleYes={() => handleDeteleUser()}
				size="md"
				animation={false}
			/>
			{!loader ? (
				<div className="row">
					<div className="col-md-3">
						<div className="d-flex justify-content-between align-items-center">
							<p className="">{requestType} User</p>
							{requestType !== 'Create' && (
								<button
									title="Reset"
									onClick={() => resetForm()}
									className="btn btn-sm btn-secondary rounded-circle"
								>
									<i className="fa fa-undo" />
								</button>
							)}
						</div>
						{formStructure.length && (
							<ReactiveForm
								parentClassName="reactive-form"
								structure={formStructure}
								onChange={(index, value) => onMassagePayload(index, value)}
								onSubmit={onReactiveFormSubmit}
								submitBtnLabel={requestType}
							/>
						)}
					</div>
					<div className="col-md-9">
						<p className="py-1">Users List</p>
						{users.length > 0 && <div className="table-responsive pb-3">
							<table className="table table-striped table-light table-sm">
								<thead>
									<tr>
										<th className="text-truncate">Action</th>
										<th className="text-truncate">User Name</th>
										<th className="text-truncate">Display Name</th>
										<th className="text-truncate">Profile Name</th>
										<th className="text-truncate">Email</th>
										<th className="text-truncate">Mobile</th>
										<th className="text-truncate">Image</th>
										<th className="text-truncate">Type</th>
									</tr>
								</thead>
								<tbody>
									{users.map((user, i) => (
										<tr key={i}>
											<td className="px-1 text-center">
												<i
													onClick={() => editUser(user)}
													className={`fa fa-pencil text-success cursor-pointer ${user.user_is_founder === "0" ? "pe-3" : ""}`}
												/>
												{user.user_is_founder === "0" && <i
													onClick={() => deleteUser(user)}
													className="fa fa-times text-danger cursor-pointer"
												/>}
											</td>
											<td className="text-truncate">{user.user_name}</td>
											<td className="text-truncate">{user.user_display_name}</td>
											<td className="text-truncate">{user.user_profile_name}</td>
											<td className="text-truncate">{user.user_email}</td>
											<td className="text-truncate">{user.user_mobile}</td>
											<td className="text-truncate">{user.user_image_url}</td>
											<td className="text-truncate">{user.user_type}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>}
					</div>
				</div>
			) : (
				<div className="text-center mt-100">
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

export default Users;
