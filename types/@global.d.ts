type User = {
  id: string;
  address: string;
  email: string;
  name: string;
  bio: string;
  profileImage: string;
  bannerImage: string;
  likedCollections: Collection[];
  likedNFTs: NFT[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

type NFT = {
  id: string;
  collection: Collection;
  tokenId: string;
  owner: User;
  price: string;
  metadataUrl: string;
  isListed: boolean;
  likedByUsers: User[];
};

type Transaction = {
  id: string;
  collection: string;
  from: User;
  to: User;
  price: string;
  eventType: "Minted" | "Transfer" | "ItemListed" | "ItemCanceled" | "ItemBought";
  tx: string;
  blockNumber: number;
  timestamp: number;
};

type Collection = {
  id: string;
  address: string;
  creator: User;
  name: string;
  symbol: string;
  bio: string;
  profileImage: string;
  bannerImage: string;
  type: TokenType;
  royalty: number;
  verified: boolean;
  volume: number;
  nfts: NFT[];
  likedByUsers: User[];
};

enum TokenType {
  ERC721 = "erc721",
  ERC1155 = "erc1155",
}

type TransactionDataType = {
  collectionAddress: string;
  args: any;
  eventType: "Minted" | "Transfer" | "ItemListed" | "ItemCanceled" | "ItemBought";
  tokenType: TokenType;
  tx: string;
  blockNumber: number;
};
type Metadata = {
  description?: string;
  external_url?: string;
  image: string;
  name?: string;
  attributes?: {
    trait_type: string;
    value: string;
  }[];
};

type UserUpdateData = {
  id: string;
  address: string;
  name: string;
  bio: string;
  email: string;
  profileImage: string;
  bannerImage: string;
};

type GetCollectionsResponse = {
  collections: [Collection, number][];
  count: number;
};
