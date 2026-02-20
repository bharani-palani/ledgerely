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
import { animationList } from "../../components/shared/D3/constants";
// import { CHART_SIZE } from "../../components/shared/D3/constants";
import { useIntl, FormattedMessage } from "react-intl";
import { useCommonFunctions } from "./commonFunctions";

const ChartOptions = () => {
  const intl = useIntl();
  const workbookContext = useContext(WorkbookContext);
  const { theme, sheets, setSheets, activeSheet, activeChart, setFile } = workbookContext;
  const [selectedChartProps, setSelectedChartProps] = useState({});
  const { callBack } = useCommonFunctions();

  const optionList = [
    {
      id: "size",
      label: intl.formatMessage({
        id: "size",
        defaultMessage: "size",
      }),
      elements: [
        // {
        //   component: NumberSlider,
        //   options: {
        //     id: "width",
        //     title: "Width",
        //     min: CHART_SIZE.minWidth,
        //     max: CHART_SIZE.maxWidth,
        //     step: 1,
        //     init: 350,
        //     units: "px",
        //     onChange: data => callBack(data),
        //   },
        // },
        // {
        //   component: NumberSlider,
        //   options: {
        //     id: "height",
        //     title: "Height",
        //     min: CHART_SIZE.minHeight,
        //     max: CHART_SIZE.maxHeight,
        //     step: 1,
        //     init: 500,
        //     units: "px",
        //     onChange: data => callBack(data),
        //   },
        // },
        {
          component: NumberSlider,
          options: {
            id: "innerRadius",
            title: intl.formatMessage({
              id: "innerRadius",
              defaultMessage: "innerRadius",
            }),
            min: 0,
            max: 100,
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
            title: intl.formatMessage({
              id: "outerRadius",
              defaultMessage: "outerRadius",
            }),
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
            id: "borderRadius",
            title: intl.formatMessage({
              id: "borderRadius",
              defaultMessage: "borderRadius",
            }),
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
            id: "markerSize",
            title: intl.formatMessage({
              id: "markerSize",
              defaultMessage: "markerSize",
            }),
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
            title: intl.formatMessage({
              id: "barHeight",
              defaultMessage: "barHeight",
            }),
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
            title: intl.formatMessage({
              id: "marginTop",
              defaultMessage: "marginTop",
            }),
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
            title: intl.formatMessage({
              id: "marginBottom",
              defaultMessage: "marginBottom",
            }),
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
            title: intl.formatMessage({
              id: "marginLeft",
              defaultMessage: "marginLeft",
            }),
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
            title: intl.formatMessage({
              id: "marginRight",
              defaultMessage: "marginRight",
            }),
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
            title: intl.formatMessage({
              id: "padding",
              defaultMessage: "padding",
            }),
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
            id: "opacity",
            title: intl.formatMessage({
              id: "opacity",
              defaultMessage: "opacity",
            }),
            min: 0.1,
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
            title: intl.formatMessage({
              id: "fontSize",
              defaultMessage: "fontSize",
            }),
            min: 10,
            max: 100,
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
            title: intl.formatMessage({
              id: "xTicks",
              defaultMessage: "xTicks",
            }),
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
            title: intl.formatMessage({
              id: "yTicks",
              defaultMessage: "yTicks",
            }),
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
            id: "strokeWidth",
            title: intl.formatMessage({
              id: "strokeWidth",
              defaultMessage: "strokeWidth",
            }),
            min: 1,
            max: 10,
            step: 1,
            init: 1,
            units: "",
            onChange: data => callBack(data),
          },
        },
        {
          component: NumberSlider,
          options: {
            id: "rotate",
            title: intl.formatMessage({
              id: "rotate",
              defaultMessage: "rotate",
            }),
            min: 0,
            max: 360,
            step: 1,
            init: 0,
            units: "",
            onChange: data => callBack(data),
          },
        },
      ],
    },
    {
      id: "colors",
      label: intl.formatMessage({
        id: "colors",
        defaultMessage: "colors",
      }),
      elements: [
        {
          component: ColorSwatches,
          options: {
            id: "fillColor",
            title: intl.formatMessage({
              id: "fillColor",
              defaultMessage: "fillColor",
            }),
            init: [],
            onChange: data => callBack(data),
          },
        },
        {
          component: ColorSwatches,
          options: {
            id: "fontColor",
            title: intl.formatMessage({
              id: "fontColor",
              defaultMessage: "fontColor",
            }),
            init: [],
            onChange: data => callBack(data),
          },
        },
        {
          component: ColorSwatches,
          options: {
            id: "lineColor",
            title: intl.formatMessage({
              id: "lineColor",
              defaultMessage: "lineColor",
            }),
            init: [],
            onChange: data => callBack(data),
          },
        },
      ],
    },
    {
      id: "labels",
      label: intl.formatMessage({
        id: "label",
        defaultMessage: "label",
      }),
      elements: [
        {
          component: TextInput,
          options: {
            id: "name",
            title: intl.formatMessage({
              id: "name",
              defaultMessage: "name",
            }),
            init: "",
            maxLength: 100,
            onChange: data => callBack(data),
          },
        },
        {
          component: TextInput,
          options: {
            id: "xAxisLabel",
            title: intl.formatMessage({
              id: "xAxisLabel",
              defaultMessage: "xAxisLabel",
            }),
            init: "",
            maxLength: 25,
            onChange: data => callBack(data),
          },
        },
        {
          component: TextInput,
          options: {
            id: "yAxisLabel",
            title: intl.formatMessage({
              id: "yAxisLabel",
              defaultMessage: "yAxisLabel",
            }),
            init: "",
            maxLength: 25,
            onChange: data => callBack(data),
          },
        },
        {
          component: TextInput,
          options: {
            id: "tooltipPrefix",
            title: intl.formatMessage({
              id: "tooltipPrefix",
              defaultMessage: "tooltipPrefix",
            }),
            init: "",
            maxLength: 25,
            onChange: data => callBack(data),
          },
        },
        {
          component: TextInput,
          options: {
            id: "tooltipSuffix",
            title: intl.formatMessage({
              id: "tooltipSuffix",
              defaultMessage: "tooltipSuffix",
            }),
            init: "",
            maxLength: 25,
            onChange: data => callBack(data),
          },
        },
        {
          component: TextInput,
          options: {
            id: "className",
            title: intl.formatMessage({
              id: "className",
              defaultMessage: "className",
            }),
            init: "",
            maxLength: 25,
            onChange: data => callBack(data),
          },
        },
      ],
    },
    {
      id: "orientation",
      label: intl.formatMessage({
        id: "orientation",
        defaultMessage: "orientation",
      }),
      elements: [
        {
          component: Radio,
          options: {
            id: "xAxisTicksOrientation",
            title: intl.formatMessage({
              id: "xAxisTicksOrientation",
              defaultMessage: "xAxisTicksOrientation",
            }),
            init: "horizontal",
            isInline: true,
            list: [
              {
                id: "hor",
                value: "horizontal",
                label: intl.formatMessage({
                  id: "horizontal",
                  defaultMessage: "horizontal",
                }),
              },
              {
                id: "ver",
                value: "vertical",
                label: intl.formatMessage({
                  id: "vertical",
                  defaultMessage: "vertical",
                }),
              },
            ],
            onChange: data => callBack(data),
          },
        },
        {
          component: Radio,
          options: {
            id: "sortClause",
            title: intl.formatMessage({
              id: "sortClause",
              defaultMessage: "sortClause",
            }),
            init: "asc",
            isInline: true,
            list: [
              {
                id: "asc",
                value: "asc",
                label: intl.formatMessage({
                  id: "ascending",
                  defaultMessage: "ascending",
                }),
              },
              {
                id: "desc",
                value: "desc",
                label: intl.formatMessage({
                  id: "descending",
                  defaultMessage: "descending",
                }),
              },
            ],
            onChange: data => callBack(data),
          },
        },
      ],
    },
    {
      id: "selection",
      label: intl.formatMessage({
        id: "selection",
        defaultMessage: "selection",
      }),
      elements: [
        {
          component: SelectBox,
          options: {
            id: "animationClass",
            title: intl.formatMessage({
              id: "animationClass",
              defaultMessage: "animationClass",
            }),
            init: animationList[0]?.id,
            list: animationList,
            onChange: data => {
              callBack(data);
            },
          },
        },
        {
          component: SelectBox,
          options: {
            id: "fontFamily",
            title: intl.formatMessage({
              id: "fontFamily",
              defaultMessage: "fontFamily",
            }),
            init: "Arial",
            list: [
              { id: "Arial", value: "Arial" },
              { id: "cursive", value: "Cursive" },
              { id: "times-new-roman", value: "Times-new-roman" },
              { id: "monospace", value: "Monospace" },
              { id: "sans-serif", value: "Sans-serif" },
              { id: "system-ui", value: "System-ui" },
            ],
            onChange: data => {
              callBack(data);
            },
          },
        },
        {
          component: SelectBox,
          options: {
            id: "emoji",
            title: intl.formatMessage({
              id: "emoji",
              defaultMessage: "emoji",
            }),
            init: "😀",
            list: [
              { id: "😀", value: "Smile" },
              { id: "😂", value: "Smile & tears of joy" },
              { id: "😇", value: "Head around" },
              { id: "🤐", value: "Mouth zipped" },
              { id: "😡", value: "Enraged face" },
              { id: "😭", value: "Crying face" },
              { id: "😱", value: "Fear face" },
              { id: "📌", value: "Push pin" },
              { id: "❤️‍🩹", value: "Read heart" },
              { id: "👍", value: "Thumbs uip" },
              { id: "👎", value: "Thumbs down" },
              { id: "👏", value: "Clapping hands" },
              { id: "🤝", value: "Handshake" },
              { id: "🙏", value: "Folded hands" },
              { id: "🙅‍♂️", value: "Gesture no" },
              { id: "🙆‍♂️", value: "Gesture ok" },
              { id: "🙋‍♂️", value: "Raising hand" },
              { id: "🤦‍♂️", value: "Face palm" },
              { id: "🤷‍♂️", value: "shrugging" },
              { id: "👣", value: "Foot prints" },
              { id: "🚂", value: "Train" },
              { id: "🚗", value: "Car" },
              { id: "🛺", value: "Auto rickshaw" },
              { id: "🛩", value: "Airplane" },
              { id: "🚁", value: "Helicopter" },
              { id: "🌪", value: "Tornado" },
              { id: "🔥", value: "Fire" },
              { id: "💧", value: "Droplet" },
              { id: "🧨", value: "Fire cracker" },
              { id: "🔔", value: "Bell" },
              { id: "🔕", value: "Bell with slash" },
              { id: "📞", value: "Phone" },
              { id: "🖨", value: "Printer" },
              { id: "💻", value: "Computer" },
              { id: "💰", value: "Money bag" },
              { id: "💳", value: "Credit card" },
              { id: "📧", value: "Email" },
            ],
            onChange: data => {
              callBack(data);
            },
          },
        },
      ],
    },
    {
      id: "switch",
      label: intl.formatMessage({
        id: "switch",
        defaultMessage: "switch",
      }),
      elements: [
        {
          component: Switch,
          options: {
            id: "showTooltip",
            title: intl.formatMessage({
              id: "showTooltip",
              defaultMessage: "showTooltip",
            }),
            init: true,
            onChange: data => callBack(data),
          },
        },
        {
          component: Switch,
          options: {
            id: "showXaxisLabel",
            title: intl.formatMessage({
              id: "showXaxisLabel",
              defaultMessage: "showXaxisLabel",
            }),
            init: true,
            onChange: data => callBack(data),
          },
        },
        {
          component: Switch,
          options: {
            id: "showYaxisLabel",
            title: intl.formatMessage({
              id: "showYaxisLabel",
              defaultMessage: "showYaxisLabel",
            }),
            init: true,
            onChange: data => callBack(data),
          },
        },
        {
          component: Switch,
          options: {
            id: "showXaxisLine",
            title: intl.formatMessage({
              id: "showXaxisLine",
              defaultMessage: "showXaxisLine",
            }),
            init: true,
            onChange: data => callBack(data),
          },
        },
        {
          component: Switch,
          options: {
            id: "showYaxisLine",
            title: intl.formatMessage({
              id: "showYaxisLine",
              defaultMessage: "showYaxisLine",
            }),
            init: true,
            onChange: data => callBack(data),
          },
        },
        {
          component: Switch,
          options: {
            id: "showXaxis",
            title: intl.formatMessage({
              id: "showXaxis",
              defaultMessage: "showXaxis",
            }),
            init: true,
            onChange: data => callBack(data),
          },
        },
        {
          component: Switch,
          options: {
            id: "showYaxis",
            title: intl.formatMessage({
              id: "showYaxis",
              defaultMessage: "showYaxis",
            }),
            init: true,
            onChange: data => callBack(data),
          },
        },
        {
          component: Switch,
          options: {
            id: "flipXaxis",
            title: intl.formatMessage({
              id: "flipXaxis",
              defaultMessage: "flipXaxis",
            }),
            init: true,
            onChange: data => callBack(data),
          },
        },
        {
          component: Switch,
          options: {
            id: "flipYaxis",
            title: intl.formatMessage({
              id: "flipYaxis",
              defaultMessage: "flipYaxis",
            }),
            init: true,
            onChange: data => callBack(data),
          },
        },
        {
          component: Switch,
          options: {
            id: "showAnimation",
            title: intl.formatMessage({
              id: "showAnimation",
              defaultMessage: "showAnimation",
            }),
            init: true,
            onChange: data => callBack(data),
          },
        },
        {
          component: Switch,
          options: {
            id: "showLegend",
            title: intl.formatMessage({
              id: "showLegend",
              defaultMessage: "showLegend",
            }),
            init: true,
            onChange: data => callBack(data),
          },
        },
      ],
    },
    {
      id: "data",
      label: intl.formatMessage({
        id: "dataSource",
        defaultMessage: "dataSource",
      }),
      elements: [
        {
          component: DataSource,
          options: {
            id: "data",
            title: intl.formatMessage({
              id: "dataSource",
              defaultMessage: "dataSource",
            }),
            init: {},
            onChange: data => callBack(data),
          },
        },
      ],
    },
  ];

  useEffect(() => {
    const bProps = sheets.filter(f => f.id === activeSheet)[0]?.charts.filter(f => f.id === activeChart)[0]?.props;
    setSelectedChartProps({});
    setTimeout(() => {
      setSelectedChartProps(bProps);
    }, 100);
  }, [activeChart]);

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => false);

    return (
      <button
        type='button'
        className={`text-start p-1 btn btn-sm ${theme === "dark" ? "btn-black text-light" : "btn-white text-black"}`}
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
        style={{
          borderTopRightRadius: "0.25rem",
          borderTopLeftRadius: "0.25rem",
        }}
      >
        <small>
          <FormattedMessage id='chartOptions' defaultMessage='chartOptions' />
        </small>
      </div>
      <div
        className=''
        style={{
          maxHeight: "calc(100vh - 220px)",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* optionList[5].id */}
        <Accordion defaultActiveKey={null} className=''>
          <Card className={`rounded-0 ${theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"}`}>
            {selectedChartProps &&
              Object.keys(selectedChartProps).length > 0 &&
              optionList.map(list => {
                return (
                  list.elements.filter(e => Object.keys(selectedChartProps).includes(e.options.id)).length > 0 && (
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
                              Object.prototype.hasOwnProperty.call(selectedChartProps, ele.options.id) && (
                                <Component key={ele.options.id} {...defaultMerge} />
                              )
                            );
                          })}
                        </Card.Body>
                      </Accordion.Collapse>
                    </React.Fragment>
                  )
                );
              })}
          </Card>
        </Accordion>
      </div>
    </div>
  );
};

export default ChartOptions;
