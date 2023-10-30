import React from "react";
import { FormattedMessage } from "react-intl";
import { VerticalBarChart } from "../../shared/D3";
import { NoContent, DraggerText } from "./index";

const RecentTransaction = ({ width, recentData }) => {
  return (
    <div className='pb-2'>
      <div>
        <div className='fs-6 py-2'>
          <DraggerText>
            <FormattedMessage
              id='recentTransactions'
              defaultMessage='recentTransactions'
            />
          </DraggerText>
        </div>
        <VerticalBarChart
          width={width}
          height={150}
          data={recentData}
          marginLeft={50}
          marginBottom={0}
          marginTop={0}
          showXaxis={false}
          showYaxis={true}
          showYaxisLabel={false}
          padding={0.01}
          yTicks={4}
          style={{
            maxWidth: "100%",
            boxShadow: "none",
          }}
          showAnimation={false}
        />
        {recentData.length === 0 && <NoContent />}
      </div>
    </div>
  );
};

export default RecentTransaction;
