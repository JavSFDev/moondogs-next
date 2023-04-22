import Link from "next/link";
import React from "react";
import { shortenAddress } from "../../utils";

const Explore_collection_item = ({ collections }: { collections: GetCollectionsResponse }) => {
  return (
    <>
      {collections &&
        collections.collections?.map((collection, index) => {
          const { id, profileImage, name, likedByUsers, creator } = collection[0];
          return (
            <article key={id}>
              <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
                <a className="flex space-x-[0.625rem]" href={`/collection/${id}`}>
                  <span className="w-full">
                    <img
                      src={profileImage || "/images/products/item_1.jpg"}
                      alt="item 1"
                      className="h-full w-full rounded-[0.625rem] object-cover"
                      loading="lazy"
                    />
                  </span>
                </a>

                <a
                  href={`/collection/${id}`}
                  className="block mt-4 text-base font-display hover:text-accent dark:hover:text-accent text-jacarta-700 dark:text-white"
                >
                  {name}
                </a>

                <div className="flex items-center justify-between mt-2 text-sm font-medium tracking-tight">
                  <div className="flex flex-wrap items-center">
                    <Link href="/profile/avatar_6">
                      <a className="mr-2 shrink-0">
                        <img src={creator?.profileImage} alt="owner" className="w-5 h-5 rounded-full" />
                      </a>
                    </Link>
                    <span className="mr-1 dark:text-jacarta-400">by</span>
                    <a className="text-accent" href={`/profile/${creator?.address}`}>
                      {creator?.name || shortenAddress(creator?.address)}
                    </a>
                  </div>
                  <span className="text-sm dark:text-jacarta-300">{collection[1]} Items</span>
                </div>
              </div>
            </article>
          );
        })}
    </>
  );
};

export default Explore_collection_item;
