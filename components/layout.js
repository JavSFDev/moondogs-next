import { useEffect } from "react";
import Footer from "./footer";
import Wallet_modal from "./modal/wallet_modal";
import BidsModal from "./modal/bidsModal";
import BuyModal from "./modal/buyModal";
import Header from "./header/Header";
import { useAccount } from "wagmi";
import { useAppDispatch } from "../redux/store";
import { getUser } from "../redux/userSlice";

export default function Layout({ children }) {
  const { address } = useAccount();
  const dispatch = useAppDispatch();

  
  useEffect(() => {
    if (address) dispatch(getUser(address));
  }, [address, dispatch]);

  return (
    <>
      <Header />
      <Wallet_modal />
      <BidsModal />
      <BuyModal />
      <main>{children}</main>
      <Footer />
    </>
  );
}
