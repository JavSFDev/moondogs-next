import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Collection_items from "../../components/collections/Collection_items";
import { useQuery, useQueryClient, QueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Meta from "../../components/Meta";
import { GetStaticPaths, GetStaticProps } from "next";
import { GetCollectionInfoResponse, fetchCollectionInfo } from "../../lib/fetch-collectoin-info";
import { formatAmountWithUnit, shortenAddress } from "../../utils";
import { useNetwork } from "wagmi";
import { fetchCollectionNfts } from "../../lib/fetch-collectoin-nfts";

const Collection = ({ collectionInfo }: { collectionInfo: GetCollectionInfoResponse }) => {
  const queryClient = useQueryClient();
  const [likesImage, setLikesImage] = useState(false);
  const { chains } = useNetwork();
  const [explorerUrl, setExplorerUrl] = useState<string>();
  const [offset, setOffset] = useState(0);
  const router = useRouter();
  const pid = router.query.collection;
  const [collectionNfts, setCollectionNfts] = useState<[NFT[], number]>();
  const { data, isPreviousData, refetch } = useQuery(
    ["getCollectionNfts", offset],
    () => fetchCollectionNfts(pid as string),
    {
      enabled: router.pathname === `/collection/[collection]`,
      staleTime: 5000,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (!isPreviousData && data) {
      queryClient.prefetchQuery({
        queryKey: ["projects", offset + 12],
        queryFn: () => fetchCollectionNfts(pid as string, offset + 12),
      });
    }
  }, [data, isPreviousData, offset, pid, queryClient]);

  useEffect(() => {
    setCollectionNfts((prev) => {
      if (prev && data) {
        return [prev[0].concat(data?.[0]), prev[1]];
      } else {
        return data;
      }
    });
  }, [data]);

  useEffect(() => {
    setExplorerUrl(chains[0]?.blockExplorers?.default.url);
    refetch()
  }, [chains, refetch]);

  const handleLikes = () => {
    if (!likesImage) {
      setLikesImage(true);
    } else {
      setLikesImage(false);
    }
  };

  return (
    <>
      <Meta title={`${collectionInfo?.name || "Collection"} || Moondogs | NFT Marketplace`} />

      <div className="pt-[5.5rem] lg:pt-24">
        {/* <!-- Banner --> */}
        <div className="relative h-[300px]">
          <Image
            src={collectionInfo?.bannerImage || "/images/collections/collection_banner.jpg"}
            alt="banner"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* <!-- end banner --> */}
        {/* <!-- Profile --> */}
        <section className="relative pb-12 dark:bg-jacarta-800 bg-light-base pt-28">
          {/* <!-- Avatar --> */}
          <div className="absolute top-0 z-10 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 left-1/2">
            <figure className="relative h-40 w-40 dark:border-jacarta-600 rounded-xl border-[5px] border-white">
              <Image
                src={collectionInfo?.profileImage || "/images/collections/collection_banner.jpg"}
                alt={collectionInfo?.name}
                layout="fill"
                objectFit="contain"
                className="dark:border-jacarta-600 rounded-xl border-[5px] border-white"
              />
              <div
                className="absolute bottom-0 flex items-center justify-center w-6 h-6 border-2 border-white rounded-full dark:border-jacarta-600 bg-green -right-3"
                data-tippy-content="Verified Collection"
              >
                {collectionInfo?.verified && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-[.875rem] w-[.875rem] fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                  </svg>
                )}
              </div>
            </figure>
          </div>

          <div className="container">
            <div className="text-center">
              <h2 className="mb-2 text-4xl font-medium font-display text-jacarta-700 dark:text-white">
                {collectionInfo?.name}
              </h2>
              <div className="mb-8">
                <span className="text-sm font-bold text-jacarta-400">Created by </span>
                <Link href="/profile/avatar_6">
                  <a className="text-sm font-bold text-accent">
                    {collectionInfo?.creator.name || shortenAddress(collectionInfo?.creator.address)}
                  </a>
                </Link>
              </div>

              <div className="inline-flex flex-wrap items-center justify-center mb-8 bg-white border dark:bg-jacarta-800 dark:border-jacarta-600 border-jacarta-100 rounded-xl">
                <div className="w-1/2 py-4 border-r dark:border-jacarta-600 border-jacarta-100 rounded-l-xl hover:shadow-md sm:w-32">
                  <div className="mb-1 text-base font-bold text-jacarta-700 dark:text-white">Total Items</div>
                  <a className="font-medium tracking-tight text-2xs dark:text-jacarta-400">
                    {collectionNfts && formatAmountWithUnit(collectionNfts[1])}
                  </a>
                </div>
                <div className="w-1/2 py-4 border-r dark:border-jacarta-600 border-jacarta-100 rounded-l-xl hover:shadow-md sm:w-32">
                  <div className="mb-1 text-base font-bold text-jacarta-700 dark:text-white">Contract</div>
                  <a
                    href={explorerUrl + "/address/" + collectionInfo?.address + "#code"}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium tracking-tight cursor-pointer text-accent text-2xs"
                  >
                    {shortenAddress(collectionInfo?.address)}
                  </a>
                </div>
                <div className="w-1/2 py-4 border-r dark:border-jacarta-600 border-jacarta-100 rounded-l-xl hover:shadow-md sm:w-32">
                  <div className="mb-1 text-base font-bold text-jacarta-700 dark:text-white">Royalty Fee</div>
                  <a className="font-medium tracking-tight text-2xs dark:text-jacarta-400">
                    {collectionInfo?.royalty} %
                  </a>
                </div>
                <div className="w-1/2 py-4 border-r dark:border-jacarta-600 border-jacarta-100 rounded-l-xl hover:shadow-md sm:w-32">
                  <div className="mb-1 text-base font-bold text-jacarta-700 dark:text-white">
                    Total volume
                  </div>
                  <a className="font-medium tracking-tight text-2xs dark:text-jacarta-400">
                    {collectionInfo?.volume} Core
                  </a>
                </div>
              </div>
              {collectionInfo?.bio && (
                <p className="max-w-xl mx-auto text-lg dark:text-jacarta-300">{collectionInfo?.bio}</p>
              )}

              <div className="mt-6 flex items-center justify-center space-x-2.5 relative">
                <div className="bg-white border dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl">
                  <div
                    className="relative flex items-center justify-center gap-2 p-3 text-sm cursor-pointer js-likes"
                    onClick={() => handleLikes()}
                  >
                    <button>
                      {likesImage ? (
                        <svg className="w-4 h-4 icon dark:fill-jacarta-200 fill-jacarta-500">
                          <use xlinkHref="/icons.svg#icon-heart-fill"></use>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 icon dark:fill-jacarta-200 fill-jacarta-500">
                          <use xlinkHref="/icons.svg#icon-heart"></use>
                        </svg>
                      )}
                    </button>
                    <span>{collectionInfo?.likedByUsers.length + (likesImage ? 1 : 0)}</span>
                  </div>
                </div>
                <Link href={`/collection/${pid}/edit`}>
                  <a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-6 cursor-pointer dark:fill-jacarta-200 dark:hover:fill-jacarta-500 fill-jacarta-500 hover:fill-jacarta-200"
                    >
                      <path d="M501.1 395.7L384 278.6c-23.1-23.1-57.6-27.6-85.4-13.9L192 158.1V96L64 0 0 64l96 128h62.1l106.6 106.6c-13.6 27.8-9.2 62.3 13.9 85.4l117.1 117.1c14.6 14.6 38.2 14.6 52.7 0l52.7-52.7c14.5-14.6 14.5-38.2 0-52.7zM331.7 225c28.3 0 54.9 11 74.9 31l19.4 19.4c15.8-6.9 30.8-16.5 43.8-29.5 37.1-37.1 49.7-89.3 37.9-136.7-2.2-9-13.5-12.1-20.1-5.5l-74.4 74.4-67.9-11.3L334 98.9l74.4-74.4c6.6-6.6 3.4-17.9-5.7-20.2-47.4-11.7-99.6.9-136.6 37.9-28.5 28.5-41.9 66.1-41.2 103.6l82.1 82.1c8.1-1.9 16.5-2.9 24.7-2.9zm-103.9 82l-56.7-56.7L18.7 402.8c-25 25-25 65.5 0 90.5s65.5 25 90.5 0l123.6-123.6c-7.6-19.9-9.9-41.6-5-62.7zM64 472c-13.2 0-24-10.8-24-24 0-13.3 10.7-24 24-24s24 10.7 24 24c0 13.2-10.7 24-24 24z" />
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- end profile --> */}
      </div>
      {collectionNfts && (
        <Collection_items collectionNfts={collectionNfts} setOffset={() => setOffset((prev) => prev + 12)} />
      )}
    </>
  );
};

export default Collection;

export const getStaticProps: GetStaticProps = async (context) => {
  const collectionId = context.params?.collection as string;
  const queryClient = new QueryClient();

  const collectionInfo = await queryClient.fetchQuery(["getCollectionInfo", collectionId], () =>
    fetchCollectionInfo(collectionId)
  );

  return {
    props: {
      collectionInfo,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
