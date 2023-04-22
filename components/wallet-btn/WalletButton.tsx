import { useDispatch } from "react-redux";
import { walletModalShow } from "../../redux/modalSlice";
import { shortenAddress } from "../../utils/index";
import { useAccount, useBalance, useDisconnect, useNetwork } from "wagmi";
import { useCopyToClipboard } from "../../hooks/index";
import Link from "next/link";
import { toast } from "react-toastify";
import { setUserDefault } from "../../redux/userSlice";
import { useEffect, useState } from "react";

export default function WalletButton() {
  const dispatch = useDispatch();
  const { isConnected, address } = useAccount();
  const [connected, setConnected] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const { data: balanceData } = useBalance({ address });
  const [, copy] = useCopyToClipboard();
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);

  useEffect(() => {
    if (address) setUserAddress(address);
  }, [address]);

  const handleDisconnect = () => {
    disconnect();
    dispatch(setUserDefault());
  };

  const handleCopy = async () => {
    const res = address && (await copy(address));
    if (res) toast.success("Copied");
  };

  const walletHandler = () => {
    if (!connected) {
      dispatch(walletModalShow());
    }
  };

  if (!connected) {
    return (
      <button
        onClick={walletHandler}
        className="js-wallet border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={24}
          height={24}
          className="w-4 h-4 transition-colors fill-jacarta-700 group-hover:fill-white group-focus:fill-white dark:fill-white"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3v2h3v-2h-3z" />
        </svg>
      </button>
    );
  }
  if (connected) {
    return (
      <div className="relative js-nav-dropdown group-dropdown">
        <button className="dropdown-toggle border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            className="w-4 h-4 transition-colors fill-jacarta-700 group-hover:fill-white group-focus:fill-white dark:fill-white"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M11 14.062V20h2v-5.938c3.946.492 7 3.858 7 7.938H4a8.001 8.001 0 0 1 7-7.938zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z" />
          </svg>
        </button>
        <div className="dropdown-menu dark:bg-jacarta-800 group-dropdown-hover:opacity-100 group-dropdown-hover:visible !-right-4 !top-[85%] !left-auto z-10 min-w-[14rem] whitespace-nowrap rounded-xl bg-white transition-all will-change-transform before:absolute before:-top-3 before:h-3 before:w-full lg:absolute lg:grid lg:!translate-y-4 lg:py-4 lg:px-2 lg:shadow-2xl hidden lg:invisible lg:opacity-0">
          <div>
            <div
              onClick={handleCopy}
              className="flex items-center gap-3 px-5 my-4 leading-none cursor-pointer select-none js-copy-clipboard font-display text-jacarta-700 whitespace-nowrap dark:text-white"
            >
              <span>{shortenAddress(userAddress)}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                className="w-4 h-4 mb-px ml-auto dark:fill-jacarta-300 fill-jacarta-500"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M7 7V3a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-4v3.993c0 .556-.449 1.007-1.007 1.007H3.007A1.006 1.006 0 0 1 2 20.993l.003-12.986C2.003 7.451 2.452 7 3.01 7H7zm2 0h6.993C16.549 7 17 7.449 17 8.007V15h3V4H9v3zM4.003 9L4 20h11V9H4.003z" />
              </svg>
            </div>
          </div>
          <div className="p-4 mx-5 mb-6 border rounded-lg dark:border-jacarta-600 border-jacarta-100">
            <span className="text-sm font-medium tracking-tight dark:text-jacarta-200">
              Balance ({chain?.name})
            </span>
            <div className="flex items-center">
              <img
                src="/images/core-icon.svg"
                alt="icon"
                className="-ml-1 mr-1 h-[1.125rem] w-[1.125rem] icon"
              />
              <span className="text-lg font-bold text-green">
                {balanceData?.formatted.slice(0, 5)} {chain?.nativeCurrency?.symbol}
              </span>
            </div>
          </div>
          <a
            href={`/profile/${userAddress}`}
            className="flex items-center px-5 py-2 space-x-2 transition-colors dark:hover:bg-jacarta-600 hover:text-accent focus:text-accent hover:bg-jacarta-50 rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              className="w-4 h-4 transition-colors fill-jacarta-700 dark:fill-white"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M11 14.062V20h2v-5.938c3.946.492 7 3.858 7 7.938H4a8.001 8.001 0 0 1 7-7.938zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z" />
            </svg>
            <span className="mt-1 text-sm font-display text-jacarta-700 dark:text-white">My Profile</span>
          </a>
          <Link href="/profile/edit">
            <a className="flex items-center px-5 py-2 space-x-2 transition-colors dark:hover:bg-jacarta-600 hover:text-accent focus:text-accent hover:bg-jacarta-50 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                className="w-4 h-4 transition-colors fill-jacarta-700 dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M9.954 2.21a9.99 9.99 0 0 1 4.091-.002A3.993 3.993 0 0 0 16 5.07a3.993 3.993 0 0 0 3.457.261A9.99 9.99 0 0 1 21.5 8.876 3.993 3.993 0 0 0 20 12c0 1.264.586 2.391 1.502 3.124a10.043 10.043 0 0 1-2.046 3.543 3.993 3.993 0 0 0-3.456.261 3.993 3.993 0 0 0-1.954 2.86 9.99 9.99 0 0 1-4.091.004A3.993 3.993 0 0 0 8 18.927a3.993 3.993 0 0 0-3.457-.26A9.99 9.99 0 0 1 2.5 15.121 3.993 3.993 0 0 0 4 11.999a3.993 3.993 0 0 0-1.502-3.124 10.043 10.043 0 0 1 2.046-3.543A3.993 3.993 0 0 0 8 5.071a3.993 3.993 0 0 0 1.954-2.86zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
              <span className="mt-1 text-sm font-display text-jacarta-700 dark:text-white">Edit Profile</span>
            </a>
          </Link>
          <button
            onClick={handleDisconnect}
            className="flex items-center px-5 py-2 space-x-2 transition-colors dark:hover:bg-jacarta-600 hover:text-accent focus:text-accent hover:bg-jacarta-50 rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              className="w-4 h-4 transition-colors fill-jacarta-700 dark:fill-white"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM7 11V8l-5 4 5 4v-3h8v-2H7z" />
            </svg>
            <span className="mt-1 text-sm font-display text-jacarta-700 dark:text-white">Disconnect</span>
          </button>
        </div>
      </div>
    );
  }

  return <></>;
}
