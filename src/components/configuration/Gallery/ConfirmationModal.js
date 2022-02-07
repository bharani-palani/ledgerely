import React, { useState, useEffect } from 'react'
import { Modal } from "react-bootstrap";

function ConfirmationModal(props) {
    const {confirmationstring, handleHide, handleYes, ...rest} = props;

    return (
        <Modal {...rest} style={{ zIndex: 9999 }}>
            <Modal.Header>
                <Modal.Title>{confirmationstring}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className='text-center'>This action cannot be undone!</p>
                <div className='row'>
                    <div className='col-xs-6 p-0'>
                        <button onClick={() => handleYes()} className="btn btn-block btn-bni">Yes</button>
                    </div>
                    <div className='col-xs-6 p-0'>
                        <button onClick={() => handleHide()} className="btn btn-block btn-danger">No</button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ConfirmationModal;