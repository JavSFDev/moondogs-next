import { AxiosResponse } from "axios";
import { APIServer } from "../utils/api";

export type GetCollectionInfoResponse = Collection;

export const fetchCollectionInfo = (id: string): Promise<GetCollectionInfoResponse> =>
  APIServer.get("/collection/info", {
    params: { id },
    validateStatus: (status) => status < 500,
  })
    .then((res: AxiosResponse) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((err) => console.warn(err));
