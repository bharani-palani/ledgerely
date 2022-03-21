import React, { useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap';

function OffCanvas({ btnValue, btnClassName, label, children, ...props }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Button dangerouslySetInnerHTML={{__html: btnValue}} className={btnClassName} onClick={handleShow}>        
        </Button>
        <Offcanvas show={show} onHide={handleClose} {...props}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>{label}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            {children}
            </Offcanvas.Body>
        </Offcanvas>
        </>
    );
}

export default OffCanvas;