import React from "react";
import { VerticalBarChart } from "../../shared/D3";
import helpers from "../../../helpers";
import { FormattedMessage, useIntl } from "react-intl";
import { DraggerText } from "./index";

const CurrentPlannings = ({ width, intlHeader }) => {
  const intl = useIntl();

  const data = [
    {
      label: intl.formatMessage({
        id: "goodPlans",
        defaultMessage: "goodPlans",
      }),
      value: 15,
    },
    {
      label: intl.formatMessage({
        id: "achievedPlans",
        defaultMessage: "achievedPlans",
      }),
      value: 10,
    },
    {
      label: intl.formatMessage({
        id: "badPlans",
        defaultMessage: "badPlans",
      }),
      value: 41,
    },
    {
      label: intl.formatMessage({
        id: "noPlans",
        defaultMessage: "noPlans",
      }),
      value: 61,
    },
  ];
  return (
    <div>
      <DraggerText>
        <FormattedMessage id={intlHeader} defaultMessage={intlHeader} />
      </DraggerText>
      <VerticalBarChart
        height={250}
        padding={0}
        width={window.innerWidth > 450 ? width / 2 : width}
        data={data}
        showLegend={false}
        fillColor={[
          helpers.bootstrapColorVariables[8],
          helpers.bootstrapColorVariables[0],
          helpers.bootstrapColorVariables[4],
          helpers.bootstrapColorVariables[6],
        ]}
        xAxisLabel={intl.formatMessage({
          id: "plan",
          defaultMessage: "plan",
        })}
        yAxisLabel={intl.formatMessage({
          id: "size",
          defaultMessage: "size",
        })}
      />
    </div>
  );
};

export default CurrentPlannings;
