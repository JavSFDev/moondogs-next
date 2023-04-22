import { AxiosResponse } from "axios";
import { APIServer } from "../utils/api";

export type GetTopCollectionsResponse = [Collection[], number];

export const fetchTopCollection = (): Promise<GetTopCollectionsResponse> =>
  APIServer.get("/collection/top", { validateStatus: (status) => status < 500 })
    .then((res: AxiosResponse) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((err) => console.warn(err));
