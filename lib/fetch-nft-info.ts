import { AxiosResponse } from "axios";
import { APIServer } from "../utils/api";

export const fetchNftInfo = (id: string): Promise<[NFT, Collection]> =>
  APIServer.get(`/nft/${id}`, { validateStatus: (status) => status < 500 })
    .then((res: AxiosResponse) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((err) => console.warn(err));
