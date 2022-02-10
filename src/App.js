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
import './css/style.scss';

function App() {
	const [ master, setMaster ] = useState({});
	const [ fetchStatus, setFetchStatus ] = useState(true);
	const getData = async () => {
		await apiInstance
			.get('/')
			.then((response) => {
				const data = response.data.response[0];
				const salt = response.data.response[0].user_mail;
				let refinedData = Object.entries(data).map(res => {
					if(["aws_s3_access_key_id", "aws_s3_secret_access_key", "aws_s3_bucket", "aws_s3_region"].includes(res[0])) {
						res[1] = CryptoJS.AES.encrypt(res[1], salt).toString();
					};
					return res;
				})
				refinedData = Object.fromEntries(refinedData);
				setMaster(refinedData);
				setFetchStatus(true);
				const ele = document.querySelector("#favIcon");
				ele.href = response.data.response[0].favIconImg || ""
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
				<GlobalHeader>
          {fetchStatus ? <MainApp appData={master} /> : <ErrorService />}
				</GlobalHeader>
			</UserContextProvider>
		</AppContext.Provider>
	);
}

export default App;
