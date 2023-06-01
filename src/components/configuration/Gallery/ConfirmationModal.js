import React, { useContext } from 'react'
import { Modal } from "react-bootstrap";
import { UserContext } from "../../../contexts/UserContext";
import { FormattedMessage } from 'react-intl';

function ConfirmationModal(props) {
    const userContext = useContext(UserContext);
    const { confirmationstring, handleHide, handleYes, ...rest } = props;

    return (
        <Modal {...rest} style={{ zIndex: 9999 }}>
            <Modal.Header>
                <Modal.Title>{confirmationstring}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={`rounded-bottom ${userContext.userData.theme === 'dark' ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
                <p className='text-center'><FormattedMessage id="thisActionCannotBeUndone" defaultMessage="thisActionCannotBeUndone" /></p>
                <div className='row'>
                    <div className='col-6 text-center'>
                        <button onClick={() => handleYes()} className="btn btn-bni"><i className='fa fa-thumbs-o-up' /></button>
                    </div>
                    <div className='col-6 text-center'>
                        <button onClick={() => handleHide()} className="btn btn-bni dark"><i className='fa fa-thumbs-o-down' /></button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ConfirmationModal;