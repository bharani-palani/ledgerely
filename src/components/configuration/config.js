/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import helpers from '../../helpers';
import apiInstance from '../../services/apiServices';
import Loader from 'react-loader-spinner';
import { UserContext } from '../../contexts/UserContext';
import AppContext from '../../contexts/AppContext';
import { masterConfig, wizardData } from '../configuration/backendTableConfig';
import Wizard from '../configuration/Wizard';
import CryptoJS from 'crypto-js';

function Config(props) {
  const userContext = useContext(UserContext);
  const [appData, setMaster] = useContext(AppContext);
  const [formStructure, setFormStructure] = useState(masterConfig);
  const [loader, setLoader] = useState(true);
  const encryptKeys = [
    'aws_s3_access_key_id',
    'aws_s3_region',
    'aws_s3_secret_access_key',
    'google_map_api_key',
    'google_login_auth_token',
  ];

  const getBackendAjax = (Table, TableRows) => {
    const formdata = new FormData();
    formdata.append('TableRows', TableRows);
    formdata.append('Table', Table);
    return apiInstance.post('getBackend', formdata);
  };

  useEffect(() => {
    setLoader(true);
    const TableRows = formStructure.map(form => form.index);
    getBackendAjax('config', TableRows)
      .then(r => {
        const responseObject = r.data.response[0];
        const responseArray = Object.keys(responseObject);
        let backupStructure = [...formStructure];
        backupStructure = backupStructure.map(backup => {
          if (responseArray.includes(backup.index)) {
            backup.value = encryptKeys.includes(backup.index)
              ? CryptoJS.AES.decrypt(
                  responseObject[backup.index],
                  appData.web
                ).toString(CryptoJS.enc.Utf8)
              : responseObject[backup.index];
          }
          return backup;
        });
        setFormStructure(backupStructure);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [JSON.stringify(appData)]);

  const onMassagePayload = (index, value) => {
    let backupStructure = [...formStructure];
    backupStructure = backupStructure.map(backup => {
      if (backup.id === index) {
        backup.value = value;
      }
      return backup;
    });
    setFormStructure(backupStructure);
  };

  const onReactiveFormSubmit = () => {
    setLoader(true);
    let payload = [...formStructure].map(f => ({
      [f.id]: encryptKeys.includes(f.id)
        ? CryptoJS.AES.encrypt(f.value, appData.web).toString()
        : f.value,
    }));
    payload = Object.assign({}, ...payload);
    const newPayload = {
      Table: 'config',
      updateData: [payload],
    };
    const formdata = new FormData();
    formdata.append('postData', JSON.stringify(newPayload));

    apiInstance
      .post('/postBackend', formdata)
      .then(res => {
        if (res.data.response) {
          let backupStructure = [...formStructure];
          const bPayLoad = Object.keys(payload);
          backupStructure = backupStructure.map(backup => {
            if (bPayLoad.includes(backup.index)) {
              backup.value = payload[backup.index];
            }
            return backup;
          });
          setFormStructure(backupStructure);
          userContext.renderToast({
            message: 'Configurations saved successfully',
          });
          let massageStructure = backupStructure.map(b => [b.id, b.value]);
          massageStructure = Object.fromEntries(massageStructure);
          setMaster(massageStructure);
        }
      })
      .catch(e =>
        userContext.renderToast({
          type: 'error',
          icon: 'fa fa-times-circle',
          message: 'Oops.. Something went wrong. Please try again.',
        })
      )
      .finally(() => setLoader(false));
  };

  return (
    <div className="">
      {loader ? (
        <div className="text-center mt-100">
          <Loader
            type={helpers.loadRandomSpinnerIcon()}
            color={document.documentElement.style.getPropertyValue(
              '--app-theme-bg-color'
            )}
            height={100}
            width={100}
          />
        </div>
      ) : (
        <div className="">
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
