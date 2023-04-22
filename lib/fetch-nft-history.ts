import { AxiosResponse } from "axios";
import { APIServer } from "../utils/api";

export const fetchNftHistory = (id: string): Promise<[NFT, Collection]> =>
  APIServer.get(`/nft/history/${id}`, { validateStatus: (status) => status < 500 })
    .then((res: AxiosResponse) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((err) => console.warn(err));
