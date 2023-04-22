import { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { buyModalShow } from "../../redux/modalSlice";
import { useDispatch } from "react-redux";
import Likes from "../likes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { fetchHotNfts } from "../../lib/fetch-hot-nfts";

const HotNftCarousel = () => {
  const dispatch = useDispatch();
  const [metadataArray, setMetadataArray] = useState<Metadata[]>();
  const { data: hotNfts } = useQuery(["hotNfts"], () => fetchHotNfts(), {
    staleTime: Infinity,
  });

  useEffect(() => {
    async function metadataRequests() {
      try {
        if (hotNfts) {
          const metadataRequests = hotNfts?.map((nft) => {
            const parsedString = JSON.parse(nft.metadataUrl.slice(1, -1));
            const metadataUrl = parsedString.includes("ipfs://")
            ? "https://nftstorage.link/ipfs/" + parsedString.split("://")[1]
              : parsedString;
            return axios.get<Metadata>(metadataUrl);
          });
          const responses = await Promise.all(metadataRequests);
          const responseData = responses?.map((response) => response.data);
          setMetadataArray(responseData);
        }
      } catch (error) {
        console.error(error);
      }
    }

    metadataRequests();
  }, [hotNfts]);

  const getImageUrl = useCallback((url: string | undefined) => {
    console.log(url);
    if (url) return url.includes("ipfs://") ? "https://nftstorage.link/ipfs/" + url.split("://")[1] : url;
    else return "";
  }, []);

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={30}
        slidesPerView="auto"
        loop={true}
        breakpoints={{
          240: {
            slidesPerView: 1,
          },
          565: {
            slidesPerView: 2,
          },
          1000: {
            slidesPerView: 3,
          },
          1100: {
            slidesPerView: 4,
          },
        }}
        navigation={{
          nextEl: ".bids-swiper-button-next",
          prevEl: ".bids-swiper-button-prev",
        }}
        className=" card-slider-4-columns !py-5"
      >
        {hotNfts &&
          hotNfts?.map((item, index) => {
            const { id, collection, price, likedByUsers } = item;
            return (
              <SwiperSlide className="text-white" key={id}>
                <article>
                  <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-500">
                    <figure>
                      {/* {`item/${itemLink}`} */}
                      <Link href={`/item/${id}`}>
                        <a>
                          <div className="w-full">
                            <img
                              src={getImageUrl(metadataArray?.[index]?.image) || "/images/products/item_1.jpg"}
                              alt={metadataArray?.[index]?.name}
                              height={230}
                              width={230}
                              className="rounded-[0.625rem] w-full"
                              loading="lazy"
                            />
                          </div>
                        </a>
                      </Link>
                    </figure>
                    <div className="flex items-center justify-between mt-4">
                      <Link href={"/item/" + id}>
                        <a>
                          <span className="text-base font-display text-jacarta-700 hover:text-accent dark:text-white">
                            {metadataArray?.[index]?.name || 'Unnamed'}
                          </span>
                        </a>
                      </Link>
                      <span className="flex items-center px-2 py-1 border rounded-md dark:border-jacarta-600 border-jacarta-100 whitespace-nowrap">
                        <Tippy content={<span>CORE</span>}>
                          <img src="/images/core-icon.png" alt="" className="w-3 h-3 mr-1" />
                        </Tippy>

                        <span className="text-sm font-medium tracking-tight text-green">{price} CORE</span>
                      </span>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="dark:text-jacarta-300 text-jacarta-500">{collection.name}</span>
                    </div>

                    <div className="flex items-center justify-between mt-8">
                      <button
                        type="button"
                        className="text-sm font-semibold text-accent font-display"
                        onClick={() => dispatch(buyModalShow())}
                      >
                        Buy now
                      </button>

                      <Likes like={likedByUsers.length} classes="flex items-center space-x-1" />
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
      </Swiper>
      {/* <!-- Slider Navigation --> */}
      <div className="group bids-swiper-button-prev swiper-button-prev shadow-white-volume absolute !top-1/2 !-left-4 z-10 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-left-6 after:hidden">
        <MdKeyboardArrowLeft />
      </div>
      <div className="group bids-swiper-button-next swiper-button-next shadow-white-volume absolute !top-1/2 !-right-4 z-10 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-right-6 after:hidden">
        <MdKeyboardArrowRight />
      </div>
    </>
  );
};

export default HotNftCarousel;
