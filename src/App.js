import React, { useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import MainApp from './components/mainApp/MainApp';
import AppContext from './contexts/AppContext';
import UserContextProvider from './contexts/UserContext';
import apiInstance from './services/apiServices';
import ErrorService from './components/wrapper/errorService';
import GlobalHeader from "./components/GlobalHeader";
import './css/style.scss';

function App() {
	const [ master, setMaster ] = useState({});
	const [ fetchStatus, setFetchStatus ] = useState(true);
	const getData = async () => {
		await apiInstance
			.get('/')
			.then((response) => {
				setMaster(response.data.response[0]);
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
