import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import apiInstance from '../../services/apiServices';
import { FormattedMessage, useIntl } from 'react-intl'
import Dropzone from 'react-dropzone';
import { UserContext } from "../../contexts/UserContext";
import CsvDownloader from 'react-csv-downloader';
import moment from 'moment';

const BulkImportIncExp = props => {
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const fileSize = 5 * 1024 * 1024;
  const maxRowsInsert = 1000;
  const [fileSelected, setFileSelected] = useState({});
  const [data, setData] = useState([]);
  const sampleDownload = [
    {
      inc_exp_id: "null",
      inc_exp_name: "Gross profit",
      inc_exp_amount: 1000000,
      inc_exp_plan_amount: 0,
      inc_exp_type: "Cr",
      inc_exp_date: moment().format('YYYY-MM-DD'),
      inc_exp_added_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      inc_exp_category: "Category name",
      inc_exp_bank: "Bank name",
      inc_exp_comments: "your profit comments"
    },
    {
      inc_exp_id: "null",
      inc_exp_name: "Gross expense",
      inc_exp_amount: 500000,
      inc_exp_plan_amount: 0,
      inc_exp_type: "Dr",
      inc_exp_date: moment().format('YYYY-MM-DD'),
      inc_exp_added_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      inc_exp_category: "Category name",
      inc_exp_bank: "Bank name",
      inc_exp_comments: "your expense comments"
    }
  ];

  const processData = (file) => {
    return new Promise((resolve,reject) => {
      const input = file;
      const reader = new FileReader();
      reader.readAsText(input);
      reader.onload = (e) => {
        const lines = [];
        const allText = e.target.result;
        const allTextLines = allText.split(/\r\n|\n/);
        const headers = allTextLines[0].split(',');
        if(input.size <= fileSize) {
          if(allTextLines.length - 1 <= maxRowsInsert) {
            for (let i=1; i<allTextLines.length; i++) {
              // const data = allTextLines[i].match(/(".*?"|[^,\s]+)(?=\s*,|\s*$)/g);
              const data = allTextLines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
              if (data.length === headers.length) {
                const tarr = [];
                for (let j=0; j<headers.length; j++) {
                  tarr.push({[headers[j]]: data[j].replace(/\\/g, '').replaceAll('"','')});
                }
                const joined = Object.assign({}, ...tarr);
                lines.push(joined);
              }
            }
            resolve(lines);
          } else {
            reject(new Error(`${intl.formatMessage({ id: 'maxAllowedRowLimitIs' })} ${maxRowsInsert}`));
          }
        } else {
          reject(new Error(`${intl.formatMessage({ id: 'maxFileSizeLimitIs' })} ${fileSize} MB`));
        }
      };
      reader.onerror = (e) => {
        reject(e);
      };
    })
  };

  const onDrop = (acceptedFiles, rejectedFiles, event) => {
    if (acceptedFiles.length > 0) {
      setFileSelected(acceptedFiles[0])
      processData(acceptedFiles[0])
      .then((res) => {
        userContext.renderToast({ 
          message: `${res.length} ${intl.formatMessage({ id: 'rowsAddedSuccessfully' })}`,
          autoClose: 10000
        })
        setData(res);
      })
      .catch(e => {
        setData([]);
        userContext.renderToast({
          type: 'error',
          icon: 'fa fa-times-circle',
          message: e,
        });
      })
    }
  }

  const getFileSize = (bytes) => {
    const mb = (bytes / 1024 / 1024).toFixed(2);
    if(mb > 0) {
      return `${mb} MB`;
    } else {
      const kb = (bytes / 1024).toFixed(2);
      return `${kb} KB`;
    }
  }

  const onsubmit = () => {
    const formdata = new FormData();
    formdata.append('data', JSON.stringify(data));
    apiInstance
      .post('/account_planner/bulkExport', formdata)
      .then(res => {
        if(res.data.response) {
          userContext.renderToast({ 
            message: intl.formatMessage({ id: 'bulkImportSuccess' })
          })  
        }
      })
      .catch(e => {
        userContext.renderToast({
          type: 'error',
          icon: 'fa fa-times-circle',
          message: intl.formatMessage({ id: 'bulkImportFailed' })
        });
      })
      .finally(() => setData([]));
  };

  return (
    <Modal {...props} style={{ zIndex: 9999 }}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage id="bulkImport" />
          <em className='ps-1'>
            (<small className='pe-1'>
              <FormattedMessage id="limit" />: {`${fileSize/1024/1024} MB,`}
            </small>
            <small className='pe-1'>
              <FormattedMessage id="maxRows" />: {`${maxRowsInsert},`}
            </small>
            <small>
              <FormattedMessage id="type" />: CSV
            </small>)
          </em>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`rounded-bottom p-0 ${userContext.userData.theme === 'dark' ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
        <div className='dropZone'>
            <Dropzone
                accept="text/csv,text/comma-separated-values,application/csv"
                maxSize={fileSize}
                onDrop={onDrop}
                className='text-center'
            >
              {({ getRootProps, getInputProps, isDragAccept, isDragReject }) => {
                let classes = 'dropZoneWrapper'
                let placeholder = <div><FormattedMessage id="dragFilesHere" /></div>;
                if (isDragAccept) {
                    classes = `${classes} bg-success`;
                    placeholder = <div className="upload-success"><FormattedMessage id="dropFileOrfilesHere" /></div>;
                }
                if (isDragReject) {
                    classes = `${classes} bg-danger`;
                    placeholder = <div className="upload-error"><FormattedMessage id="fileTypeNotAllowed" /></div>
                }
                return (
                  <div {...getRootProps()} className={`${classes} title`}>
                      <input {...getInputProps()} />
                      {placeholder}
                  </div>
                )
              }}
            </Dropzone>
            {Object.keys(fileSelected).length > 0 && 
              <div className='p-1 text-center'>
                <small className='icon-bni'>
                  <i className='fa fa-file-excel-o pe-1' />{fileSelected.name}
                  <small className='ps-1'><em>({getFileSize(fileSelected.size)})</em></small>  
                </small>
              </div>
            }
            <div className='d-flex justify-content-evenly'>
                <button className='btn btn-bni w-50 rounded-0 rounded-start border-end'>
                  <CsvDownloader
                    datas={sampleDownload}
                    filename={`inc-exp-csv-sample-import.csv`}
                  >
                    <i className="fa fa-file-downoad pe-1" />
                    <FormattedMessage id="downloadCsvTemplate" />
                  </CsvDownloader>
                </button>
              {<button disabled={!data.length} onClick={() => onsubmit()} className='btn-bni w-50 rounded-0 rounded-end'><FormattedMessage id="submit" /></button>}
            </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

BulkImportIncExp.propTypes = {
  property: PropTypes.string,
};
BulkImportIncExp.defaultProps = {
  property: 'String name',
};

export default BulkImportIncExp;
