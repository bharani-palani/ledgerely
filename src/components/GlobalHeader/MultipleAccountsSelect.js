import React, { useEffect, useState } from "react";
import { Modal, ListGroup } from "react-bootstrap";
import apiInstance from "../../services/apiServices";
import { FormattedMessage } from "react-intl";

const MultipleAccountsSelect = props => {
  const { list, username } = props.data;
  const { onAppIdClick } = props;
  const [accountList, setAccountList] = useState([]);

  useEffect(() => {
    if (list.length > 0) {
      const formdata = new FormData();
      formdata.append("appIdList", list);
      apiInstance.post("/multipleAccountsList", formdata).then(response => {
        setAccountList(response.data.response);
      });
    }
  }, [list]);

  return (
    <Modal {...props} style={{ zIndex: 10000 }}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage
            id='youSignedWithMulAccounts'
            defaultMessage='youSignedWithMulAccounts'
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`rounded-bottom p-0`}>
        {accountList.length > 0 && (
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
                className={`cursor-pointer ${i === accountList.length - 1 ? "rounded-bottom" : "rounded-0 border-bottom"}`}
                onClick={() => onAppIdClick({ appId: acc.appId, username })}
              >
                {acc.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default MultipleAccountsSelect;
