import React, { useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import MainApp from './components/mainApp/MainApp';
import AppContext from './contexts/AppContext';
import UserContextProvider from './contexts/UserContext';
import apiInstance from './services/apiServices';
import ErrorService from './components/wrapper/errorService';
import GlobalHeader from "./components/GlobalHeader";
import CryptoJS from 'crypto-js';
import AwsFactory from "./components/configuration/Gallery/AwsFactory";

import './css/style.scss';

function App() {
	const [ master, setMaster ] = useState({});
	const [ fetchStatus, setFetchStatus ] = useState(true);
	const [ logger, setLogger ] = useState(JSON.parse(localStorage.getItem("googleData")) || {});
	const getData = async () => {
		await apiInstance
			.get('/')
			.then((response) => {
				const data = response.data.response[0];
				const salt = response.data.response[0].user_mail;
				let refinedData = Object.entries(data).map(res => {
					if(["aws_s3_access_key_id", "aws_s3_secret_access_key", "aws_s3_region"].includes(res[0])) {
						res[1] = CryptoJS.AES.encrypt(res[1], salt).toString();
					};
					return res;
				});
				refinedData = Object.fromEntries(refinedData);
				setMaster(refinedData);
				setFetchStatus(true);
				const ele = document.querySelector("#favIcon");
				new AwsFactory(refinedData)
				.getSignedUrl(refinedData.favIconImg)
				.then(data => {
					ele.href = data || ""
				});
			})
			.catch((error) => setFetchStatus(false))
			.finally((error) => false);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<AppContext.Provider value={[ master, setMaster ]}>
			<UserContextProvider>
				<GlobalHeader onLogAction={b => setLogger(b)}>
					{fetchStatus ? <MainApp appData={master} logger={logger} /> : <ErrorService />}
				</GlobalHeader>
			</UserContextProvider>
		</AppContext.Provider>
	);
}

export default App;
