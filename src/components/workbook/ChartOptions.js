import React from "react";
import { Container } from "react-bootstrap";
import NumberSlider from "./ReactiveElements/NumberSlider";

const ChartOptions = props => {
  const optionList = [
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
  ];

  const callBack = params => {
    console.log("bbb", params);
  };

  return (
    <Container
      className='py-2'
      style={{
        maxHeight: "calc(100vh - 160px)",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <div>
        {optionList.map(list => {
          const Component = list.component;
          return <Component key={list.options.id} {...list.options} />;
        })}
      </div>
    </Container>
  );
};

export default ChartOptions;
