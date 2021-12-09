import Axios from "axios";
import {baseUrl, token} from "../environment";

const apiInstance = Axios.create({
  baseURL: baseUrl(),
  headers: {"Authorization": token}
});

export default apiInstance;
