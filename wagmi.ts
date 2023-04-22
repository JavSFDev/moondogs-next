import { configureChains, createClient } from "wagmi";
import { mainnet } from "./config/network";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  [...(process.env.NODE_ENV === "development" ? [mainnet] : [mainnet])],
  [publicProvider()]
);

export const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});
