import axios from "axios";
import { serverBase, defaultHeaders } from "./constants";

const url = axios.create({
  baseURL: serverBase,
  timeout: 2000,
  headers: { ...defaultHeaders }
})

export default url;