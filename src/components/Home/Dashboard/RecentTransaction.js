import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { VerticalBarChart } from "../../shared/D3";
import { NoContent, DraggerText } from "./index";
import helpers from "../../../helpers";
import { UserContext } from "../../../contexts/UserContext";

const RecentTransaction = ({ width, recentData, intlHeader }) => {
  const userContext = useContext(UserContext);
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
            height={300}
            data={recentData}
            marginLeft={50}
            marginBottom={0}
            marginTop={20}
            showXaxis={true}
            showYaxis={true}
            showXaxisLabel={false}
            showYaxisLabel={false}
            padding={0.5}
            yTicks={4}
            style={{
              maxWidth: "100%",
              boxShadow: "none",
            }}
            showAnimation={false}
            fontSize={10}
            fillColor={helpers.bootstrapColorVariables[2]}
            lineColor={helpers.bootstrapColorVariables[3]}
            fontColor={userContext.userData.theme === "dark" ? "#6c757d" : "#000000"}
          />
        )}
        {recentData?.length === 0 && <NoContent />}
      </div>
    </div>
  );
};

export default RecentTransaction;
