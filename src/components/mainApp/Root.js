import React, { useState, useEffect } from 'react';
import MainApp from '../mainApp/MainApp';
import AppContext from '../../contexts/AppContext';
import UserContextProvider from '../../contexts/UserContext';
import apiInstance from '../../services/apiServices';
import GlobalHeader from "../GlobalHeader";
import CryptoJS from 'crypto-js';
import AwsFactory from "../configuration/Gallery/AwsFactory";

function Root(props) {
	const [ master, setMaster ] = useState({});
	const [ fetchStatus, setFetchStatus ] = useState(true);
	const [ logger, setLogger ] = useState(JSON.parse(localStorage.getItem("googleData")) || {});


	const getData = async () => {
		await apiInstance
			.get('/')
			.then((response) => {
				const data = response.data.response[0];
				const salt = response.data.response[0].web;
				let refinedData = Object.entries(data).map(res => {
					if(["aws_s3_access_key_id", "aws_s3_secret_access_key", "aws_s3_region"].includes(res[0])) {
						res[1] = CryptoJS.AES.encrypt(res[1], salt).toString();
					};
					return res;
				});
				refinedData = Object.fromEntries(refinedData);
				setMaster(refinedData);
				setFetchStatus(true);
				favIconSetter(refinedData);
				// todo: set css defaults
				document.querySelector(':root').style.setProperty('--app-button-color', "#c2d82e");
				document.querySelector(':root').style.setProperty('--app-link-color', "blue");
			})
			.catch((error) => setFetchStatus(false))
			.finally((error) => false);
	};

    const favIconSetter = (data) => {
		const ele = document.querySelector("#favIcon");
		const pieces = data.favIconImg.split("/");
		let bucket = pieces[0];
		const path = data.favIconImg.split("/").slice(1, data.favIconImg.split("/").length).join("/");
		new AwsFactory(data)
		.getSignedUrl(path, 24*60*60, bucket)
		.then(data => {
			ele.href = data || ""
		});
	}

    useEffect(() => {
		getData();
	}, []);


	return (
		<AppContext.Provider value={[ master, setMaster ]}>
			<UserContextProvider>
				<GlobalHeader onLogAction={b => {setLogger(b);}}>
					{fetchStatus && <MainApp appData={master} logger={logger} />}
				</GlobalHeader>
			</UserContextProvider>
		</AppContext.Provider>
	);
}

export default Root;