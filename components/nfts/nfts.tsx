import "swiper/css";
import "swiper/css/navigation";
import { HeadLine } from "../component";
import "tippy.js/dist/tippy.css";
import HotNftCarousel from "../carousel/Hot_Nft_Carousel";

const HotNfts = ({ classes = "pt-10 pb-24" }) => {
  return (
    <section className={classes}>
      {/* <!-- Hot Bids --> */}
      <div className="container">
        <HeadLine
          text="Hot NFTs"
          image="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@7.0.2/img/apple/64/1f525.png"
          classes="font-display text-jacarta-700 mb-8 text-center text-3xl dark:text-white"
          pera={undefined}
        />

        <div className="relative">
          {/* <!-- Slider --> */}
          <HotNftCarousel />
        </div>
      </div>
      {/* <!-- end hot bids --> */}
    </section>
  );
};

export default HotNfts;
