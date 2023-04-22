import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Properties from "./Properties";
import Activity_tab from "./Activity_tab";
import { useNetwork } from "wagmi";

const ItemsTabs = ({ nftInfo, nftHistory }: { nftInfo: [NFT, Collection]; nftHistory: Transaction[] }) => {
  const [tabsActive, setTabsActive] = useState(1);
  const { chain } = useNetwork();
  const tabsHeadText = [
    {
      id: 1,
      text: "details",
      icon: "details",
    },
    {
      id: 2,
      text: "activities",
      icon: "activity",
    },
    // {
    //   id: 3,
    //   text: "properties",
    //   icon: "properties",
    // },
  ];
  return (
    <>
      <div className="overflow-x-auto rounded-lg scrollbar-custom mt-14">
        {/* <!-- Tabs Nav --> */}
        <Tabs className="min-w-fit tabs">
          <TabList className="flex items-center nav nav-tabs">
            {/* <!-- Offers --> */}
            {tabsHeadText?.map(({ id, text, icon }) => {
              return (
                <Tab className="bg-transparent nav-item" key={id}>
                  <button
                    className={
                      tabsActive === id
                        ? "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white active"
                        : "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white"
                    }
                    onClick={() => setTabsActive(id)}
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
            {/* <!-- Details --> */}
            <div className="tab-pane fade" id="details" role="tabpanel" aria-labelledby="details-tab">
              <div className="p-6 bg-white border rounded-tl-none dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-t-2lg rounded-b-2lg md:p-10">
                <div className="flex items-center mb-2">
                  <span className="dark:text-jacarta-300 mr-2 min-w-[9rem]">Contract Address:</span>
                  <a
                    href={`${chain?.blockExplorers?.default.url}/token/${nftInfo?.[1].address}`}
                    target="_blank"
                    className="text-accent"
                    rel="noreferrer"
                  >
                    {nftInfo?.[1].address}
                  </a>
                </div>
                <div className="flex items-center mb-2">
                  <span className="dark:text-jacarta-300 mr-2 min-w-[9rem]">Token ID:</span>
                  <span
                    className="cursor-pointer select-none js-copy-clipboard text-jacarta-700 dark:text-white"
                    data-tippy-content="Copy"
                  >
                    {nftInfo?.[0].tokenId}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="dark:text-jacarta-300 mr-2 min-w-[9rem]">Token Standard:</span>
                  <span className="text-jacarta-700 dark:text-white">ERC-721</span>
                </div>
                <div className="flex items-center">
                  <span className="dark:text-jacarta-300 mr-2 min-w-[9rem]">Blockchain:</span>
                  <span className="text-jacarta-700 dark:text-white">CoreDao</span>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <Activity_tab history={nftHistory} />
          </TabPanel>

          <TabPanel>
            <Properties />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default ItemsTabs;
