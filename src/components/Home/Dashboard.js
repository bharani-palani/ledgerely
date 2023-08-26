import React from "react";

const Dashboard = props => {
  return (
    <div className='container-fluid'>
      <h3 className='text-danger'>Dashboard</h3>
      <pre>{JSON.stringify(process.env, null, 2)}</pre>
    </div>
  );
};

export default Dashboard;
