import React, { useContext } from "react";
import WorkbookContext from "./WorkbookContext";
import { Popover, OverlayTrigger } from "react-bootstrap";
import Slider from "react-rangeslider";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { v4 as uuidv4 } from "uuid";

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
      <div
        className='d-flex'
        style={{ width: "100%", overflowX: "auto", overflowY: "hidden" }}
      >
        {children}
      </div>
    );
  });

  const onAddSheet = () => {
    const newObject = {
      id: uuidv4(),
      order: sheets.length,
      label: `Sheet ${sheets.length + 1}`,
      data: {},
    };
    const newArray = [...sheets, newObject];
    setSheets(newArray);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setSheets(prevState => {
      const newItems = [...prevState];
      newItems[newIndex].order = oldIndex;
      newItems[oldIndex].order = newIndex;
      return newItems.sort((a, b) => a.order - b.order);
    });
  };

  return (
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
      <button className={`btn btn-sm btn-${theme} border-0 px-3 rounded-0`}>
        <i className='fa fa-chevron-left' />
      </button>
      <SortableContainer
        pressDelay={200}
        onSortEnd={onSortEnd}
        lockAxis={"x"}
        disableAutoscroll={true}
        keyboardSortingTransitionDuration={1000}
        axis={"xy"}
      >
        {sheets.map((sheet, i) => {
          const Component = sortableElement(() => (
            <div
              className={`cursor-pointer d-flex border-3 align-items-center ${
                activeSheet === i ? "bni-bg" : `bg-${theme}`
              }`}
            >
              <OverlayTrigger
                trigger='click'
                placement='top'
                overlay={popover({ data: { sheet, i } })}
                rootClose
              >
                <i className='fa fa-cog px-2' />
              </OverlayTrigger>
              <div
                style={{ minWidth: 120 }}
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
