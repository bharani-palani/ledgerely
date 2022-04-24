const baseUrl = () => {
  const dev = 'http://localhost:8080/moneyPlanner/services';
  const prod = 'https://apps.bharani.tech/services';
  return process.env.NODE_ENV === 'development' ? dev : prod;
};

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.By2r2BwheJsbrEGrHOaMQwrrmlY7wHVFzWtuEmv39fM';
export { baseUrl, token };
