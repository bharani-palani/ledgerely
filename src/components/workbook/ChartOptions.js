import React, { useContext } from "react";
import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import NumberSlider from "./ReactiveElements/NumberSlider";
import WorkbookContext from "./WorkbookContext";

const ChartOptions = props => {
  const workbookContext = useContext(WorkbookContext);
  const { theme } = workbookContext;
  const optionList = [
    {
      id: "chartProperties",
      label: "Chart Properties",
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
          component: NumberSlider,
          options: {
            id: "padding",
            title: "Padding",
            min: 0,
            max: 50,
            init: 5,
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
          theme === "dark" ? "btn-dark" : "btn-white"
        }`}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  return (
    <div
      style={{
        maxHeight: "calc(100vh - 160px)",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Accordion defaultActiveKey={optionList[0].id} className=''>
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
  );
};

export default ChartOptions;
