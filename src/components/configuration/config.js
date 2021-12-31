import React, { useState, useEffect } from 'react';
import ReactiveForm from './ReactiveForm';
import helpers from '../../helpers';
import _ from 'lodash';
import apiInstance from '../../services/apiServices';
import Loader from 'react-loader-spinner';

function Config(props) {
	const [ formStructure, setFormStructure ] = useState([
		{
			id: 'user_name',
			index: 'user_name',
			label: 'User Name',
			elementType: 'text',
			value: '',
			placeHolder: 'JohnDoe',
			className: 'form-control',
			options: {
				required: true,
				validation: /^[a-zA-Z0-9]{4,10}$/g,
				errorMsg: 'Input does not match criteria',
				help: [ `Min 4 letters`, `Max 10 letters`, `No special characters allowed` ]
			}
		},
		{
			id: 'display_name',
			index: 'display_name',
			label: 'Display Name',
			elementType: 'text',
			value: '',
			placeHolder: 'John Doe',
			className: 'form-control',
			options: {
				required: true,
				validation: /^[a-zA-Z0-9 ]{4,20}$/g,
				errorMsg: 'Input does not match criteria',
				help: [ `Min 4 letters`, `Max 20 letters`, `No special characters allowed` ]
			}
		},
		{
			id: 'profile_name',
			index: 'profile_name',
			label: 'Profile Name',
			elementType: 'text',
			value: '',
			placeHolder: 'Software Engineer',
			className: 'form-control',
			options: {
				required: true,
				validation: /^[a-zA-Z0-9 !@#$%^&|*]{4,50}$/g,
				errorMsg: 'Input does not match criteria',
				help: [ `Min 4 letters`, `Max 50`, `No special characters allowed` ]
			}
		},
		// {
		// 	id: 'password',
		// 	index: 'password',
		// 	label: 'Password',
		// 	elementType: 'password',
		// 	value: '',
		// 	placeHolder: 'Welcome@123',
		// 	className: 'form-control',
		// 	options: {
		// 		required: true,
		// 		validation: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
		// 		errorMsg: 'Input field doesn not match password criteria',
		// 		help: [
		// 			`Min 8 letters long`,
		// 			`Atleast 1 Capital letter`,
		// 			`Atleast 1 Special (!@#$%^&*) character`,
		// 			`Atleast 1 Number, are required`
		// 		]
		// 	}
		// },
		{
			id: 'user_mobile',
			index: 'user_mobile',
			label: 'Mobile',
			elementType: 'number',
			value: '',
			placeHolder: '9XXXX12345',
			className: 'form-control',
			options: {
				required: true,
				validation: /^[0-9]{10}$/,
				errorMsg: 'Enter a valid 10 digit mobile number'
			}
		},
		{
			id: 'user_mail',
			index: 'user_mail',
			label: 'Email',
			elementType: 'text',
			value: '',
			placeHolder: 'John@Doe.com',
			className: 'form-control',
			options: {
				required: true,
				validation: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
        errorMsg: 'Enter a valid email',
        help: "You will get only monthly updates on this application"
			}
		},
		{
			id: 'latitude',
			index: 'latitude',
			label: 'Geo Latitude',
			elementType: 'number',
			value: '',
			placeHolder: '13.80',
			className: 'form-control',
			options: {
				validation: /$/,
				errorMsg: '',
				help: [
					`Open Google maps`,
					`Find your home or office`,
					`Right click the location to get your latitude`
				]
			}
		},
		{
			id: 'longitude',
			index: 'longitude',
			label: 'Geo Longitude',
			elementType: 'number',
			value: '',
			placeHolder: '80.80',
			className: 'form-control',
			options: {
				validation: /$/,
				errorMsg: '',
				help: [
					`Open Google maps`,
					`Find your home or office`,
					`Right click the location to get your longitude`
				]
			}
		},
		{
			id: 'google_map_api_key',
			index: 'google_map_api_key',
			label: 'Google Map API Key',
			elementType: 'textArea',
			value: '',
			placeHolder: 'xxYYzz',
			className: 'form-control',
			options: {
				validation: /$/,
				errorMsg: '',
				help: [
					`Go to <a target="_blank" href='https://console.cloud.google.com/'>https://console.cloud.google.com/</a>`,
					`Scroll and click Google Maps Platform`,
					`Click Credentials`,
					`Click +Create Credentials at the top center`,
					`Click API Key`,
					`Copy the generated key`,
					`Paste here and save`,
					`Now, you can allow people to reach you, using ${document.location
						.origin}/contact page, clicking the map marker icon`,
					`Note: You shud've configured latitude, longitude, address 1, address 2, city, state, country and pin code correctly`,
					`Now, you can trace people from where they message you in ${document.location.origin}/write page`
				]
			}
		},
		{
			id: 'google_login_auth_token',
			index: 'google_login_auth_token',
			label: 'Google Login Auth Token',
			elementType: 'textArea',
			value: '',
			placeHolder: 'xxYYzz',
			className: 'form-control',
			options: {
				validation: /$/,
				errorMsg: '',
				help: [
					`Go to <a target="_blank" href='https://console.cloud.google.com/'>https://console.cloud.google.com/</a>`,
					`Click API Services`,
					`Click Credentials`,
					`Click +Create Credentials at the top center`,
					`Click Oauth Client Id`,
					`Select Web Application, give a suitable name`,
					`Click Add URI and type your domain URL.`,
					`Click Create`,
					`Copy Client ID`,
					`Paste here. You're done.`
				]
			}
		},
		{
			id: 'google_id',
			index: 'google_id',
			label: 'Google Id',
			elementType: 'text',
			value: '',
			placeHolder: 'xxYYzz',
			className: 'form-control',
			options: {
				required: true,
				validation: /([^\s])/,
				errorMsg: 'Google Id is required',
				help: [
					`Go to <a target="_blank" href="https://mail.google.com/">https://mail.google.com/</a>`,
					`Open Developer tools (ctrl + shift + i)`,
					`Click Application tab`,
					`Collapse LocalStorage`,
					`Collapse https://mail.google.com/`,
					`Select the first row in "Key" Column`,
					`Copy your Google Id (Shud be a long integer)`,
					`Paste it here and save`,
					`This helps you to login as admin and configure your settings`
				]
			}
		},
		{
			id: 'address1',
			index: 'address1',
			label: 'Address 1',
			elementType: 'text',
			value: '',
			placeHolder: '3, Wall street',
			className: 'form-control',
			options: {
				required: true,
				validation: /^[a-zA-Z0-9 ,./:;]{4,50}$/g,
				errorMsg: 'Min 4 & Max 50 letters required'
			}
		},
		{
			id: 'address2',
			index: 'address2',
			label: 'Address 2',
			elementType: 'text',
			value: '',
			placeHolder: 'Park Town',
			className: 'form-control',
			options: {
				required: true,
				validation: /^[a-zA-Z0-9 ,./:;]{4,50}$/g,
				errorMsg: 'Min 4 & Max 50 letters required'
			}
		},
		{
			id: 'city',
			index: 'city',
			label: 'City',
			elementType: 'text',
			value: '',
			placeHolder: 'New york',
			className: 'form-control',
			options: {
				required: true,
				validation: /^[a-zA-Z ]{4,50}$/g,
				errorMsg: 'Min 4 & Max 20 letters required'
			}
		},
		{
			id: 'state',
			index: 'state',
			label: 'State',
			elementType: 'text',
			value: '',
			placeHolder: 'New york',
			className: 'form-control',
			options: {
				required: true,
				validation: /^[a-zA-Z ]{4,50}$/g,
				errorMsg: 'Min 4 & Max 20 letters required'
			}
		},
		{
			id: 'country',
			index: 'country',
			label: 'Country',
			elementType: 'text',
			value: '',
			placeHolder: 'United States',
			className: 'form-control',
			options: {
				required: true,
				validation: /^[a-zA-Z ]{4,20}$/g,
				errorMsg: 'Min 4 & Max 20 letters required'
			}
		},
		{
			id: 'postcode',
			index: 'postcode',
			label: 'Post Code',
			elementType: 'number',
			value: '',
			placeHolder: 'XX12345',
			className: 'form-control',
			options: {
				required: true,
				validation: /^[0-9]{4,32}$/g,
				errorMsg: 'Min 4 & Max 32 numbers required'
			}
		},
		{
			id: 'locale',
			index: 'locale',
			label: 'Locale',
			elementType: 'dropDown',
			value: '',
			placeHolder: 'Select',
			className: 'form-control',
			list: _.sortBy(
				Object.keys(helpers.LANGUAGE_BY_LOCALE).map((lang) => ({
					value: helpers.LANGUAGE_BY_LOCALE[lang],
					label: `${lang} (${helpers.LANGUAGE_BY_LOCALE[lang]})`
				})),
				'label'
			),
			options: {
				required: true,
				validation: /([^\s])/,
				errorMsg: 'This field is required',
				help: [ `Set your custom language locale`, `Usefull to see thousand seperators` ]
			}
		},
		{
			id: 'maximumFractionDigits',
			index: 'maximumFractionDigits',
			label: 'Decimal digit limit',
			elementType: 'dropDown',
			value: '',
			placeHolder: 'Select',
			list: [ 0, 1, 2 ].map((v) => ({ label: String(v), value: String(v) })),
			className: 'form-control',
			options: {
				required: true,
				validation: /([^\s])/,
				errorMsg: 'This field is required',
				help: [ `Maintains decimal point on math operations` ]
			}
		},
		{
			id: 'currency',
			index: 'currency',
			label: 'Currency',
			elementType: 'dropDown',
			value: '',
			placeHolder: 'Select',
			list: _.sortBy(
				Object.keys(helpers.CURRENCY).map((curr) => ({
					value: helpers.CURRENCY[curr],
					label: `${helpers.CURRENCY[curr]} - ${curr}`
				})),
				'label'
			),
			className: 'form-control',
			options: {
				required: true,
				validation: /([^\s])/,
				errorMsg: 'This field is required'
			}
		},
		{
			id: 'upiKey',
			index: 'upiKey',
			label: 'UPI Key',
			elementType: 'textArea',
			value: '',
			placeHolder: 'johndoe@okhdfcbank',
			className: 'form-control',
			options: {
				required: true,
				validation: /$/,
				errorMsg: 'Invalid key',
				help: [
					`An address that identifies you on UPI payments (typically yourname@bankname)`,
					`You can get this on your UPI mobile App, Account settings`,
					`Paste it here`,
					`Now, you can ask your payees to visit <a target="_blank" href="${document.location
						.origin}/contribute">${document.location.origin}/contribute</a> to transfer funds.`,
					`This helps you to avoid sharing your mobile number.`
				]
			}
		}
	]);
	const [ loader, setLoader ] = useState(false);
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
				// console.log('bbb', payload);
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
	return (
		<div>
			{loader ? (
				<div className="spinner">
					<Loader
						type={helpers.LoadRandomSpinnerIcon()}
						color={helpers.fluorescentColor}
						height={100}
						width={100}
					/>
				</div>
			) : (
				<ReactiveForm
					className="reactive-form"
					structure={formStructure}
					onChange={(index, value) => massagePayload(index, value)}
          numColumns={3}
          onSubmit={() => alert('success')}
				/>
			)}
			{/* <h4>Output</h4>
			<div style={{ whiteSpace: 'pre' }}>{JSON.stringify(payload, null, '\t')}</div> */}
		</div>
	);
}
export default Config;
