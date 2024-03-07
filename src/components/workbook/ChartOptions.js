import React, { useContext, useState, useEffect, useCallback } from "react";
import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import NumberSlider from "./ReactiveElements/NumberSlider";
import ColorSwatches from "./ReactiveElements/ColorSwatches";
import WorkbookContext from "./WorkbookContext";
import TextInput from "./ReactiveElements/TextInput";
import Radio from "./ReactiveElements/Radio";
import Switch from "./ReactiveElements/Switch";
import SelectBox from "./ReactiveElements/SelectBox";
import DataSource from "./ReactiveElements/DataSource";
import _debounce from "lodash/debounce";
import { animationList } from "../../components/shared/D3/constants";

const ChartOptions = props => {
  const workbookContext = useContext(WorkbookContext);
  const { theme, sheets, setSheets, activeSheet, activeChart } =
    workbookContext;
  const [selectedChartProps, setSelectedChartProps] = useState({});

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
            max: 2000,
            step: 1,
            init: 350,
            units: "px",
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
            step: 1,
            init: 500,
            units: "px",
            onChange: data => callBack(data),
          },
        },
        {
          component: NumberSlider,
          options: {
            id: "innerRadius",
            title: "Inner Radius",
            min: 100,
            max: 1000,
            step: 1,
            init: 5,
            units: "px",
            onChange: data => callBack(data),
          },
        },
        {
          component: NumberSlider,
          options: {
            id: "outerRadius",
            title: "Outer Radius",
            min: 100,
            max: 1000,
            step: 1,
            init: 5,
            units: "px",
            onChange: data => callBack(data),
          },
        },
        {
          component: NumberSlider,
          options: {
            id: "markerSize",
            title: "Marker Size",
            min: 1,
            max: 10,
            step: 1,
            init: 5,
            units: "",
            onChange: data => callBack(data),
          },
        },
        {
          component: NumberSlider,
          options: {
            id: "barHeight",
            title: "Bar Height",
            min: 1,
            max: 50,
            step: 1,
            init: 5,
            units: "px",
            onChange: data => callBack(data),
          },
        },
        {
          component: NumberSlider,
          options: {
            id: "marginTop",
            title: "Margin Top",
            min: 0,
            max: 500,
            step: 1,
            init: 5,
            units: "px",
            onChange: data => callBack(data),
          },
        },
        {
          component: NumberSlider,
          options: {
            id: "marginBottom",
            title: "Margin Bottom",
            min: 0,
            max: 500,
            step: 1,
            init: 5,
            units: "px",
            onChange: data => callBack(data),
          },
        },
        {
          component: NumberSlider,
          options: {
            id: "marginLeft",
            title: "Margin Left",
            min: 0,
            max: 500,
            step: 1,
            init: 5,
            units: "px",
            onChange: data => callBack(data),
          },
        },
        {
          component: NumberSlider,
          options: {
            id: "marginRight",
            title: "Margin Right",
            min: 0,
            max: 500,
            step: 1,
            init: 5,
            units: "px",
            onChange: data => callBack(data),
          },
        },
        {
          component: NumberSlider,
          options: {
            id: "padding",
            title: "Padding",
            min: 0,
            max: 1,
            step: 0.1,
            init: 0.1,
            units: "",
            onChange: data => callBack(data),
          },
        },
        {
          component: NumberSlider,
          options: {
            id: "fontSize",
            title: "Font Size",
            min: 10,
            max: 40,
            step: 1,
            init: 14,
            units: "px",
            onChange: data => callBack(data),
          },
        },
        {
          component: NumberSlider,
          options: {
            id: "xTicks",
            title: "X - Ticks",
            min: 1,
            max: 50,
            step: 1,
            init: 1,
            units: "",
            onChange: data => callBack(data),
          },
        },
        {
          component: NumberSlider,
          options: {
            id: "yTicks",
            title: "Y - Ticks",
            min: 1,
            max: 50,
            step: 1,
            init: 1,
            units: "",
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
    {
      id: "labels",
      label: "Labels",
      elements: [
        {
          component: TextInput,
          options: {
            id: "name",
            title: "Name",
            init: "",
            maxLength: 25,
            onChange: data => callBack(data),
          },
        },
        {
          component: TextInput,
          options: {
            id: "xAxisLabel",
            title: "X - Axis",
            init: "",
            maxLength: 25,
            onChange: data => callBack(data),
          },
        },
        {
          component: TextInput,
          options: {
            id: "yAxisLabel",
            title: "Y - Axis",
            init: "",
            maxLength: 25,
            onChange: data => callBack(data),
          },
        },
        {
          component: TextInput,
          options: {
            id: "tooltipPrefix",
            title: "Tooltip Prefix",
            init: "",
            maxLength: 25,
            onChange: data => callBack(data),
          },
        },
        {
          component: TextInput,
          options: {
            id: "tooltipSuffix",
            title: "Tooltip Suffix",
            init: "",
            maxLength: 25,
            onChange: data => callBack(data),
          },
        },
        {
          component: TextInput,
          options: {
            id: "className",
            title: "Class Name",
            init: "",
            maxLength: 25,
            onChange: data => callBack(data),
          },
        },
      ],
    },
    {
      id: "orientation",
      label: "Orientation",
      elements: [
        {
          component: Radio,
          options: {
            id: "xAxisTicksOrientation",
            title: "X - Axis Ticks Orientation",
            init: "horizontal",
            isInline: true,
            list: [
              { id: "hor", value: "horizontal", label: "Horizontal" },
              { id: "ver", value: "vertical", label: "Vertical" },
            ],
            onChange: data => callBack(data),
          },
        },
        {
          component: Radio,
          options: {
            id: "sortClause",
            title: "Sort Clause",
            init: "asc",
            isInline: true,
            list: [
              { id: "asc", value: "asc", label: "Ascending" },
              { id: "desc", value: "desc", label: "Descending" },
            ],
            onChange: data => callBack(data),
          },
        },
      ],
    },
    {
      id: "selection",
      label: "Selection",
      elements: [
        {
          component: SelectBox,
          options: {
            id: "animationClass",
            title: "Animation name",
            init: animationList[0]?.id,
            list: animationList,
            onChange: data => {
              console.log("bbb", data);
              callBack(data);
            },
          },
        },
      ],
    },
    {
      id: "switch",
      label: "Switch",
      elements: [
        {
          component: Switch,
          options: {
            id: "showTooltip",
            title: "Show Tooltip",
            init: true,
            onChange: data => callBack(data),
          },
        },
        {
          component: Switch,
          options: {
            id: "showXaxisLabel",
            title: "Show X - Axis Label",
            init: true,
            onChange: data => callBack(data),
          },
        },
        {
          component: Switch,
          options: {
            id: "showYaxisLabel",
            title: "Show Y - Axis Label",
            init: true,
            onChange: data => callBack(data),
          },
        },
        {
          component: Switch,
          options: {
            id: "showXaxisLine",
            title: "Show X - Axis Line",
            init: true,
            onChange: data => callBack(data),
          },
        },
        {
          component: Switch,
          options: {
            id: "showYaxisLine",
            title: "Show Y - Axis Line",
            init: true,
            onChange: data => callBack(data),
          },
        },
        {
          component: Switch,
          options: {
            id: "showXaxis",
            title: "Show X - Axis",
            init: true,
            onChange: data => callBack(data),
          },
        },
        {
          component: Switch,
          options: {
            id: "showYaxis",
            title: "Show Y - Axis",
            init: true,
            onChange: data => callBack(data),
          },
        },
        {
          component: Switch,
          options: {
            id: "showAnimation",
            title: "Show Animation",
            init: true,
            onChange: data => callBack(data),
          },
        },
        {
          component: Switch,
          options: {
            id: "showLegend",
            title: "Show Legend",
            init: true,
            onChange: data => callBack(data),
          },
        },
      ],
    },
    {
      id: "data",
      label: "Data Source",
      elements: [
        {
          component: DataSource,
          options: {
            id: "data",
            title: "Data Source",
            init: {},
            onChange: data => callBack(data),
          },
        },
      ],
    },
  ];

  useEffect(() => {
    const bProps = sheets
      .filter(f => f.id === activeSheet)[0]
      ?.charts.filter(f => f.id === activeChart)[0]?.props;
    setSelectedChartProps({});
    setTimeout(() => {
      setSelectedChartProps(bProps);
    }, 100);
  }, [activeChart]);

  const callBack = useCallback(
    _debounce(params => {
      fn(params);
    }, 300),
    [activeSheet, activeChart],
  );

  const fn = params => {
    const newSheet = sheets.map(sheet => {
      if (sheet.id === activeSheet) {
        sheet.charts = sheet.charts.map(chart => {
          if (chart.id === activeChart) {
            chart.props = { ...chart.props, [params.id]: params.value };
          }
          return chart;
        });
      }
      return sheet;
    });
    setSheets(newSheet);
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
      <div
        className={`px-2 py-1 border-1 border-start border-${theme} bni-bg text-black`}
        style={{ borderTopRightRadius: "0.25rem" }}
      >
        <small>Chart Options</small>
      </div>
      <div
        className=''
        style={{
          maxHeight: "calc(100vh - 185px)",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* //optionList[5].id */}
        <Accordion defaultActiveKey={null} className=''>
          <Card
            className={`border-0 rounded-0 ${
              theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"
            }`}
          >
            {selectedChartProps &&
              Object.keys(selectedChartProps).length > 0 &&
              optionList.map(list => {
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
                          const defaultMerge = {
                            ...ele.options,
                            init: selectedChartProps[ele.options.id],
                          };
                          return (
                            selectedChartProps.hasOwnProperty(
                              ele.options.id,
                            ) && (
                              <Component
                                key={ele.options.id}
                                {...defaultMerge}
                              />
                            )
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
