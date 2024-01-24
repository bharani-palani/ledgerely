import React, { useContext, useEffect, useRef, useState } from "react";
import WorkbookContext from "./WorkbookContext";
import { Popover, OverlayTrigger, Modal, Form, Button } from "react-bootstrap";
import Slider from "react-rangeslider";
import {
  sortableContainer,
  sortableElement,
  arrayMove,
} from "react-sortable-hoc";
import { v4 as uuidv4 } from "uuid";
import { FormattedMessage, useIntl } from "react-intl";
import ConfirmationModal from "../configuration//Gallery/ConfirmationModal";

const SheetPane = props => {
  const intl = useIntl();
  const workbookContext = useContext(WorkbookContext);
  const {
    sheets,
    setSheets,
    theme,
    activeSheet,
    setActiveSheet,
    zoom,
    setZoom,
  } = workbookContext;
  const { styles } = props;
  const minZoom = 50;
  const maxZoom = 150;
  const [openModal, setOpenModal] = useState({
    state: false,
    id: null,
    label: null,
    source: null,
  });
  const elementRef = useRef([]);
  const parentRef = useRef(null);

  useEffect(() => {
    const firstIndex = sheets[0].id;
    setActiveSheet(firstIndex);
  }, []);

  const popover = sheetObj => (
    <Popover id='popover-basic'>
      <Popover.Header as='div' className={`bni-bg bni-text`}>
        Actions
      </Popover.Header>
      <Popover.Body className='p-0'>
        <ul className='list-group list-group-flush'>
          <li
            className={`list-group-item cursor-pointer`}
            onClick={() =>
              setOpenModal(prev => ({
                ...prev,
                state: true,
                id: sheetObj.id,
                label: sheetObj.label,
                source: "rename",
              }))
            }
          >
            Rename
          </li>
          {sheets.length > 1 && (
            <li
              className='list-group-item cursor-pointer text-danger'
              onClick={() =>
                setOpenModal(prev => ({
                  ...prev,
                  state: true,
                  id: sheetObj.id,
                  label: sheetObj.label,
                  source: "delete",
                }))
              }
            >
              Delete
            </li>
          )}
          <li
            onClick={() => onDuplicate(sheetObj)}
            className='list-group-item cursor-pointer rounded-bottom'
          >
            Duplicate
          </li>
        </ul>
      </Popover.Body>
    </Popover>
  );

  const SortableContainer = sortableContainer(({ children }) => {
    return (
      <div
        className='d-flex noScroll'
        style={{ width: "100%", overflowX: "auto", overflowY: "hidden" }}
        ref={parentRef}
      >
        {children}
      </div>
    );
  });

  const onDuplicate = sheetObj => {
    const cloneObj = { ...sheetObj };
    const newSheetId = uuidv4();
    const newSheet = {
      id: newSheetId,
      order: sheets.length,
      label: `${cloneObj.label} (Copy)`.substring(0, 15),
      data: cloneObj.data,
    };
    const bSheets = [...sheets, newSheet];
    setSheets(bSheets);
    setTimeout(() => {
      setActiveSheet(newSheetId);
    }, [500]);
  };

  const onAddSheet = () => {
    const newSheetId = uuidv4();
    const newObject = {
      id: newSheetId,
      order: sheets.length,
      label: `${intl.formatMessage({
        id: "sheet",
        defaultMessage: "sheet",
      })} ${sheets.length + 1}`,
      data: {},
    };
    const newArray = [...sheets, newObject];
    setSheets(newArray);
    setTimeout(() => {
      setActiveSheet(newSheetId);
    }, 500);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const movedArray = arrayMove(sheets, oldIndex, newIndex);
    setSheets(movedArray);
  };

  const OnRename = () => {
    const id = openModal.id;
    const newSheets = sheets.map((s, i) => {
      if (s.id === id) {
        return { ...s, label: openModal.label };
      }
      return s;
    });
    setSheets(newSheets);
    setOpenModal(prev => ({
      ...prev,
      state: false,
      id: null,
      label: null,
      source: null,
    }));
  };

  const onDeleteSheet = () => {
    const id = openModal.id;
    const newSheets = sheets.filter(s => s.id !== id);
    setSheets(newSheets);
    setActiveSheet(() => newSheets[0].id);
    setOpenModal(prev => ({
      ...prev,
      state: false,
      id: null,
      label: null,
      source: null,
    }));
  };

  const onMoveSheet = incDec => {
    let selectedOrder = sheets.findIndex(s => s.id === activeSheet);
    selectedOrder = incDec ? selectedOrder + 1 : selectedOrder - 1;
    if (selectedOrder > -1 && selectedOrder < sheets.length) {
      const newSheetId = sheets[selectedOrder].id;
      setActiveSheet(newSheetId);
    }
  };

  useEffect(() => {
    const selectedOrder = sheets.findIndex(s => s.id === activeSheet);
    elementRef?.current[selectedOrder]?.scrollIntoView({
      inline: "start",
    });
  }, [activeSheet]);

  return (
    <>
      <ConfirmationModal
        show={openModal.state && openModal.source === "delete"}
        confirmationstring={intl.formatMessage({
          id: "areYouSureToDeleteSheet",
          defaultMessage: "areYouSureToDeleteSheet",
        })}
        handleHide={() => {
          setOpenModal(prev => ({
            ...prev,
            state: false,
            id: null,
            label: null,
            source: null,
          }));
        }}
        handleYes={() => onDeleteSheet()}
        size='md'
      />
      <Modal
        {...props}
        style={{ zIndex: 9999 }}
        show={openModal.state && openModal.source === "rename"}
        onHide={() =>
          setOpenModal(prev => ({
            ...prev,
            state: false,
            id: null,
            label: null,
            source: null,
          }))
        }
        size='sm'
        animation={false}
        centered={true}
        backdrop='static'
      >
        <Modal.Header>
          <Modal.Title>
            <FormattedMessage id='renameSheet' defaultMessage='renameSheet' />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className={`container-fluid rounded-bottom ${
            theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"
          }`}
        >
          <Form.Control
            type='text'
            maxLength={15}
            placeholder='Sheet name (Maximum 15 letters)'
            className='mb-2'
            onChange={e =>
              setOpenModal(prev => ({ ...prev, label: e.target.value }))
            }
            value={openModal.label}
          />
          <div className='d-flex'>
            <Button
              variant={`btn btn-${theme} w-50 me-2`}
              onClick={() =>
                setOpenModal(prev => ({
                  ...prev,
                  state: false,
                  id: null,
                  label: null,
                }))
              }
            >
              <FormattedMessage id='cancel' defaultMessage='cancel' />
            </Button>
            <Button
              variant='btn btn-bni w-50'
              disabled={!openModal?.label?.length}
              onClick={() => OnRename()}
            >
              <FormattedMessage id='submit' defaultMessage='submit' />
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <div
        className={`d-flex border border-1 ${
          theme === "dark" ? "border-secondary" : ""
        } rounded-bottom border-top-0`}
        style={{ ...styles }}
      >
        <button
          className='btn btn-sm btn-bni border-0 px-3'
          onClick={onAddSheet}
          style={{
            borderRadius: "0px 0px 0px 5px",
          }}
        >
          <i className='fa fa-plus' />
        </button>
        <button
          onClick={() => onMoveSheet(0)}
          className={`btn btn-sm btn-${theme} border-0 border-end border-secondary px-2 rounded-0`}
          disabled={sheets.findIndex(s => s.id === activeSheet) === 0}
        >
          <i className='fa fa-chevron-left' />
        </button>
        <SortableContainer
          pressDelay={200}
          onSortEnd={onSortEnd}
          lockAxis={"x"}
          axis={"x"}
        >
          {sheets.map((sheet, i) => {
            const Component = sortableElement(() => (
              <div
                className={`cursor-pointer d-flex border-3 align-items-center bg-${theme}`}
                ref={ref => {
                  elementRef.current[i] = ref;
                }}
              >
                <OverlayTrigger
                  trigger='click'
                  placement='top'
                  overlay={popover(sheet)}
                  rootClose
                >
                  <i className={`fa fa-cog px-2`} />
                </OverlayTrigger>
                <div
                  style={{ minWidth: 130 }}
                  className={`rounded-0 btn btn-sm btn-${
                    activeSheet === sheet.id ? "bni" : theme
                  } border-0 border-end ${
                    theme === "dark" ? "border-secondary" : ""
                  }`}
                  onClick={() => setActiveSheet(sheet.id)}
                >
                  {sheet.label}
                </div>
              </div>
            ));
            return <Component key={sheet.id} index={i} />;
          })}
        </SortableContainer>
        <button
          onClick={() => onMoveSheet(1)}
          className={`btn btn-sm btn-${theme} border-0 border-0 border-start border-end border-secondary px-2 rounded-0`}
          disabled={
            sheets.findIndex(s => s.id === activeSheet) === sheets.length - 1
          }
        >
          <i className='fa fa-chevron-right' />
        </button>
        <div className='d-flex align-items-center'>
          <div className='px-1'>
            <i
              className='fa fa-minus cursor-pointer'
              onClick={() =>
                zoom <= maxZoom && zoom > minZoom && setZoom(prev => prev - 1)
              }
            />
          </div>
          <div className='' style={{ width: "150px" }}>
            <Slider
              min={minZoom}
              max={maxZoom}
              value={zoom}
              step={1}
              orientation='horizontal'
              onChange={v => setZoom(v)}
              tooltip={false}
            />
          </div>
          <div className='px-1'>
            {" "}
            <i
              className='fa fa-plus cursor-pointer'
              onClick={() =>
                zoom < maxZoom && zoom >= minZoom && setZoom(prev => prev + 1)
              }
            />
          </div>
          <div className='px-1 w-50px'>{zoom}%</div>
        </div>
      </div>
    </>
  );
};

export default SheetPane;
