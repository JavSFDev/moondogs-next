import { AxiosResponse } from "axios";
import { APIServer } from "../utils/api";

export type GetCollectionNftsResponse = [NFT[], number];

export const fetchCollectionNfts = (
  id: string,
  offset = 0,
  limit = 12,
  isListed = false
): Promise<GetCollectionNftsResponse> =>
  APIServer.get("/nft/collection", {
    params: { collectionId: id, limit, offset, isListed },
    validateStatus: (status) => status < 500,
  })
    .then((res: AxiosResponse) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((err) => console.warn(err));
