import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import User_items from "../../components/user/User_items";
import "tippy.js/dist/tippy.css"; // optional
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import Meta from "../../components/Meta";
import { useCopyToClipboard } from "../../hooks/index";
import { shortenAddress } from "../../utils";
import { fetchUserInfo } from "../../lib/fetch-user-info";

const User = () => {
  const router = useRouter();
  const pid = router.query.profile;
  console.log(pid);
  const { data: userInfo } = useQuery(["getProfile", pid], () => fetchUserInfo(pid as string), {
    enabled: router.pathname === "/profile/[profile]",
    staleTime: Infinity,
  });
  const [copied, setCopied] = useState(false);
  const [, copy] = useCopyToClipboard();

  const handleCopy = async (userId: string) => {
    const res = await copy(userId);
    if (res) toast.success("Copied");
  };

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);

  return (
    <>
      <Meta title="User || Moondogs | NFT Marketplace" />
      {/* <!-- Profile --> */}
      {userInfo && (
        <div className="pt-[5.5rem] lg:pt-24">
          {/* <!-- Banner --> */}
          <div className="relative h-[18.75rem]">
            <Image
              src={userInfo.bannerImage || "/images/avatars/avatar_1.jpg"}
              alt="banner"
              layout="fill"
              objectFit="cover"
            />
          </div>
          {/* <!-- end banner --> */}
          <section className="relative pb-12 dark:bg-jacarta-800 bg-light-base pt-28">
            {/* <!-- Avatar --> */}
            <div className="absolute top-0 z-10 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 left-1/2">
              <figure className="relative h-40 w-40 dark:border-jacarta-600 rounded-xl border-[5px] border-white">
                <Image
                  src={userInfo.profileImage || "/images/avatars/avatar_1.jpg"}
                  alt={userInfo.name}
                  layout="fill"
                  objectFit="contain"
                  className="dark:border-jacarta-600 rounded-xl border-[5px] border-white"
                />
              </figure>
            </div>

            <div className="container">
              <div className="text-center">
                <h2 className="mb-2 text-4xl font-medium font-display text-jacarta-700 dark:text-white">
                  {userInfo.name}
                </h2>
                <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 mb-8 inline-flex items-center justify-center rounded-full border bg-white py-1.5 px-4">
                  <img src="/images/core-icon.svg" alt="icon" className="w-4 h-4 mr-1 icon" />

                  <button
                    onClick={() => handleCopy(userInfo.address)}
                    className="js-copy-clipboard dark:text-jacarta-200 max-w-[10rem] select-none overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    <span>{shortenAddress(userInfo.address)}</span>
                  </button>
                </div>

                <p className="max-w-xl mx-auto mb-2 text-lg dark:text-jacarta-300">{userInfo.bio}</p>
                <span className="text-jacarta-400">Joined {userInfo.createdAt.toString()}</span>
              </div>
            </div>
          </section>
          {/* <!-- end profile --> */}
          <User_items userAddress={pid as string} />
        </div>
      )}
    </>
  );
};

export default User;
