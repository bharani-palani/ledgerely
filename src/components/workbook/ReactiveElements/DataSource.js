import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import WorkbookContext from "../WorkbookContext";

const DataSource = props => {
  // const { id, title, onChange } = props;
  const workbookContext = useContext(WorkbookContext);
  const { theme } = workbookContext;
  const [show, setShow] = useState(false);

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        size='xl'
        backdrop='static'
        style={{ zIndex: 9999 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Data Source</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className={`p-2 ${
            theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"
          }`}
        >
          content
        </Modal.Body>
        <Modal.Footer
          className={`border-0 rounded-bottom py-1 px-1 ${
            theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"
          }`}
        >
          <button className='btn btn-bni'>Load</button>
        </Modal.Footer>
      </Modal>
      <div
        onClick={() => setShow(!show)}
        className='p-5 cursor-pointer bni-border bni-border-all rounded-3 icon-bni d-flex align-items-center justify-content-center'
      >
        <div>Click to load data</div>
      </div>
    </>
  );
};

export default DataSource;
