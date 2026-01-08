import React from "react";
import { WordCloudChart } from "../../shared/D3";
import helpers from "../../../helpers";
import { NoContent, DraggerText } from "./index";
import { FormattedMessage } from "react-intl";

const Weightage = ({ chartData }) => {
  if (chartData && chartData?.donutChartData[3]?.data) {
    const wordCloudChartData = [...chartData?.donutChartData[3]?.data, ...chartData?.pieChartData[3]?.data].map((item, i) => ({
      text: item.label,
      value: +item.value,
    }));

    const data = {
      name: "Word cloud chart",
      rotate: 0,
      minWidth: window.innerWidth > 450 ? 600 : 400,
      minHeight: 200,
      width: window.innerWidth > 450 ? 600 : 400,
      height: 300,
      data: wordCloudChartData,
      fontColor: wordCloudChartData && helpers.getCountableRotatableColors(wordCloudChartData.length),
      padding: 1,
      showAnimation: false,
      animationClass: "",
      opacity: 1,
    };
    return (
      <div className='py-2'>
        <DraggerText>
          <FormattedMessage id={"total"} defaultMessage={"total"} /> <FormattedMessage id={"category"} defaultMessage={"category"} />{" "}
          <FormattedMessage id={"expense"} defaultMessage={"expense"} />
        </DraggerText>
        {wordCloudChartData?.length === 0 ? <NoContent /> : <WordCloudChart {...data} />}
      </div>
    );
  }
};

export default Weightage;
