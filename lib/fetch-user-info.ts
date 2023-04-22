import { AxiosResponse } from "axios";
import { APIServer } from "../utils/api";

export type GetUserInfoResponse = {
  id: string;
  address: string;
  name: string;
  bio: string;
  profileImage: string;
  bannerImage: string;
  onSaleNFTs: NFT[];
  createdAt: string;
};

export const fetchUserInfo = (address: string): Promise<GetUserInfoResponse> =>
  APIServer.get("/user/info", {
    params: { address },
    validateStatus: (status) => status < 500,
  })
    .then((res: AxiosResponse) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((err) => console.warn(err));
