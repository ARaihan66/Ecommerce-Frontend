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
  signOutUser: ApiConfig;
  getAllUsers: ApiConfig;
  updateUserRole: ApiConfig;
  productUpload: ApiConfig;
  getAllProduct: ApiConfig;
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
  signOutUser: {
    url: `${backendDomain}/api/user/sign-out`,
    method: "get",
  },
  getAllUsers: {
    url: `${backendDomain}/api/user/get-all`,
    method: "get",
  },
  updateUserRole: {
    url: `${backendDomain}/api/user/role-update`,
    method: "post",
  },
  productUpload: {
    url: `${backendDomain}/api/product/create`,
    method: "post",
  },
  getAllProduct: {
    url: `${backendDomain}/api/product/get`,
    method: "get",
  },
};

export default SummaryApi;
