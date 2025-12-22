const backendDomain: string = "http://localhost:8000";

type HttpMethod = "get" | "post" | "put" | "delete";

interface ApiConfig {
  url: string;
  method: HttpMethod;
}

interface SummaryApiType {
  signUp: ApiConfig;
  signIn: ApiConfig;
  currentUser: ApiConfig;
}

const SummaryApi: SummaryApiType = {
  signUp: {
    url: `${backendDomain}/api/user/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/user/signin`,
    method: "post",
  },
  currentUser: {
    url: `${backendDomain}/api/user/details`,
    method: "get",
  },
};

export default SummaryApi;
