import React, { useContext, useEffect } from "react";
import UserContext from "../components/UserContext";
import {
  Hero,
  HotNfts,
  Top_collection,
  Trending_category,
} from "../components/component";
import Meta from "../components/Meta";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchHotNfts } from "../lib/fetch-hot-nfts";
import { fetchTopCollection } from "../lib/fetch-top-collections";

export default function Home() {
  const { scrollRef } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, scrollRef.current.scrollPos);
    const handleScrollPos = () => {
      scrollRef.current.scrollPos = window.scrollY;
    };
    window.addEventListener("scroll", handleScrollPos);
    return () => {
      window.removeEventListener("scroll", handleScrollPos);
    };
  });

  return (
    <main>
      <Meta title="Home" />
      <Hero />
      <HotNfts />
      <Top_collection />
      {/* <Trending_category /> */}
    </main>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["hotNfts"], () => fetchHotNfts());
  await queryClient.prefetchQuery(["topCollections"], () => fetchTopCollection());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
