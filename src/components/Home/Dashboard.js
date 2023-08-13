import React from "react";
import PropTypes from "prop-types";

const Dashboard = props => {
  return (
    <div className='mx-2 alert alert-sm alert-primary text-center'>
      Dashboard
    </div>
  );
};

Dashboard.propTypes = {
  property: PropTypes.value,
};
Dashboard.defaultProps = {};

export default Dashboard;
