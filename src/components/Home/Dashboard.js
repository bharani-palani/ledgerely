import React from "react";
import PropTypes from "prop-types";

const Dashboard = props => {
  return (
    <div className='mx-2 alert alert-sm alert-danger text-center'>
      Hello Dashboard
    </div>
  );
};

Dashboard.propTypes = {
  property: PropTypes.value,
};
Dashboard.defaultProps = {};

export default Dashboard;
