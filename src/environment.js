const baseUrl = () => {
    // const dev = "http://localhost/bni-react-web/services";
    const prod = "https://bharani.tech/services";
    return process.env.NODE_ENV === "development" ? prod : prod;
};

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.By2r2BwheJsbrEGrHOaMQwrrmlY7wHVFzWtuEmv39fM";
export {baseUrl, token};