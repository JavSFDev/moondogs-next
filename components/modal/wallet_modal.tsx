import React, { useEffect } from "react";
import { useSelector, } from "react-redux";
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from "wagmi";
import { walletModalHide } from "../../redux/modalSlice";
import { testnet, mainnet } from "../../config/network";
import { toast } from "react-toastify";
import { getUser } from "../../redux/userSlice";
import { C } from "@wagmi/connectors/dist/base-84a689bb";
import { RootState, useAppDispatch } from "../../redux/store";

const Wallet_modal = () => {
  const walletModal = useSelector((state: RootState) => state.modal.walletModal);
  const dispatch = useAppDispatch();
  const { connectAsync, connectors, isLoading, pendingConnector } = useConnect();
  const { switchNetwork } = useSwitchNetwork();
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  useEffect(() => {
    if (isConnected) {
      dispatch(walletModalHide());
    }
  }, [dispatch, isConnected]);

  useEffect(() => {
    if (chain?.unsupported) {
      switchNetwork?.(process.env.NODE_ENV === "development" ? testnet.id : mainnet.id);
    }
  }, [chain, switchNetwork]);

  const handleConnect = async (connector: C<any, any, any>) => {
    try {
      const result = await connectAsync({ connector });
      dispatch(getUser(result.account));
    } catch (err) {
      console.error("wallet connect error", err);
      toast.error("Failed to connect wallet");
    }
  };
  const getWalletConnectIcon = (name: string) => {
    if (name === "metamask") {
      return (
        <svg className="inline-block w-10 h-10 icon icon-metamask">
          <use xlinkHref="/icons.svg#icon-metamask"></use>
        </svg>
      );
    } else if (name === "walletconnect") {
      return (
        <svg className="inline-block w-10 h-10 icon icon-mbl-wallet">
          <use xlinkHref="/icons.svg#icon-mbl-wallet"></use>
        </svg>
      );
    } else {
      throw Error("Invalid wallet connect option");
    }
  };
  return (
    <div>
      {/* <!-- Wallet Modal --> */}
      <div className={walletModal ? "block modal fade show " : "modal fade hidden"}>
        <div className="max-w-lg modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="walletModalLabel">
                Connect your wallet
              </h5>
              <button type="button" className="btn-close" onClick={() => dispatch(walletModalHide())}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="w-6 h-6 fill-jacarta-700 dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                </svg>
              </button>
            </div>

            {/* <!-- Body --> */}
            <div className="p-6 text-center modal-body">
              {connectors
                  ?.map((x) => (
                    <button
                      key={x.id}
                      className="hover-transition w-full inline-flex items-center justify-start gap-4 p-2 relative outline-none focus:outline-none bg-primary bg-opacity-5 group hover:bg-opacity-20 rounded-md py-2.5 px-6 text-center"
                      onClick={() => {
                        handleConnect(x);
                      }}
                    >
                      {getWalletConnectIcon(x.name.toLowerCase())}
                      <span className="text-jacarta-900 dark:text-white text-md 2xl:text-sm">{x.name}</span>
                      {isLoading && x.id === pendingConnector?.id && (
                        <div className="absolute right-0 w-2 h-2 -translate-y-1/2 rounded-full top-1/2 animate-spin" />
                      )}
                    </button>
                  ))}
            </div>
            {/* <!-- end body --> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet_modal;
