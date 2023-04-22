import { Chain } from "wagmi";

const testnet: Chain = {
  id: 1115,
  network: "Coredao Chain Testnet",
  name: "Core Testnet",
  nativeCurrency: {
    name: "TestCore",
    symbol: "tCORE",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.test.btcs.network"],
    },
    public: {
      http: ["https://rpc.test.btcs.network"],
    },
  },
  blockExplorers: {
    etherscan: {
      name: "TestCoreScan",
      url: "https://scan.test.btcs.network",
    },
    default: {
      name: "TestCoreScan",
      url: "https://scan.test.btcs.network",
    },
  },
  contracts: {
    ensRegistry: {
      address: "0x4d1d23CF011914EcD6af659173eB02cc99e119BF",
    },
    ensUniversalResolver: {
      address: "0x4d1d23CF011914EcD6af659173eB02cc99e119BF",
    },
    multicall3: {
      address: "0x4d1d23CF011914EcD6af659173eB02cc99e119BF",
      blockCreated: 7572063,
    },
  },
};

const mainnet: Chain = {
  id: 1116,
  network: "Coredao Chain Mainnet",
  name: "Core Mainnet",
  nativeCurrency: {
    name: "Core",
    symbol: "CORE",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.coredao.org/"],
    },
    public: {
      http: ["https://rpc.coredao.org/"],
    },
  },
  blockExplorers: {
    etherscan: {
      name: "CoredaoScan",
      url: "https://scan.coredao.org",
    },
    default: {
      name: "CoredaoScan",
      url: "https://scan.coredao.org",
    },
  },
  contracts: {
    ensRegistry: {
      address: "0x4d1d23CF011914EcD6af659173eB02cc99e119BF",
    },
    ensUniversalResolver: {
      address: "0x4d1d23CF011914EcD6af659173eB02cc99e119BF",
    },
    multicall3: {
      address: "0x4d1d23CF011914EcD6af659173eB02cc99e119BF",
      blockCreated: 7572063,
    },
  },
};

export { testnet, mainnet };
