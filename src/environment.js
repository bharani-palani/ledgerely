const baseUrl = () => {
  // const dev = "http://localhost/bni-react-web/services";
  const prod = "https://bharani.tech/services";
  return process.env.NODE_ENV === "development" ? prod : prod;
};

const aws = {
  baseUrl: "https://s3.ap-south-1.amazonaws.com/bharani.tech",
};
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.By2r2BwheJsbrEGrHOaMQwrrmlY7wHVFzWtuEmv39fM";
export { baseUrl, token, aws };
