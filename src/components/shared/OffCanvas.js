import React, { useState, useContext } from 'react'
import { Button, Offcanvas } from 'react-bootstrap';
import { UserContext } from "../../contexts/UserContext";

function OffCanvas({ btnValue, btnClassName, label, children, ...props }) {
    const [show, setShow] = useState(false);
    const userContext = useContext(UserContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Button dangerouslySetInnerHTML={{__html: btnValue}} className={btnClassName} onClick={handleShow}>        
        </Button>
        <Offcanvas show={show} onHide={handleClose} {...props} className={`${userContext.userData.theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>{label}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className={`${userContext.userData.theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
            {children}
            </Offcanvas.Body>
        </Offcanvas>
        </>
    );
}

export default OffCanvas;