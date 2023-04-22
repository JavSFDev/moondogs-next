import React from "react";
import Link from "next/link";
import { items_offer_data } from "../../data/items_tabs_data";

const OfferTab = () => {
  return (
    <>
      {/* <!-- Offers --> */}
      <div
        className="tab-pane fade show active"
        id="offers"
        role="tabpanel"
        aria-labelledby="offers-tab"
      >
        <div
          role="table"
          className="grid w-full grid-cols-5 overflow-y-auto text-sm bg-white border rounded-lg rounded-tl-none scrollbar-custom dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 max-h-72 dark:text-white"
        >
          <div className="contents" role="row">
            <div
              className="sticky top-0 px-4 py-2 dark:bg-jacarta-600 bg-light-base"
              role="columnheader"
            >
              <span className="w-full overflow-hidden text-jacarta-700 dark:text-jacarta-100 text-ellipsis">
                Price
              </span>
            </div>
            <div
              className="sticky top-0 px-4 py-2 dark:bg-jacarta-600 bg-light-base"
              role="columnheader"
            >
              <span className="w-full overflow-hidden text-jacarta-700 dark:text-jacarta-100 text-ellipsis">
                USD Price
              </span>
            </div>
            <div
              className="sticky top-0 px-4 py-2 dark:bg-jacarta-600 bg-light-base"
              role="columnheader"
            >
              <span className="w-full overflow-hidden text-jacarta-700 dark:text-jacarta-100 text-ellipsis">
                Floor Difference
              </span>
            </div>
            <div
              className="sticky top-0 px-4 py-2 dark:bg-jacarta-600 bg-light-base"
              role="columnheader"
            >
              <span className="w-full overflow-hidden text-jacarta-700 dark:text-jacarta-100 text-ellipsis">
                Expiration
              </span>
            </div>
            <div
              className="sticky top-0 px-4 py-2 dark:bg-jacarta-600 bg-light-base"
              role="columnheader"
            >
              <span className="w-full overflow-hidden text-jacarta-700 dark:text-jacarta-100 text-ellipsis">
                From
              </span>
            </div>
          </div>
          {items_offer_data?.map((item) => {
            const { ethPrice, id, usdPrice, difference, Expiration, user } =
              item;
            return (
              <div className="contents" role="row" key={id}>
                <div
                  className="flex items-center px-4 py-4 border-t dark:border-jacarta-600 border-jacarta-100 whitespace-nowrap"
                  role="cell"
                >
                  <span className="-ml-1" data-tippy-content="CORE">
                    <img
                      src="/images/core-icon.svg"
                      alt="icon"
                      className="-ml-1"
                    />
                  </span>
                  <span className="text-sm font-medium tracking-tight text-green">
                    {ethPrice} CORE
                  </span>
                </div>
                <div
                  className="flex items-center px-4 py-4 border-t dark:border-jacarta-600 border-jacarta-100"
                  role="cell"
                >
                  {usdPrice}
                </div>
                <div
                  className="flex items-center px-4 py-4 border-t dark:border-jacarta-600 border-jacarta-100"
                  role="cell"
                >
                  {difference} below
                </div>
                <div
                  className="flex items-center px-4 py-4 border-t dark:border-jacarta-600 border-jacarta-100"
                  role="cell"
                >
                  in {Expiration} months
                </div>
                <div
                  className="flex items-center px-4 py-4 border-t dark:border-jacarta-600 border-jacarta-100"
                  role="cell"
                >
                  <Link href="#">
                    <a className="text-accent">{user}</a>
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

export default OfferTab;
