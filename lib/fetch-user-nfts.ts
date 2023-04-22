import { AxiosResponse } from "axios";
import { APIServer } from "../utils/api";

export type GetUserNftsResponse = NFT;

export const fetchUserNfts = (
  owner: string,
  offset = 0,
  isListed?: boolean,
  limit = 12,
): Promise<GetUserNftsResponse[]> =>
  APIServer.get("/nft", {
    params: {
      owner,
      limit,
      offset,
      isListed,
    },
    validateStatus: (status) => status < 500,
  })
    .then((res: AxiosResponse) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((err) => console.warn(err));
