import React, { useState, useEffect, useContext, useCallback } from 'react';
import ReactiveForm from './ReactiveForm';
import helpers from '../../helpers';
import apiInstance from '../../services/apiServices';
import Loader from 'react-loader-spinner';
import { UserContext } from '../../contexts/UserContext';
import AppContext from '../../contexts/AppContext';
import { masterConfig, wizardData } from '../configuration/backendTableConfig';
import Wizard from '../configuration/Wizard';

function Config(props) {
	const userContext = useContext(UserContext);
	const [ formStructure, setFormStructure ] = useState(masterConfig);
	const [ loader, setLoader ] = useState(true);

	const getBackendAjax = (Table, TableRows) => {
		const formdata = new FormData();
		formdata.append('TableRows', TableRows);
		formdata.append('Table', Table);
		return apiInstance.post('getBackend', formdata);
	};

	useEffect(() => {
		setLoader(true);
		const TableRows = formStructure.map((form) => form.index);
		getBackendAjax('login', TableRows)
			.then((r) => {
				const responseObject = r.data.response[0];
				const responseArray = Object.keys(responseObject);
				let backupStructure = [ ...formStructure ];
				// todo: password feature pending
				backupStructure = backupStructure.map((backup) => {
					if (responseArray.includes(backup.index)) {
						backup.value = responseObject[backup.index];
					}
					return backup;
				});
				setFormStructure(backupStructure);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoader(false);
			});
	}, []);

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
		let payload = [...formStructure].map(f => ({[f.id]: f.value}));
		payload = Object.assign({}, ...payload);;
		const newPayload = {
			Table: 'login',
			updateData: [payload]
		};
		const formdata = new FormData();
		formdata.append('postData', JSON.stringify(newPayload));
		apiInstance
			.post('/postBackend', formdata)
			.then((res) => {
				if (res.data.response) {
					let backupStructure = [ ...formStructure ];
					const bPayLoad = Object.keys(payload);
					backupStructure = backupStructure.map((backup) => {
						if (bPayLoad.includes(backup.index)) {
							backup.value = payload[backup.index];
						}
						return backup;
					});
					setFormStructure(backupStructure);
					userContext.renderToast({ message: 'Configurations saved successfully' });
					document.location.href = '/';
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

	return (
		<div className="py-3">
			{loader ? (
				<div className="text-center mt-100">
					<Loader
						type={helpers.LoadRandomSpinnerIcon()}
						color={helpers.fluorescentColor}
						height={100}
						width={100}
					/>
				</div>
			) : (
				<div className='container-fluid'>
					{
						<Wizard
							key={1}
							data={formStructure}
							menu={wizardData}
							onMassagePayload={onMassagePayload}
							onReactiveFormSubmit={onReactiveFormSubmit}
						/>
					}
				</div>
			)}
		</div>
	);
}
export default Config;
