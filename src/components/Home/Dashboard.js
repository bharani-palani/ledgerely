import React from "react";
import PropTypes from "prop-types";

const Dashboard = props => {
  return (
    <div className='container-fluid'>
      <h3 className='text-danger'>Dashboard</h3>
      <pre>{JSON.stringify(process.env, null, 2)}</pre>
    </div>
  );
};

Dashboard.propTypes = {
  property: PropTypes.value,
};
Dashboard.defaultProps = {};

export default Dashboard;
