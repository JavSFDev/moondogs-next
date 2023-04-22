import React, { useState } from "react";
import HeadLine from "../headLine";
import Auctions_category_data from "../../data/auctions_category_data";
import Tippy from "@tippyjs/react";
import Countdown_timer from "../Countdown_timer";
import Auctions_dropdown from "../dropdown/Auctions_dropdown";
import Link from "next/link";
import { bidsModalShow } from "../../redux/modalSlice";
import { useDispatch } from "react-redux";
import "tippy.js/themes/light.css";
import Image from "next/image";
import auctions_category_data from "../../data/auctions_category_data";
import Likes from "../likes";

const Auctions_categories = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(Auctions_category_data.slice(0, 8));
  const [loadMoreBtn, setLoadMoreBtn] = useState(true);

  const handleloadMore = () => {
    setData(auctions_category_data);
    setLoadMoreBtn(false);
  };
  return (
    <div>
      <section className="py-24">
        <div className="container">
          <HeadLine
            image="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@7.0.2/img/apple/64/2764-fe0f.png"
            text="Live Auctions"
            classes="font-display text-jacarta-700 mb-8 text-center text-3xl dark:text-white"
          />
          <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
            {data?.map((item) => {
              const {
                id,
                bigImage,
                creatorImage,
                ownerImage,
                title,
                price,
                likes,
                auction_timer,
              } = item;
              const itemLink = bigImage
                .split("/")
                .slice(-1)
                .toString()
                .replace(".jpg", "")
                .replace(".gif", "");
              return (
                <article key={id}>
                  <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
                    <div className="relative flex items-center justify-between mb-4">
                      <div className="flex -space-x-2 ">
                        <Tippy
                          theme="tomato"
                          content={
                            <span className="block px-2 py-1">
                              Creator: Sussygirl
                            </span>
                          }
                        >
                          <Link href={/item/ + itemLink}>
                            <a>
                              <Image
                                src={creatorImage}
                                alt="creator"
                                className="w-6 h-6 rounded-full"
                                height={24}
                                width={24}
                              />
                            </a>
                          </Link>
                        </Tippy>
                        <Tippy
                          content={
                            <span className="block px-2 py-1">
                              Owner: Sussygirl
                            </span>
                          }
                        >
                          <Link href={/item/ + itemLink}>
                            <a>
                              <Image
                                src={ownerImage}
                                alt="creator"
                                className="w-6 h-6 rounded-full"
                                height={24}
                                width={24}
                              />
                            </a>
                          </Link>
                        </Tippy>
                      </div>

                      {/* auction dropdown */}
                      <Auctions_dropdown classes="dark:hover:bg-jacarta-600 dropdown hover:bg-jacarta-100 rounded-full " />
                    </div>
                    <figure className="relative">
                      <Link href={/item/ + itemLink}>
                        <a>
                          <Image
                            src={bigImage}
                            alt="item 8"
                            className="w-full rounded-[0.625rem]"
                            loading="lazy"
                            height="100%"
                            width="100%"
                            layout="responsive"
                            objectFit="cover"
                          />
                        </a>
                      </Link>
                      <Countdown_timer time={+auction_timer} />
                    </figure>
                    <div className="flex items-center justify-between mt-7">
                      <Link href={/item/ + itemLink}>
                        <a>
                          <span className="text-base font-display text-jacarta-700 hover:text-accent dark:text-white">
                            {title}
                          </span>
                        </a>
                      </Link>
                      <span className="flex items-center px-2 py-1 border rounded-md dark:border-jacarta-600 border-jacarta-100 whitespace-nowrap">
                        <span>
                          <Tippy
                            content={
                              <span className="block px-2 py-1">CORE</span>
                            }
                          >
                            <img
                              src="/images/core-icon.svg"
                              alt="icon"
                              className="w-4 h-4 mr-1 icon"
                            />
                          </Tippy>
                        </span>
                      </span>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="dark:text-jacarta-300">Highest Bid</span>
                      <span className="dark:text-jacarta-100 text-jacarta-700">
                        {price}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-8">
                      <button
                        className="text-sm font-semibold text-accent font-display"
                        onClick={() => dispatch(bidsModalShow())}
                      >
                        Place bid
                      </button>

                      <Likes
                        like={likes}
                        classes="flex items-center space-x-1"
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {loadMoreBtn && (
            <div className="mt-10 text-center">
              <button
                onClick={handleloadMore}
                className="inline-block px-8 py-3 font-semibold text-center text-white transition-all rounded-full bg-accent shadow-accent-volume hover:bg-accent-dark"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Auctions_categories;
