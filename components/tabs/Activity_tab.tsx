import React from "react";
import Link from "next/link";
import { shortenAddress } from "../../utils";
import { useNetwork } from "wagmi";

const Activity_tab = ({ history }: { history: Transaction[] }) => {
  const { chain } = useNetwork();
  return (
    <>
      {/* <!-- Activity --> */}
      <div className="tab-pane fade" id="activity" role="tabpanel" aria-labelledby="activity-tab">
        <div
          role="table"
          className="w-full overflow-y-auto text-sm bg-white border rounded-lg rounded-tl-none scrollbar-custom dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 max-h-72 dark:text-white"
        >
          <div className="sticky top-0 flex dark:bg-jacarta-600 bg-light-base" role="row">
            <div className="w-[17%] py-2 px-4" role="columnheader">
              <span className="w-full overflow-hidden text-jacarta-700 dark:text-jacarta-100 text-ellipsis">
                Event
              </span>
            </div>
            <div className="w-[17%] py-2 px-4" role="columnheader">
              <span className="w-full overflow-hidden text-jacarta-700 dark:text-jacarta-100 text-ellipsis">
                Price
              </span>
            </div>
            <div className="w-[22%] py-2 px-4" role="columnheader">
              <span className="w-full overflow-hidden text-jacarta-700 dark:text-jacarta-100 text-ellipsis">
                From
              </span>
            </div>
            <div className="w-[22%] py-2 px-4" role="columnheader">
              <span className="w-full overflow-hidden text-jacarta-700 dark:text-jacarta-100 text-ellipsis">
                To
              </span>
            </div>
            <div className="w-[22%] py-2 px-4" role="columnheader">
              <span className="w-full overflow-hidden text-jacarta-700 dark:text-jacarta-100 text-ellipsis">
                Date
              </span>
            </div>
          </div>
          {history &&
            history?.map((item) => {
              const { id, price, from, to, eventType, timestamp, tx } = item;
              return (
                <div className="flex" role="row" key={id}>
                  <div
                    className="dark:border-jacarta-600 border-jacarta-100 flex w-[17%] items-center border-t py-4 px-4"
                    role="cell"
                  >
                    {eventType}
                  </div>
                  <div
                    className="dark:border-jacarta-600 border-jacarta-100 flex w-[17%] items-center whitespace-nowrap border-t py-4 px-4"
                    role="cell"
                  >
                    <span className="-ml-1" data-tippy-content="CORE">
                      <img src="/images/core-icon.svg" alt="icon" className="w-4 h-4 mr-1 icon" />
                    </span>
                    <span className="text-sm font-medium tracking-tight text-green">{price} CORE</span>
                  </div>
                  <div
                    className="dark:border-jacarta-600 border-jacarta-100 flex w-[22%] items-center border-t py-4 px-4"
                    role="cell"
                  >
                    <Link href="#">
                      <a className="text-accent">{from?.name || shortenAddress(from?.address)}</a>
                    </Link>
                  </div>
                  <div
                    className="dark:border-jacarta-600 border-jacarta-100 flex w-[22%] items-center border-t py-4 px-4"
                    role="cell"
                  >
                    <Link href="#">
                      <a className="text-accent">{to?.name || shortenAddress(to?.address)}</a>
                    </Link>
                  </div>
                  <div
                    className="dark:border-jacarta-600 border-jacarta-100 flex w-[22%] items-center border-t py-4 px-4"
                    role="cell"
                  >
                    <Link href={`${chain?.blockExplorers?.default.url}/tx/${tx}`}>
                      <a
                        className="flex flex-wrap items-center text-accent"
                        target="_blank"
                        rel="nofollow noopener"
                        title="Opens in a new window"
                        data-tippy-content="March 13 2022, 2:32 pm"
                      >
                        <span className="mr-1">{timestamp}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="w-4 h-4 fill-current"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z" />
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Activity_tab;
