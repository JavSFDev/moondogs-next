import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Activity_item from "./Activity_item";
import Image from "next/image";
import FilterCategoryItem from "../categories/filterCategoryItem";
import CategoryItem from "../categories/categoryItem";

const Collection_items = ({
  collectionNfts,
  setOffset,
}: {
  collectionNfts: [NFT[], number];
  setOffset: () => void;
}) => {
  const [itemsTabs, setItemsTabs] = useState(1);

  const collectionItemsTabs = [
    {
      id: 1,
      text: "Items",
      icon: "items",
    },
    // {
    //   id: 2,
    //   text: "Activity",
    //   icon: "activities",
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
            <TabList className="flex items-center justify-center mb-12 border-b nav nav-tabs dark:border-jacarta-600 border-jacarta-100">
              {collectionItemsTabs?.map(({ id, text, icon }) => {
                return (
                  <Tab className="nav-item" key={id} onClick={() => setItemsTabs(id)}>
                    <button
                      className={
                        itemsTabs === id
                          ? "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white active"
                          : "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white"
                      }
                    >
                      <svg className="w-5 h-5 mr-1 fill-current icon icon-items">
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
                <CategoryItem nfts={collectionNfts[0]} />
              </div>
            </TabPanel>
            <TabPanel>
              <Activity_item />
            </TabPanel>
          </Tabs>
          {collectionNfts?.[0]?.length < collectionNfts[1] && (
            <div className="flex justify-between pt-10">
              <button
                className="px-8 py-3 m-auto font-semibold text-center text-white transition-all rounded-full bg-accent shadow-accent-volume hover:bg-accent-dark"
                onClick={setOffset}
              >
                Load more
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Collection_items;
