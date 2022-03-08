import React, { useState, useContext } from 'react';
import { userCreateForm } from '../configuration/backendTableConfig';
import ReactiveForm from './ReactiveForm';
import apiInstance from '../../services/apiServices';
import { UserContext } from '../../contexts/UserContext';
import Loader from 'react-loader-spinner';
import helpers from '../../helpers';
import md5 from 'md5';

function Users(props) {
	const userContext = useContext(UserContext);
	const [ formStructure, setFormStructure ] = useState(userCreateForm);
	const [ loader, setLoader ] = useState(false);
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

	const onReactiveFormSubmit = () => {
        setLoader(true);
		let payload = [ ...formStructure ].map((f) => {
            return { [f.id]: f.id === "user_password" ? md5(f.value) : f.value }
        });
		payload = Object.assign({}, ...payload);
		const newPayload = {
			Table: 'users',
			insertData: [ payload ]
		};
		const formdata = new FormData();
		formdata.append('postData', JSON.stringify(newPayload));
		apiInstance
			.post('/postBackend', formdata)
			.then((res) => {
				if (res.data.response) {
					resetForm();
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
		setTimeout(() => {
			let backupStructure = [ ...formStructure ];
			backupStructure = backupStructure.map((backup) => {
				backup.value = '';
				return backup;
			});
			setFormStructure(backupStructure);
		}, 100);
	};

	return (
		<div className="container-fluid">
			<h3 className="py-2">Handle users</h3>
			{!loader ? (
				<div className="row">
					<div className="col-md-3">
						{formStructure.length && (
							<ReactiveForm
								parentClassName="reactive-form"
								structure={formStructure}
								onChange={(index, value) => onMassagePayload(index, value)}
								onSubmit={onReactiveFormSubmit}
							/>
						)}
					</div>
					<div className="col-md-9">List form</div>
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
