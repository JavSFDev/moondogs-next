import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import "tippy.js/dist/tippy.css";
import Likes from "../likes";
import { buyModalShow } from "../../redux/modalSlice";
import axios from "axios";
import { useAppDispatch } from "../../redux/store";
import Tippy from "@tippyjs/react";

const CategoryItem = ({ nfts }: { nfts: NFT[] }) => {
  const dispatch = useAppDispatch();
  const [metadataArray, setMetadataArray] = useState<Metadata[]>();
  useEffect(() => {
    async function metadataRequests() {
      try {
        if (nfts) {
          const metadataRequests = nfts?.map((nft) => {
            const parsedString = JSON.parse(nft.metadataUrl.slice(1, -1));
            const metadataUrl = parsedString.includes("ipfs://")
              ? "https://nftstorage.link/ipfs/" + parsedString.split("://")[1]
              : parsedString;
            return axios.get<Metadata>(metadataUrl);
          });
          const responses = await Promise.all(metadataRequests);
          const responseData = responses?.map((response) => response.data);
          setMetadataArray(responseData);
        }
      } catch (error) {
        console.error(error);
      }
    }

    metadataRequests();
  }, [nfts]);

  const getImageUrl = useCallback((url: string | undefined) => {
    console.log(url);
    if (url)
      return url.includes("ipfs://") ? "https://nftstorage.link/ipfs/" + url.split("://")[1] : url;
    else return "";
  }, []);

  return (
    <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
      {nfts &&
        nfts?.map((item, index) => {
          const { id, price, likedByUsers, owner } = item;
          return (
            <article key={id}>
              <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2.5xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
                <figure className="relative">
                  <Link href={`/item/${id}`}>
                    <a>
                      <img
                        src={getImageUrl(metadataArray?.[index]?.image) || "/images/products/item_1.jpg"}
                        alt="item 5"
                        className="w-full h-[230px] rounded-[0.625rem] object-cover"
                      />
                    </a>
                  </Link>

                  <Likes like={likedByUsers.length} />

                  <div className="absolute left-3 -bottom-3">
                    <div className="flex -space-x-2">
                      <Link href={`/profile/${owner?.address}`}>
                        <a>
                          <Tippy content={<span>owner: {owner?.address}</span>}>
                            <img
                              src={owner?.profileImage}
                              alt="owner"
                              className="w-6 h-6 border-2 border-white rounded-full dark:border-jacarta-600 hover:border-accent dark:hover:border-accent"
                            />
                          </Tippy>
                        </a>
                      </Link>
                    </div>
                  </div>
                </figure>
                <div className="flex items-center justify-between mt-7">
                  <Link href={`/item/${id}`}>
                    <a>
                      <span className="text-base font-display text-jacarta-700 hover:text-accent dark:text-white">
                        {metadataArray?.[index]?.name}
                      </span>
                    </a>
                  </Link>

                  {/* auction dropdown  */}
                  {/* <Auctions_dropdown classes="dark:hover:bg-jacarta-600 dropup hover:bg-jacarta-100 rounded-full " /> */}
                </div>
                <div className="mt-2 text-sm">
                  <span className="mr-1 dark:text-jacarta-200 text-jacarta-700">{price}</span>
                </div>

                <div className="flex items-center justify-between mt-8">
                  <button
                    className="text-sm font-semibold text-accent font-display"
                    onClick={() => dispatch(buyModalShow())}
                  >
                    Buy now
                  </button>
                  <Link href={`/item/${id}`}>
                    <a className="flex items-center group">
                      <svg className="icon icon-history group-hover:fill-accent dark:fill-jacarta-200 fill-jacarta-500 mr-1 mb-[3px] h-4 w-4">
                        <use xlinkHref="/icons.svg#icon-history"></use>
                      </svg>
                      <span className="text-sm font-semibold group-hover:text-accent font-display dark:text-jacarta-200">
                        View History
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
    </div>
  );
};

export default CategoryItem;
