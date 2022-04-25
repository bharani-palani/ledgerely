import React, { useState, useEffect } from 'react';
import MainApp from '../mainApp/MainApp';
import AppContext from '../../contexts/AppContext';
import UserContextProvider from '../../contexts/UserContext';
import apiInstance from '../../services/apiServices';
import GlobalHeader from '../GlobalHeader';
import AwsFactory from '../configuration/Gallery/AwsFactory';
import '../../index.scss';

function Root(props) {
  const [master, setMaster] = useState({});
  const [fetchStatus, setFetchStatus] = useState(true);
  const [, setLogger] = useState(
    JSON.parse(localStorage.getItem('userData')) || {}
  );

  const getData = async () => {
    setFetchStatus(false);
    await apiInstance
      .get('/')
      .then(response => {
        const data = response.data.response[0];
        setMaster(data);
        setFetchStatus(true);
        favIconSetter(data);
        document.documentElement.style.setProperty(
          '--app-theme-color',
          data.webThemeColor
        );
        document.documentElement.style.setProperty(
          '--app-theme-bg-color',
          data.webThemeBackground
        );
        document.title = data.web;
      })
      .catch(error => setFetchStatus(false))
      .finally(error => false);
  };

  const favIconSetter = data => {
    const ele = document.querySelector('#favIcon');
    const pieces = data.favIconImg.split('/');
    const bucket = pieces[0];
    const path = data.favIconImg
      .split('/')
      .slice(1, data.favIconImg.split('/').length)
      .join('/');
    new AwsFactory(data).getSignedUrl(path, 24 * 60 * 60, bucket).then(data => {
      ele.href = data || '';
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {fetchStatus && (
        <AppContext.Provider value={[master, setMaster]}>
          <UserContextProvider config={master}>
            <GlobalHeader
              onLogAction={b => {
                setLogger(b);
              }}
            >
              <MainApp appData={master} />
            </GlobalHeader>
          </UserContextProvider>
        </AppContext.Provider>
      )}
    </>
  );
}

export default Root;
