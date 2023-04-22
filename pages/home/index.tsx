import React from "react";
import {
  Hero,
  HotNfts,
  Top_collection,
  Trending_category,
} from "../../components/component";
import Meta from "../../components/Meta";

const Home = () => {
  return (
    <main>
      <Meta title="Home" />
      <Hero />
      <HotNfts />
      <Top_collection />
      <Trending_category />
    </main>
  );
};

export default Home;
