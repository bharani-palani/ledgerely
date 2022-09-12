const baseUrl = () => {
  const dev = 'http://localhost:5001/moneyPlanner/services';
  const prod = 'https://apps.bharani.tech/services';
  return process.env.NODE_ENV === 'development' ? dev : prod;
};

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.By2r2BwheJsbrEGrHOaMQwrrmlY7wHVFzWtuEmv39fM';

const newsApiToken = '69f509e33f722111a9737ea45bb6f720';
const rapidApiKey = 'ab41d118d1msh03b94fd2a0f7b61p10edcdjsn2d55dd5a2c32';

export { baseUrl, token, newsApiToken, rapidApiKey };
