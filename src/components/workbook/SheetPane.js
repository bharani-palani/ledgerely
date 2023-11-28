import React, { useContext } from "react";
import WorkbookContext from "./WorkbookContext";
import { FormattedMessage } from "react-intl";
import { Popover, OverlayTrigger } from "react-bootstrap";
import Slider from "react-rangeslider";
import { sortableContainer, sortableElement } from "react-sortable-hoc";

const SheetPane = props => {
  const workbookContext = useContext(WorkbookContext);
  const {
    sheets,
    setSheets,
    theme,
    activeSheet,
    setActiveSheet,
    zoom,
    setZoom,
    maxZoom,
  } = workbookContext;
  const { styles } = props;

  const popover = r => (
    <Popover id='popover-basic'>
      <Popover.Header as='div' className={`bni-bg bni-text`}>
        Actions
      </Popover.Header>
      <Popover.Body className='p-0'>
        <ul className='list-group list-group-flush'>
          <li className={`list-group-item cursor-pointer`}>Rename</li>
          <li className='list-group-item cursor-pointer'>Duplicate</li>
          <li className='list-group-item cursor-pointer text-danger rounded-bottom'>
            Delete
          </li>
        </ul>
      </Popover.Body>
    </Popover>
  );

  const SortableContainer = sortableContainer(({ children }) => {
    return (
      <div className='d-flex' style={{ width: "100%", overflowX: "auto" }}>
        {children}
      </div>
    );
  });

  return (
    <div
      className={`d-flex border border-1 ${
        theme === "dark" ? "border-secondary" : ""
      } rounded-bottom border-top-0`}
      style={{ ...styles }}
    >
      <div className='d-flex px-2 align-items-center'>
        <i className={`fa fa-book fa-1x px-1`}></i>
        <FormattedMessage id='workbook' defaultMessage='workbook' />
      </div>
      <button
        className='btn btn-sm btn-bni border-0 px-3 rounded-0'
        onClick={() => setSheets(prevState => prevState + 1)}
      >
        <i className='fa fa-plus' />
      </button>
      <button className={`btn btn-sm btn-${theme} border-0 px-3 rounded-0`}>
        <i className='fa fa-chevron-left' />
      </button>
      <SortableContainer
        pressDelay={100}
        onSortEnd={() => false}
        lockAxis={"x"}
      >
        {new Array(sheets).fill(`Sheet `).map((s, i) => {
          const Component = sortableElement(() => (
            <div
              className={`cursor-pointer d-flex border-3 align-items-center ${
                activeSheet === i ? "bni-bg" : `bg-${theme}`
              }`}
            >
              <OverlayTrigger
                trigger='click'
                placement='top'
                overlay={popover({ data: { s, i } })}
                rootClose
              >
                <i className='fa fa-cog px-2' />
              </OverlayTrigger>
              <button
                style={{ minWidth: 120 }}
                className={`rounded-0 btn btn-sm btn-${
                  activeSheet === i ? "bni" : theme
                } border-0 border-end ${
                  theme === "dark" ? "border-secondary" : ""
                }`}
                onClick={() => setActiveSheet(i)}
              >
                {s} {i + 1}
              </button>
            </div>
          ));
          return <Component key={i} index={i} />;
        })}
      </SortableContainer>
      <button className={`btn btn-sm btn-${theme} border-0 px-3 rounded-0`}>
        <i className='fa fa-chevron-right' />
      </button>
      <div className='d-flex align-items-center'>
        <div className='px-1'>
          <i
            className='fa fa-minus cursor-pointer'
            onClick={() =>
              zoom <= maxZoom && zoom > 0 && setZoom(prev => prev - 1)
            }
          />
        </div>
        <div className='' style={{ width: "150px" }}>
          <Slider
            min={0}
            max={100}
            value={zoom}
            step={1}
            orientation='horizontal'
            onChange={v => setZoom(v)}
          />
        </div>
        <div className='px-1'>
          {" "}
          <i
            className='fa fa-plus cursor-pointer'
            onClick={() =>
              zoom < maxZoom && zoom >= 0 && setZoom(prev => prev + 1)
            }
          />
        </div>
        <div className='px-1 w-50px'>{zoom}%</div>
      </div>
    </div>
  );
};

export default SheetPane;
