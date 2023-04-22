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

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-[1.875rem] lg:grid-cols-4">
            {/* {topCollections
              ? topCollections?.[0]?.map((collection, i) => {
                  const { id, bannerImage, name, verified, volume } =
                    collection;

                  return (
                    <div
                      className="flex py-4 transition-shadow bg-white border border-jacarta-100 dark:bg-jacarta-700 rounded-2xl px-7 hover:shadow-lg dark:border-transparent"
                      key={id}
                    >
                      <figure className="mr-4 shrink-0">
                        <a
                          className="relative block"
                          href={"/collection/" + id}
                        >
                          <img
                            src={bannerImage || "/images/team/team_1.jpg"}
                            alt={name}
                            height={48}
                            width={48}
                            className="rounded-2lg"
                          />
                          <div className="absolute flex items-center justify-center w-6 h-6 text-xs text-white border-2 border-white rounded-full dark:border-jacarta-600 bg-jacarta-700 -left-3 top-1/2 -translate-y-2/4">
                            {i + 1}
                          </div>
                          {verified && (
                            <div
                              className="dark:border-jacarta-600 bg-green absolute -left-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                              data-tippy-content="Verified Collection"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="h-[.875rem] w-[.875rem] fill-white"
                              >
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                              </svg>
                            </div>
                          )}
                        </a>
                      </figure>
                      <div>
                        <a className="block" href={"/collection/" + id}>
                          <span className="font-semibold font-display text-jacarta-700 hover:text-accent dark:text-white">
                            {name?.substring(0, 10)}
                          </span>
                        </a>
                        <span className="text-sm dark:text-jacarta-300">
                          {volume} CORE
                        </span>
                      </div>
                    </div>
                  );
                })
              : null} */}
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
