import React, { useState, useEffect, useContext } from 'react';
import ReactiveForm from './ReactiveForm';
import helpers from '../../helpers';
import apiInstance from '../../services/apiServices';
import Loader from 'react-loader-spinner';
import { UserContext } from '../../contexts/UserContext';
import AppContext from '../../contexts/AppContext';
import { masterConfig } from '../configuration/backendTableConfig';
import Wizard from '../configuration/Wizard';

function Config(props) {
	const userContext = useContext(UserContext);
	const [ master, setMaster ] = useContext(AppContext);
	const [ formStructure, setFormStructure ] = useState(masterConfig);
	const [ loader, setLoader ] = useState(true);
	const [ payload, setPayload ] = useState({});
	const [ wizardData, setWizardData ] = useState([
		{
			id: 0,
			label: 'Account',
			icon: 'fa fa-user',
			form: masterConfig.filter((f) =>
				[ 'user_name', 'display_name', 'profile_name', 'user_mobile', 'user_mail', 'user_web' ].includes(f.id)
			)
		},
		{
			id: 1,
			label: 'Google & Geo',
			icon: 'fa fa-google',
			form: masterConfig.filter((f) =>
				[ 'latitude', 'longitude', 'google_map_api_key', 'google_login_auth_token', 'google_id' ].includes(f.id)
			)
		},
		{
			id: 2,
			label: 'Address',
			icon: 'fa fa-map-marker',
			form: masterConfig.filter((f) =>
				[ 'address1', 'address2', 'city', 'state', 'country', 'postcode', 'locale' ].includes(f.id)
			)
		},
		{
			id: 3,
			label: 'Money & Locale',
			icon: 'fa fa-inr',
			form: masterConfig.filter((f) => [ 'maximumFractionDigits', 'currency', 'upiKey' ].includes(f.id))
		},
		{
			id: 4,
			label: 'Web Defaults',
			icon: 'fa fa-globe',
			form: masterConfig.filter((f) =>
				[
					'bgSong',
					'bgSongDefaultPlay',
					'bgVideo',
					'bgVideoDefaultPlay',
					'BannerImg',
					'logoImg',
					'favIconImg'
				].includes(f.id)
			)
		},
		{
			id: 5,
			label: 'AWS',
			icon: 'fa fa-amazon',
			form: masterConfig.filter((f) =>
				[ 'aws_s3_access_key_id', 'aws_s3_secret_access_key', 'aws_s3_bucket', 'aws_s3_region' ].includes(f.id)
			)
		}
	]);

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
		// todo: massage wizard data from payload
		console.log('bbb', bPayload, wizardData)
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
					document.location.href = '/';
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
					{/* <ReactiveForm
						className="reactive-form"
						structure={formStructure}
						onChange={(index, value) => massagePayload(index, value)}
						numColumns={4}
						onSubmit={() => onReactiveFormSubmit()}
						submitBtnLabel="Save"
					/> */}
					<Wizard data={wizardData} massagePayload={massagePayload} onReactiveFormSubmit={onReactiveFormSubmit} />
				</div>
			)}
		</div>
	);
}
export default Config;
