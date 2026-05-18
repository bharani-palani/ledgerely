import React, { useState, useContext, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";
import { UserContext } from "../../contexts/UserContext";
import { FormattedMessage, useIntl } from "react-intl";
import Dropzone from "react-dropzone";
import useAxios from "../../services/apiServices";
import Table from "../shared/D3/Table";

const CreditCardModal = props => {
  const { apiInstance } = useAxios();
  const intl = useIntl();
  const { onImport, ccBankSelected, ...restProps } = props;
  const userContext = useContext(UserContext);
  const fileSize = 1 * 1024 * 1024;
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [rows, setRows] = useState([]);
  const [errorResult, setErrorResult] = useState("");

  const massagedData = useCallback(
    arr =>
      arr.map(item => ({
        [intl.formatMessage({ id: "transaction", defaultMessage: "Transaction Name" })]: item.transaction_name,
        [intl.formatMessage({ id: "date", defaultMessage: "Transaction Date" })]: item.transaction_date,
        [intl.formatMessage({ id: "openingBalance", defaultMessage: "Opening Balance" })]: item.opening_balance,
        [intl.formatMessage({ id: "credits", defaultMessage: "Payments/Credits" })]: item.payments_credits,
        [intl.formatMessage({ id: "purchases", defaultMessage: "Purchases" })]: item.purchases,
        [intl.formatMessage({ id: "taxesAndInterest", defaultMessage: "Taxes/Interest" })]: item.taxes_interest,
      })),
    [intl],
  );

  const generateTableData = useCallback(
    arr =>
      arr.map(item => ({
        cc_id: "",
        cc_date: item.transaction_date,
        cc_transaction: item.transaction_name,
        cc_opening_balance: item.opening_balance,
        cc_payment_credits: item.payments_credits,
        cc_purchases: item.purchases,
        cc_taxes_interest: item.taxes_interest,
        cc_expected_balance: (
          Number(item.opening_balance) +
          Number(item.purchases) +
          Number(item.taxes_interest) -
          Number(item.payments_credits)
        ).toFixed(2),
        cc_for_card: ccBankSelected,
        cc_transaction_status: "0",
        cc_added_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        cc_comments: "",
        cc_inc_exp_cat: "",
      })),
    [],
  );

  const onScanStatement = file => {
    setLoading(true);
    setErrorResult("");
    const formData = new FormData();
    formData.append("statement", file);
    formData.append("tenantId", userContext.userConfig.tenantId);
    apiInstance
      .post("/ai/ledgerelyAi/scanStatement", formData)
      .then(res => {
        const result = res?.data?.response?.result;
        if (result === null) {
          setErrorResult(intl.formatMessage({ id: "noRecordsGenerated", defaultMessage: "noRecordsGenerated" }));
          setTableData([]);
        }
        if (result?.error) {
          setErrorResult(result.error);
          setTableData([]);
        }
        if (result?.transactions && result?.transactions.length > 0) {
          const localeData = massagedData(result.transactions);
          setTableData(localeData);
          setRows(generateTableData(result.transactions));
          setErrorResult("");
        }
      })
      .catch(error => {
        setErrorResult(error.response?.data?.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal {...restProps} style={{ zIndex: 10000 }}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage id='importYourCreditCardStatement' defaultMessage='importYourCreditCardStatement' />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`dropZone rounded-bottom ${userContext.userData.theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"}`}>
        <Dropzone accept={{ "application/pdf": [".pdf"] }} maxSize={fileSize} onDrop={() => {}} className='text-center'>
          {({ acceptedFiles, getRootProps, getInputProps, isDragAccept, isDragReject }) => {
            let classes = `dropZoneWrapper`;
            let placeholder = (
              <div className='text-center'>
                <div className='p-0'>
                  <FormattedMessage id='dragFilesHere' defaultMessage='dragFilesHere' />
                </div>
                <small className='text-danger'>
                  *<FormattedMessage id='checkPdfProtected' defaultMessage='checkPdfProtected' />
                </small>
              </div>
            );
            if (isDragAccept) {
              classes = `${classes} bg-success`;
              placeholder = (
                <div className='upload-success'>
                  <FormattedMessage id='dropFileOrfilesHere' defaultMessage='dropFileOrfilesHere' />
                </div>
              );
            }
            if (isDragReject) {
              classes = `${classes} bg-danger`;
              placeholder = (
                <div className='upload-error'>
                  <FormattedMessage id='fileTypeNotAllowed' defaultMessage='fileTypeNotAllowed' />
                </div>
              );
            }
            return (
              <>
                <div {...getRootProps()} className={`${classes} title`}>
                  <input {...getInputProps()} />
                  {placeholder}
                </div>
                {acceptedFiles.length > 0 && (
                  <div>
                    <i className='fa fa-file-pdf-o pe-1' />
                    {acceptedFiles[0].name}
                  </div>
                )}
                <div className='d-flex justify-content-end'>
                  <Button
                    size='sm'
                    className='btn-bni'
                    variant={userContext.userData.theme}
                    disabled={acceptedFiles.length === 0 || loading}
                    onClick={() => onScanStatement(acceptedFiles[0])}
                  >
                    {loading ? <i className='fa fa-circle-o-notch fa-spin fa-1x fa-fw' /> : <FormattedMessage id='submit' defaultMessage='submit' />}
                  </Button>
                </div>
              </>
            );
          }}
        </Dropzone>
        {tableData.length > 0 && (
          <div className='mt-2'>
            <Table
              data={tableData}
              className='mt-2'
              fillColor={userContext.userData.theme === "dark" ? "#343a40" : "#ffffff"}
              fontColor={userContext.userData.theme === "dark" ? "#ffffff" : "#000000"}
              lineColor={userContext.userData.theme === "dark" ? "#495057" : "#dee2e6"}
              fontSize={14}
              padding={0.5}
              width={"100%"}
              height={"300px"}
            />
            <div className='d-flex justify-content-end mt-2'>
              <Button size='sm' className='btn-bni' disabled={rows.length === 0} variant={userContext.userData.theme} onClick={() => onImport(rows)}>
                <FormattedMessage id='import' defaultMessage='import' />
              </Button>
            </div>
            <div className='small pt-1'>
              *<FormattedMessage id='statementUploadNote' defaultMessage='statementUploadNote' />
            </div>
          </div>
        )}
        {errorResult && <div className='mt-2 bg-danger text-light text-center p-1 rounded-1 animate__animated animate__headShake'>{errorResult}</div>}
      </Modal.Body>
    </Modal>
  );
};

export default CreditCardModal;
