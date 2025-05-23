import React, { useEffect, useState } from "react";
import { Modal, ListGroup, Form, InputGroup, Button } from "react-bootstrap";
import useAxios from "../../services/apiServices";
import { FormattedMessage, useIntl } from "react-intl";
import icon from "../../images/logo/blackGreenIcon.jpg";

const MultipleAccountsSelect = props => {
  const { apiInstance } = useAxios();
  const intl = useIntl();
  const { list, username } = props.data;
  const { onAppIdClick } = props;
  const [accountList, setAccountList] = useState([]);
  const [backupList, setBackupList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (list.length > 0) {
      const formdata = new FormData();
      formdata.append("appIdList", list);
      apiInstance.post("/multipleAccountsList", formdata).then(response => {
        setAccountList(response.data.response);
        setBackupList(response.data.response);
      });
    }
  }, [list]);

  useEffect(() => {
    const filter = backupList.filter(
      b =>
        b.name.toLowerCase().includes(searchText.toLowerCase()) ||
        b.appId.includes(searchText),
    );
    setAccountList(filter);
  }, [searchText]);

  return (
    <Modal {...props} style={{ zIndex: 10000 }}>
      <Modal.Header closeButton>
        <Modal.Title className='d-flex justify-content-between'>
          <img
            style={{ width: "40px", height: "40px" }}
            className='img-fluid me-2 rounded-circle'
            src={icon}
          />
          <small className='lh-sm'>
            <FormattedMessage
              id='youSignedWithMulAccounts'
              defaultMessage='youSignedWithMulAccounts'
            />
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`rounded-bottom p-0`}>
        <InputGroup size='sm'>
          <Form.Control
            type='text'
            placeholder={intl.formatMessage({
              id: "searchHere",
              defaultMessage: "searchHere",
            })}
            className='rounded-0 shadow-none py-2'
            value={searchText}
            onChange={e => {
              setSearchText(e.target.value);
            }}
          />
          {searchText && (
            <Button
              variant='danger'
              className='rounded-0'
              onClick={() => setSearchText("")}
            >
              <i className='fa fa-times' />
            </Button>
          )}
        </InputGroup>
        {accountList.length > 0 ? (
          <ListGroup
            as='ul'
            style={{
              maxHeight: "300px",
              overflowY: "auto",
            }}
            className='rounded-0'
          >
            {accountList.map((acc, i) => (
              <ListGroup.Item
                key={i}
                as='li'
                action
                variant='light'
                className={`cursor-pointer text-wrap ${i === accountList.length - 1 ? "rounded-bottom" : "rounded-0 border-bottom"}`}
                onClick={() => onAppIdClick({ appId: acc.appId, username })}
              >
                <div>{acc.name}</div>
                <div className='small badge bni-bg text-dark'>
                  <i className='fa fa-book pe-1' />
                  {acc.appId}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <ListGroup.Item
            as='li'
            variant='light'
            className='em small text-center p-2'
          >
            <FormattedMessage
              id='noRecordsGenerated'
              defaultMessage='noRecordsGenerated'
            />
          </ListGroup.Item>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default MultipleAccountsSelect;
