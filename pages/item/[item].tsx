import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { items_data } from "../../data/items_data";
import Auctions_dropdown from "../../components/dropdown/Auctions_dropdown";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Items_Countdown_timer from "../../components/items_countdown_timer";
import { ItemsTabs } from "../../components/component";
import Likes from "../../components/likes";
import Meta from "../../components/Meta";
import { useDispatch } from "react-redux";
import { bidsModalShow } from "../../redux/modalSlice";
import { GetStaticPaths, GetStaticProps } from "next";
import { QueryClient } from "@tanstack/react-query";
import { fetchNftInfo } from "../../lib/fetch-nft-info";
import axios from "axios";
import { shortenAddress } from "../../utils";
import { fetchNftHistory } from "../../lib/fetch-nft-history";

const Item = ({ nftInfo, nftHistory }: { nftInfo: [NFT, Collection]; nftHistory: Transaction[] }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pid = router.query.item;
  const [imageModal, setImageModal] = useState(false);
  const [metadata, setMetadata] = useState<Metadata>();

  useEffect(() => {
    async function metadataRequests() {
      try {
        if (nftInfo) {
          const parsedString = JSON.parse(nftInfo[0].metadataUrl.slice(1, -1));
          const metadataUrl = parsedString.includes("ipfs://")
            ? "https://nftstorage.link/ipfs/" + parsedString.split("://")[1]
            : parsedString;
          const { data } = await axios.get<Metadata>(metadataUrl);
          setMetadata(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    metadataRequests();
  }, [nftInfo]);

  const getImageUrl = useCallback((url: string | undefined) => {
    if (url) return url.includes("ipfs://") ? "https://nftstorage.link/ipfs/" + url.split("://")[1] : url;
    else return "";
  }, []);
  return (
    <>
      <Meta title={`${pid} || Moondogs | NFT Marketplace`} />
      {/*  <!-- Item --> */}
      <section className="relative pt-12 pb-24 mt-24 lg:mt-24 lg:pt-24 lg:pb-24">
        <picture className="absolute inset-0 pointer-events-none -z-10 dark:hidden">
          <img src="/images/gradient_light.jpg" alt="gradient" className="h-full" />
        </picture>
        <div className="container">
          {/* <!-- Item --> */}

          <div className="md:flex md:flex-wrap">
            {/* <!-- Image --> */}
            <figure className="w-full mb-8 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2">
              <button className="w-full " onClick={() => setImageModal(true)}>
                <img
                  src={getImageUrl(metadata?.image) || "/images/products/item_1.jpg"}
                  alt={nftInfo[0]?.collection.name || "Unnamed"}
                  className="w-full cursor-pointer rounded-2xl"
                />
              </button>

              {/* <!-- Modal --> */}
              <div className={imageModal ? "modal fade show block" : "modal fade"}>
                <div className="modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center">
                  <img
                    src={getImageUrl(metadata?.image) || "/images/products/item_1.jpg"}
                    alt={nftInfo[0]?.collection.name || "Unnamed"}
                    className="h-full rounded-2xl"
                  />
                </div>

                <button
                  type="button"
                  className="absolute btn-close top-6 right-6"
                  onClick={() => setImageModal(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="w-6 h-6 fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                  </svg>
                </button>
              </div>
              {/* <!-- end modal --> */}
            </figure>

            {/* <!-- Details --> */}
            <div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]">
              {/* <!-- Collection / Likes / Actions --> */}
              <div className="flex mb-3">
                {/* <!-- Collection --> */}
                <div className="flex items-center">
                  <Link href="#">
                    <a className="mr-2 text-sm font-bold text-accent">
                      {nftInfo[0]?.collection.name || "Unnamed"}
                    </a>
                  </Link>
                  {nftInfo[0]?.collection.verified && (
                    <span
                      className="inline-flex items-center justify-center w-6 h-6 border-2 border-white rounded-full dark:border-jacarta-600 bg-green"
                      data-tippy-content="Verified Collection"
                    >
                      <Tippy content={<span>Verified Collection</span>}>
                        <svg className="icon h-[.875rem] w-[.875rem] fill-white">
                          <use xlinkHref="/icons.svg#icon-right-sign"></use>
                        </svg>
                      </Tippy>
                    </span>
                  )}
                </div>

                {/* <!-- Likes / Actions --> */}
                <div className="relative flex items-stretch ml-auto space-x-2">
                  <Likes
                    like={nftInfo[0]?.likedByUsers.length}
                    classes="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 flex items-center space-x-1 rounded-xl border bg-white py-2 px-4"
                  />

                  {/* <!-- Actions --> */}
                  {/* <Auctions_dropdown classes="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white" /> */}
                </div>
              </div>

              <h1 className="mb-4 text-4xl font-semibold font-display text-jacarta-700 dark:text-white">
                {metadata?.name || "Unnamed"}
              </h1>
              {nftInfo[0]?.isListed && (
                <div className="flex items-center mb-8 space-x-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Tippy content={<span>CORE</span>}>
                      <span className="-ml-1">
                        <img src="/images/core-icon.svg" alt="icon" className="w-4 h-4 mr-1 icon" />
                      </span>
                    </Tippy>
                    <span className="text-sm font-medium tracking-tight text-green">
                      {nftInfo[0]?.price || 0} CORE
                    </span>
                  </div>
                </div>
              )}

              <p className="mb-10 dark:text-jacarta-300">{metadata?.description}</p>

              {/* <!-- Creator / Owner --> */}
              <div className="flex flex-wrap mb-8">
                <div className="flex mb-4 mr-8">
                  <figure className="mr-4 shrink-0">
                    <Link href={`/profile/${nftInfo[1]?.creator.address}`}>
                      <a className="relative block">
                        <img
                          src={nftInfo[1]?.creator.profileImage || "/images/avatars/avatar_7.jpg"}
                          alt={nftInfo[1]?.creator.name || "Unnamed"}
                          className="w-12 h-12 rounded-2lg"
                          loading="lazy"
                        />
                      </a>
                    </Link>
                  </figure>
                  <div className="flex flex-col justify-center">
                    <span className="block text-sm text-jacarta-400 dark:text-white">
                      Creator <strong>{nftInfo[0]?.collection.royalty}% royalties</strong>
                    </span>
                    <Link href={`/profile/${nftInfo[1]?.creator.address}`}>
                      <a className="block text-accent">
                        <span className="text-sm font-bold">
                          {nftInfo[1]?.creator.name || shortenAddress(nftInfo[1]?.creator.address)}
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>

                <div className="flex mb-4">
                  <figure className="mr-4 shrink-0">
                    <Link href={`/profile/${nftInfo[0]?.owner.address}`}>
                      <a className="relative block">
                        <img
                          src={nftInfo[0]?.owner.profileImage || "/images/avatars/avatar_7.jpg"}
                          alt={nftInfo[0]?.owner.name || "Unnamed"}
                          className="w-12 h-12 rounded-2lg"
                          loading="lazy"
                        />
                      </a>
                    </Link>
                  </figure>
                  <div className="flex flex-col justify-center">
                    <span className="block text-sm text-jacarta-400 dark:text-white">Owned by</span>
                    <Link href={`/profile/${nftInfo[0]?.owner.address}`}>
                      <a className="block text-accent">
                        <span className="text-sm font-bold">
                          {nftInfo[0]?.owner.name || shortenAddress(nftInfo[0]?.owner.address)}
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              {/* <!-- Bid --> */}
              <Link href="#">
                <button
                  className="inline-block w-full px-8 py-3 font-semibold text-center text-white transition-all rounded-full bg-accent shadow-accent-volume hover:bg-accent-dark"
                  disabled={!nftInfo[0].isListed}
                  onClick={() => dispatch(bidsModalShow())}
                >
                  {nftInfo[0].isListed ? " Buy now" : "Not listed"}
                </button>
              </Link>
              {/* <!-- end bid --> */}
            </div>
            {/* <!-- end details --> */}
          </div>

          <ItemsTabs nftHistory={nftHistory} nftInfo={nftInfo} />
        </div>
      </section>
      {/* <!-- end item --> */}

      {/* <More_items /> */}
    </>
  );
};

export default Item;

export const getStaticProps: GetStaticProps = async (context) => {
  const nftId = context.params?.item as string;
  const queryClient = new QueryClient();

  const nftInfo = await queryClient.fetchQuery(["getNftInfo", nftId], () => fetchNftInfo(nftId));
  const nftHistory = await queryClient.fetchQuery(["getNftHistory", nftId], () => fetchNftHistory(nftId));

  return {
    props: {
      nftInfo,
      nftHistory,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
