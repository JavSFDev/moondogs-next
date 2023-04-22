/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import HeadLine from "../headLine";
import { useQuery } from "@tanstack/react-query";
import { fetchTopCollection } from "../../lib/fetch-top-collections";

const Top_collection = () => {
  const { data: topCollections } = useQuery(
    ["topCollections"],
    () => fetchTopCollection(),
    {
      staleTime: Infinity,
    }
  );

  return (
    <div>
      <section className="relative py-24 dark:bg-jacarta-800">
        <picture className="absolute inset-0 pointer-events-none -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="w-full h-full"
          />
        </picture>
        <div className="container">
          <div className="flex items-center justify-center mb-12 text-lg text-center font-display text-jacarta-700 sm:text-3xl dark:text-white gap-x-3">
            <HeadLine
              text="Top collections over"
              classes="inline"
              image={""}
              pera={""}
            />

            <div className="relative dropdown">
              <p className="inline-flex items-center dropdown-toggle text-accent">
                Last 30 days
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/rankings">
              <a className="inline-block px-8 py-3 font-semibold text-center text-white transition-all rounded-full bg-accent shadow-accent-volume hover:bg-accent-dark">
                Go to Rankings
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Top_collection;
