import React, { useState, useEffect } from 'react'
import { Modal } from "react-bootstrap";

function ConfirmationModal(props) {
    const {confirmationString, onHide, onYes} = props;

    return (
        <Modal {...props} style={{ zIndex: 9999 }}>
            <Modal.Header closeButton>
                <Modal.Title>{confirmationString}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className='col-xs-6 p-0'>
                        <button onClick={() => onYes()} className="btn btn-block btn-bni">Yes</button>
                    </div>
                    <div className='col-xs-6 p-0'>
                        <button onClick={() => onHide()} className="btn btn-block btn-danger">No</button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ConfirmationModal;