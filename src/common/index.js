const backendDomain = "http://localhost:8000";

const SummaryApi = {
  signUP: {
    url: `${backendDomain}/api/user/signup`,
    method: "post",
  },
};

export default SummaryApi;
