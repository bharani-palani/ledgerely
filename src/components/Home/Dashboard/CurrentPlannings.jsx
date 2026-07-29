import React, { useMemo } from "react";
import { VerticalBarChart } from "../../shared/D3";
import helpers from "../../../helpers";
import { FormattedMessage, useIntl } from "react-intl";
import { DraggerText } from "./index";
import moment from "moment";

const FILLCOLOR = [
  helpers.bootstrapColorVariables[8],
  helpers.bootstrapColorVariables[0],
  helpers.bootstrapColorVariables[4],
  helpers.bootstrapColorVariables[6],
];

const CurrentPlannings = ({ width, intlHeader, currentMonthData }) => {
  const intl = useIntl();
  const { achievedPlanCount = 0, badPlanCount = 0, dated = 0, goodPlanCount = 0, noPlanCount = 0 } = currentMonthData ?? {};
  const pieces = useMemo(() => {
    const [month, year] = dated ? dated.split("-") : [moment().format("MMM"), moment().format("YYYY")];
    return {
      month: month.toLowerCase(),
      year,
    };
  }, [dated]);

  const labels = useMemo(
    () => ({
      good: intl.formatMessage({ id: "goodPlans", defaultMessage: "goodPlans" }),
      achieved: intl.formatMessage({ id: "achievedPlans", defaultMessage: "achievedPlans" }),
      bad: intl.formatMessage({ id: "badPlans", defaultMessage: "badPlans" }),
      noPlan: intl.formatMessage({ id: "noPlans", defaultMessage: "noPlans" }),
      type: intl.formatMessage({ id: "type", defaultMessage: "type" }),
      size: intl.formatMessage({ id: "size", defaultMessage: "size" }),
    }),
    [intl],
  );

  const data = useMemo(
    () => [
      { label: labels.good, value: goodPlanCount },
      { label: labels.achieved, value: achievedPlanCount },
      { label: labels.bad, value: badPlanCount },
      { label: labels.noPlan, value: noPlanCount },
    ],
    [labels, goodPlanCount, achievedPlanCount, badPlanCount, noPlanCount],
  );

  const chartWidth = useMemo(() => (window.innerWidth > 450 ? width / 2 : width), [width]);

  return (
    <div>
      <DraggerText>
        <FormattedMessage id={intlHeader} defaultMessage={intlHeader} />
      </DraggerText>
      {data.length > 0 && (
        <VerticalBarChart
          height={250}
          padding={0}
          width={chartWidth}
          data={data}
          showLegend={true}
          marginBottom={70}
          fillColor={FILLCOLOR}
          xAxisLabel={`${intl.formatMessage({
            id: pieces?.month,
            defaultMessage: pieces?.month,
          })} ${pieces?.year}`}
          yAxisLabel={intl.formatMessage({
            id: "size",
            defaultMessage: "size",
          })}
        />
      )}
    </div>
  );
};

export default React.memo(CurrentPlannings);
