/* eslint-disable @next/next/no-img-element */
import React from "react";
import { HeadLine } from "../../components/component";
import Explore_collection_item from "../../components/collections/explore_collection_item";
import Meta from "../../components/Meta";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCollection } from "../../lib/fetch-all-collections";

const Explore_collection = () => {
  const { data: allCollections } = useQuery(["getAllCollections"], () => fetchAllCollection(), {
    staleTime: Infinity,
  });
  return (
    <>
      <Meta title="Explore Collection || Moondogs | NFT Marketplace" />
      <section className="relative pb-24 mt-24 lg:pb-48">
        <picture className="absolute inset-0 pointer-events-none -z-10 dark:hidden">
          <img src="/images/gradient_light.jpg" alt="gradient" className="h-full" />
        </picture>

        <div className="container">
          <HeadLine
            text="Explore Collections"
            classes="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white"
            image={""}
            pera={""}
          />

          {/* <!-- Grid --> */}
          {allCollections && (
            <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-3 lg:grid-cols-4">
              <Explore_collection_item collections={allCollections} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Explore_collection;

