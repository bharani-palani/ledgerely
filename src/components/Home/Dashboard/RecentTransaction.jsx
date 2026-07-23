import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { VerticalBarChart } from "../../shared/D3";
import { NoContent, DraggerText } from "./index";
import helpers from "../../../helpers";

const RecentTransaction = ({ width, recentData, intlHeader }) => {
  const intl = useIntl();
  return (
    <div className='pb-2'>
      <div>
        <div className='fs-6 py-2'>
          <DraggerText>
            <FormattedMessage id={intlHeader} defaultMessage={intlHeader} />
          </DraggerText>
        </div>
        {recentData?.length > 0 && (
          <VerticalBarChart
            width={window.innerWidth > 450 ? width / 2 : width}
            height={200}
            data={recentData}
            marginLeft={70}
            marginBottom={1}
            marginTop={20}
            showXaxis={true}
            showYaxis={true}
            showXaxisLabel={true}
            yAxisLabel={intl.formatMessage({
              id: "amount",
              defaultMessage: "amount",
            })}
            padding={0.5}
            yTicks={4}
            style={{
              maxWidth: "100%",
              boxShadow: "none",
            }}
            showAnimation={false}
            fontSize={12}
            fillColor={helpers.bootstrapColorVariables[2]}
            lineColor={helpers.bootstrapColorVariables[3]}
            fontColor={"currentColor"}
          />
        )}
        {recentData?.length === 0 && <NoContent />}
      </div>
    </div>
  );
};

export default RecentTransaction;
