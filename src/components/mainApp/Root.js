import React, { useState, useEffect } from 'react';
import MainApp from '../mainApp/MainApp';
import AppContext from '../../contexts/AppContext';
import UserContextProvider from '../../contexts/UserContext';
import apiInstance from '../../services/apiServices';
import GlobalHeader from '../GlobalHeader';
import CryptoJS from 'crypto-js';
import AwsFactory from '../configuration/Gallery/AwsFactory';

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
        const salt = response.data.response[0].web;
        let refinedData = Object.entries(data).map(res => {
          if (
            [
              'aws_s3_access_key_id',
              'aws_s3_secret_access_key',
              'aws_s3_region',
              'google_map_api_key',
            ].includes(res[0])
          ) {
            res[1] = CryptoJS.AES.encrypt(res[1], salt).toString();
          }
          return res;
        });
        refinedData = Object.fromEntries(refinedData);
        setMaster(refinedData);
        setFetchStatus(true);
        favIconSetter(refinedData);
        document.documentElement.style.setProperty(
          '--app-theme-color',
          refinedData.webThemeColor
        );
        document.documentElement.style.setProperty(
          '--app-theme-bg-color',
          refinedData.webThemeBackground
        );
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
