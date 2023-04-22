import { AxiosResponse } from "axios";
import { APIServer } from "../utils/api";

export type GetHotNftsResponse = {
  id: string;
  price: number;
  metadataUrl: string;
  collection: Collection;
  likedByUsers: User[];
};

export const fetchHotNfts = (
  collectionAddress?: string,
  limit = 6,
  offset = 0
): Promise<GetHotNftsResponse[]> =>
  APIServer.get("/nft/hot", {
    params: {
      collectionAddress,
      limit,
      offset,
    },
    validateStatus: (status) => status < 500,
  })
    .then((res: AxiosResponse) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((err) => console.warn(err));
