import React, { useState, useEffect, useContext } from 'react';
import ReactiveForm from './ReactiveForm';
import helpers from '../../helpers';
import apiInstance from '../../services/apiServices';
import Loader from 'react-loader-spinner';
import { UserContext } from '../../contexts/UserContext';
import AppContext from '../../contexts/AppContext';
import { masterConfig } from '../configuration/backendTableConfig';
import Wizard from "../configuration/Wizard";

function Config(props) {
	const userContext = useContext(UserContext);
	const [ master, setMaster ] = useContext(AppContext);
	const [ formStructure, setFormStructure ] = useState(masterConfig);
	const [ loader, setLoader ] = useState(true);
	const [ payload, setPayload ] = useState({});

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
				backupStructure = backupStructure.map((backup) => {
					if (responseArray.includes(backup.index)) {
						backup.value = responseObject[backup.index];
					}
					return backup;
				});
				let payload = backupStructure.map((back) => ({ [back.index]: back.value }));
				payload = Object.assign({}, ...payload);
				setPayload(payload);
				setFormStructure(backupStructure);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => setLoader(false));
	}, []);

	const massagePayload = (index, value) => {
		const bPayload = { ...payload, [index]: value };
		setPayload(bPayload);
	};

	const onReactiveFormSubmit = () => {
		setLoader(true);
		const newPayload = {
			Table: 'login',
			updateData: [ { ...payload } ]
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
					// should refresh page to context of Config to take effectyes. 
					// should not do setMaster
					// during wizard refresh page for last submit button
					document.location.href = "/";
					// setMaster(payload);
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

	const wizardData = [
		{id: 1, label: "Account", icon: "fa fa-user"},
		{id: 2, label: "Google & Geo", icon: "fa fa-google"},
		{id: 3, label: "Address", icon: "fa fa-map-marker"},
		{id: 4, label: "Money & Locale", icon: "fa fa-inr"},
		{id: 5, label: "Web Defaults", icon: "fa fa-globe"},
		{id: 6, label: "AWS", icon: "fa fa-amazon"},
	]
	return (
		<div className="mt-15 mb-50">
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
				<div>
					<ReactiveForm
						className="reactive-form"
						structure={formStructure}
						onChange={(index, value) => massagePayload(index, value)}
						numColumns={4}
						onSubmit={() => onReactiveFormSubmit()}
						submitBtnLabel="Save"
					/>
					<Wizard data={wizardData} />
				</div>
			)}
		</div>
	);
}
export default Config;
