const backendDomain: string = "http://localhost:8000";

type HttpMethod = "get" | "post" | "put" | "delete";

interface ApiConfig {
  url: string;
  method: HttpMethod;
}

interface SummaryApiType {
  signUp: ApiConfig;
}

const SummaryApi: SummaryApiType = {
  signUp: {
    url: `${backendDomain}/api/user/signup`,
    method: "post",
  },
};

export default SummaryApi;
