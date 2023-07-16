import axios from "axios";

export class baseService {
  static get = (url: string)   => {
    return axios({
      url: url,
      method: "GET",
    });
  };
}
