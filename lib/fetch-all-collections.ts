import { AxiosResponse } from "axios";
import { APIServer } from "../utils/api";


export const fetchAllCollection = (): Promise<GetCollectionsResponse> =>
  APIServer.get("/collection", { validateStatus: (status) => status < 500 })
    .then((res: AxiosResponse) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((err) => console.warn(err));
