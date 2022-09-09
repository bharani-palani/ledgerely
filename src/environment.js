const baseUrl = () => {
  const dev = 'http://localhost:5001/moneyPlanner/services';
  const prod = 'https://apps.bharani.tech/services';
  return process.env.NODE_ENV === 'development' ? dev : prod;
};

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.By2r2BwheJsbrEGrHOaMQwrrmlY7wHVFzWtuEmv39fM';

const newsApiToken = 'ed5295eebd6e4c149e73b0651485b839';

export { baseUrl, token, newsApiToken };
