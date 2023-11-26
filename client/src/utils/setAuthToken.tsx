import url from "./axios";

const setAuthToken = (token : string) => {
  if (token) url.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete url.defaults.headers.common["Authorization"];
}

export default setAuthToken;