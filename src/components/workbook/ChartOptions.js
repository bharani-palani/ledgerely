import React, { useContext } from "react";
import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import NumberSlider from "./ReactiveElements/NumberSlider";
import ColorSwatches from "./ReactiveElements/ColorSwatches";
import WorkbookContext from "./WorkbookContext";

const ChartOptions = props => {
  const workbookContext = useContext(WorkbookContext);
  const { theme } = workbookContext;
  const optionList = [
    {
      id: "size",
      label: "Size",
      elements: [
        {
          component: NumberSlider,
          options: {
            id: "width",
            title: "Width",
            min: 100,
            max: 1000,
            init: 350,
            onChange: data => callBack(data),
          },
        },
        {
          component: NumberSlider,
          options: {
            id: "height",
            title: "Height",
            min: 100,
            max: 1000,
            init: 500,
            onChange: data => callBack(data),
          },
        },
        {
          component: NumberSlider,
          options: {
            id: "innerRadius",
            title: "Inner Radius",
            min: 1,
            max: 10,
            init: 5,
            onChange: data => callBack(data),
          },
        },
        {
          component: NumberSlider,
          options: {
            id: "outerRadius",
            title: "Outer Radius",
            min: 1,
            max: 10,
            init: 5,
            onChange: data => callBack(data),
          },
        },
        {
          component: NumberSlider,
          options: {
            id: "barHeight",
            title: "Bar Height",
            min: 1,
            max: 10,
            init: 5,
            onChange: data => callBack(data),
          },
        },
        {
          component: NumberSlider,
          options: {
            id: "marginTop",
            title: "Margin Top",
            min: 0,
            max: 50,
            init: 5,
            onChange: data => callBack(data),
          },
        },
        {
          component: NumberSlider,
          options: {
            id: "marginBottom",
            title: "Margin Bottom",
            min: 0,
            max: 50,
            init: 5,
            onChange: data => callBack(data),
          },
        },
        {
          component: NumberSlider,
          options: {
            id: "marginLeft",
            title: "Margin Left",
            min: 0,
            max: 50,
            init: 5,
            onChange: data => callBack(data),
          },
        },
        {
          component: NumberSlider,
          options: {
            id: "marginRight",
            title: "Margin Right",
            min: 0,
            max: 50,
            init: 5,
            onChange: data => callBack(data),
          },
        },
      ],
    },
    {
      id: "colors",
      label: "Colors",
      elements: [
        {
          component: ColorSwatches,
          options: {
            id: "fillColor",
            title: "Fill Color",
            init: [],
            onChange: data => callBack(data),
          },
        },
        {
          component: ColorSwatches,
          options: {
            id: "fontColor",
            title: "Font Color",
            init: [],
            onChange: data => callBack(data),
          },
        },
        {
          component: ColorSwatches,
          options: {
            id: "lineColor",
            title: "Line Color",
            init: [],
            onChange: data => callBack(data),
          },
        },
      ],
    },
  ];

  const callBack = params => {
    console.log("bbb", params);
  };

  function CustomToggle({ children, eventKey, eventLabel }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => false);

    return (
      <button
        type='button'
        className={`text-start p-1 btn btn-sm ${
          theme === "dark" ? "btn-black text-light" : "btn-white text-black"
        }`}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  return (
    <div>
      <div className='px-2 py-1 border-bottom border-secondary'>
        Chart Options
      </div>
      <div
        className=''
        style={{
          maxHeight: "calc(100vh - 185px)",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Accordion defaultActiveKey={optionList[1].id} className=''>
          <Card
            className={`border-0 rounded-0 ${
              theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"
            }`}
          >
            {optionList.map(list => {
              return (
                <React.Fragment key={list.id}>
                  <Card.Header className='row m-0 p-0 rounded-0'>
                    <CustomToggle eventLabel={list.label} eventKey={list.id}>
                      {list.label}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey={list.id}>
                    <Card.Body className='p-2'>
                      {list.elements.map(ele => {
                        const Component = ele.component;
                        return (
                          <Component key={ele.options.id} {...ele.options} />
                        );
                      })}
                    </Card.Body>
                  </Accordion.Collapse>
                </React.Fragment>
              );
            })}
          </Card>
        </Accordion>
      </div>
    </div>
  );
};

export default ChartOptions;
