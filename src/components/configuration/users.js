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
    const [ modalTextUser, setModalTextUser ] = useState('')

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
        setOpenModal(true);
        // start here
    };

	const fetchUsers = () => {
		setLoader(true);
		const formdata = new FormData();
		formdata.append('TableRows', [
			'user_id',
			'user_name',
			'user_display_name',
			'user_profile_name',
			'user_email',
			'user_web',
			'user_image_url',
			'user_type'
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

    const handleDeteleUser = () => {
        // add api call here
    };

	const onReactiveFormSubmit = () => {
		setLoader(true);
		let payload = [ ...formStructure ].map((f) => {
			return { [f.id]: f.id === 'user_password' ? md5(f.value) : f.value };
		});
		payload = Object.assign({}, ...payload);
		const options = {
			Create: 'insertData',
			Update: 'updateData',
			Delete: 'deleteData'
		};
		const newPayload = {
			Table: 'users',
			[options[requestType]]: [ payload ]
		};
		const formdata = new FormData();
		formdata.append('postData', JSON.stringify(newPayload));
		apiInstance
			.post('/postBackend', formdata)
			.then((res) => {
				if (res.data.response) {
					resetForm();
					fetchUsers();
					userContext.renderToast({ message: 'User saved successfully' });
				}
			})
			.catch((e) =>
				userContext.renderToast({
					type: 'error',
					icon: 'fa fa-times-circle',
					message: 'Oops.. Something went wrong. Please try again.'
				})
			)
			.finally(() => setLoader(false));
	};

	const resetForm = () => {
		setFormStructure([]);
        let backupStructure = [ ...formStructure ];
        backupStructure = backupStructure.map((backup) => {
            backup.value = '';
            return backup;
        });
        setFormStructure(backupStructure);
        setRequestType('Create');
	};

	return (
		<div className="container-fluid mt-3">
            <ConfirmationModal
				show={openModal}
				confirmationstring={`Are you sure to delete user ${modalTextUser}?`}
				handleHide={() => {
					setOpenModal(false);
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
									className="btn btn-sm btn-primary rounded-circle"
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
						<p className="py-2">Users List</p>
						<div class="table-responsive">
							<table class="table table-striped table-light table-sm">
								<thead>
									<tr>
										<th className="text-truncate">Action</th>
										<th className="text-truncate">User Name</th>
										<th className="text-truncate">Display Name</th>
										<th className="text-truncate">Profile Name</th>
										<th className="text-truncate">Email</th>
										<th className="text-truncate">Website</th>
										<th className="text-truncate">Image</th>
										<th className="text-truncate">Type</th>
									</tr>
								</thead>
								<tbody>
									{users.map((user) => (
										<tr>
											<td className="text-truncate">
												<button
													onClick={() => editUser(user)}
													className="btn btn-sm btn-primary rounded-circle me-2"
												>
													<i className="fa fa-pencil" />
												</button>
												<button 
                                                    onClick={() => deleteUser(user)}
                                                    className="btn btn-sm btn-danger rounded-circle">
													<i className="fa fa-times" />
												</button>
											</td>
											<td className="text-truncate">{user.user_name}</td>
											<td className="text-truncate">{user.user_display_name}</td>
											<td className="text-truncate">{user.user_profile_name}</td>
											<td className="text-truncate">{user.user_email}</td>
											<td className="text-truncate">{user.user_web}</td>
											<td className="text-truncate">{user.user_image_url}</td>
											<td className="text-truncate">{user.user_type}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
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
