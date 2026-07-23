import React, { useMemo } from "react";
import { VerticalBarChart } from "../../shared/D3";
import helpers from "../../../helpers";
import { FormattedMessage, useIntl } from "react-intl";
import { DraggerText } from "./index";

const FILLCOLOR = [
  helpers.bootstrapColorVariables[8],
  helpers.bootstrapColorVariables[0],
  helpers.bootstrapColorVariables[4],
  helpers.bootstrapColorVariables[6],
];

const CurrentPlannings = ({ width, intlHeader, currentMonthData }) => {
  const intl = useIntl();
  const { achievedPlanCount, badPlanCount, dated, goodPlanCount, noPlanCount } = currentMonthData;
  const pieces = useMemo(() => {
    const [month, year] = dated.split("-");
    return {
      month: month.toLowerCase(),
      year,
    };
  }, [dated]);

  const labels = useMemo(
    () => ({
      good: intl.formatMessage({ id: "goodPlans" }),
      achieved: intl.formatMessage({ id: "achievedPlans" }),
      bad: intl.formatMessage({ id: "badPlans" }),
      noPlan: intl.formatMessage({ id: "noPlans" }),
      type: intl.formatMessage({ id: "type" }),
      size: intl.formatMessage({ id: "size" }),
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
