import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Image from "next/image";
import Explore_collection_item from "../collections/explore_collection_item";
import { fetchUserNfts } from "../../lib/fetch-user-nfts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import CategoryItem from "../categories/categoryItem";
import { fetchUserCollections } from "../../lib/fetch-user-collections";

type Props = {
  userAddress: string;
};
const User_items: React.FC<Props> = ({ userAddress }) => {
  const queryClient = useQueryClient();
  const [itemActive, setItemActive] = useState(1);
  const [userNfts, setUserNfts] = useState<NFT[]>();
  const [offset, setOffset] = useState(0);
  const router = useRouter();

  const { data, isPreviousData } = useQuery(["getUserNfts", offset], () => fetchUserNfts(userAddress), {
    enabled: router.pathname === "/profile/[profile]",
    staleTime: 5000,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (!isPreviousData && data) {
      queryClient.prefetchQuery({
        queryKey: ["getUserNfts", offset + 12],
        queryFn: () => fetchUserNfts(userAddress, offset + 12),
      });
    }
  }, [data, isPreviousData, offset, queryClient, userAddress]);

  const { data: userCollections } = useQuery(
    ["getUserCollections"],
    () => fetchUserCollections(userAddress),
    {
      enabled: router.pathname === "/profile/[profile]",
      staleTime: Infinity,
    }
  );
  useEffect(() => {
    setUserNfts((prev) => {
      console.log(prev);
      if (prev && data) {
        return prev.concat(data);
      } else {
        return data;
      }
    });
  }, [data]);

  const tabItem = [
    {
      id: 1,
      text: "on sale",
      icon: "on-sale",
    },
    {
      id: 2,
      text: "owned",
      icon: "owned",
    },
    // {
    //   id: 3,
    //   text: "created(20)",
    //   icon: "created",
    // },
    {
      id: 3,
      text: "collections",
      icon: "listing",
    },
    // {
    //   id: 5,
    //   text: "Activity",
    //   icon: "activity",
    // },
  ];
  return (
    <>
      <section className="relative py-24">
        <picture className="absolute inset-0 pointer-events-none -z-10 dark:hidden">
          {/* <img src="img/gradient_light.jpg" alt="gradient" className="w-full h-full" /> */}
          <Image src="/images/gradient_light.jpg" alt="gradient" className="w-full h-full" layout="fill" />
        </picture>
        <div className="container">
          {/* <!-- Tabs Nav --> */}
          <Tabs className="tabs">
            <TabList className="flex items-center justify-start pb-px mb-12 overflow-x-auto overflow-y-hidden border-b nav nav-tabs scrollbar-custom border-jacarta-100 dark:border-jacarta-600 md:justify-center">
              {tabItem?.map(({ id, text, icon }) => {
                return (
                  <Tab className="nav-item" role="presentation" key={id} onClick={() => setItemActive(id)}>
                    <button
                      className={
                        itemActive === id
                          ? "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white active"
                          : "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white"
                      }
                    >
                      <svg className="w-5 h-5 mr-1 fill-current icon">
                        <use xlinkHref={`/icons.svg#icon-${icon}`}></use>
                      </svg>
                      <span className="text-base font-medium font-display">{text}</span>
                    </button>
                  </Tab>
                );
              })}
            </TabList>

            <TabPanel>
              <div>
                {/* <!-- Filter --> */}
                {userNfts && <CategoryItem nfts={userNfts.filter((item) => item.isListed === true)} />}
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                {/* <!-- Filter --> */}
                {userNfts && <CategoryItem nfts={userNfts} />}
                <div className="flex justify-between pt-10">
                  <button
                    className="px-8 py-3 m-auto font-semibold text-center text-white transition-all rounded-full bg-accent shadow-accent-volume hover:bg-accent-dark"
                    onClick={() => setOffset((prev) => prev + 12)}
                  >
                    Load more
                  </button>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              {/* <!-- Grid --> */}
              <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-3 lg:grid-cols-4">
                {userCollections && <Explore_collection_item collections={userCollections} />}
              </div>
            </TabPanel>
            {/* <TabPanel>
              <div>
                <Activity_item />
              </div>
            </TabPanel> */}
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default User_items;
