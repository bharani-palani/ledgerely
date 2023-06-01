import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import { FormattedMessage } from 'react-intl'

const ConfirmQBModal = props => {
  const { onHide, onYes } = props;
  const userContext = useContext(UserContext);
  return (
    <Modal {...props} style={{ zIndex: 9999 }}>
      <Modal.Header closeButton>
        <Modal.Title><FormattedMessage id="sureAbtSqlQueries" defaultMessage="sureAbtSqlQueries" /></Modal.Title>
      </Modal.Header>
      <Modal.Body className={`rounded-bottom ${userContext.userData.theme === 'dark' ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
        <div className="d-flex justify-content-between">
          <div>
            <button onClick={() => onYes()} className="btn btn-bni">
              <FormattedMessage id="allow" defaultMessage="allow" />
            </button>
          </div>
          <div>
            <button
              onClick={() => onHide()}
              className="btn btn-secondary"
            >
              <FormattedMessage id="restrict" defaultMessage="restrict" />
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

ConfirmQBModal.propTypes = {
  onYes: PropTypes.string,
  onHide: PropTypes.func
};
ConfirmQBModal.defaultProps = {};

export default ConfirmQBModal;
