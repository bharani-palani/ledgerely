import React, { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";

const CloseAccount = props => {
  const userContext = useContext(UserContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const closeAccountReasons = [
    { value: "notRelevant", label: "Not relevant" },
    { value: "pricingMore", label: "Pricing is more" },
    { value: "lowFeatures", label: "Low features" },
    { value: "performanceIssues", label: "Performance issues" },
    { value: "others", label: "Others" },
  ];
  return (
    <div className='py-3'>
      <Modal show={show} onHide={handleClose} style={{ zIndex: 9999 }}>
        <Modal.Header closeButton>
          <Modal.Title className='d-flex align-items-center'>
            <span>We are sorry to see you go</span>
            <i className='px-2 fa-2x fa fa-frown-o' />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className={`rounded-bottom ${
            userContext.userData.theme === "dark"
              ? "bg-dark text-white"
              : "bg-white text-dark"
          }`}
        >
          <div>
            <div className='py-2'>
              Please help us serve you better, what made you to step out ?
            </div>
            {closeAccountReasons.map((cl, i) => (
              <label key={cl.value} htmlFor={cl.value} className='d-block'>
                <input
                  id={cl.value}
                  name='abc'
                  type='checkbox'
                  onChange={() => false}
                />
                <span className='ps-2'>{cl.label}</span>
              </label>
            ))}
            <textarea
              placeholder='Comments'
              rows={5}
              style={{ resize: "none" }}
              className='form-control my-2'
            />
            <Button variant='danger' className='w-100 my-2'>
              Close account
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <div
        onClick={() => setShow(true)}
        className='link-danger cursor-pointer d-flex align-items-center justify-content-center'
      >
        <i className='fa fa-frown-o fa-2x pe-2' />
        <span>I am not happy, close my account.</span>
      </div>
    </div>
  );
};

export default CloseAccount;
