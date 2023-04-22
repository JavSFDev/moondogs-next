import Link from "next/link";

const hero = () => {
  return (
    <section className="relative pt-20 pb-10 md:pt-32 h-1527">
      <picture className="absolute inset-x-0 top-0 block h-full pointer-events-none -z-10 dark:hidden">
        <img
          src="/images/gradient.jpg"
          alt="gradient"
          className="w-full h-full"
        />
      </picture>
      <picture className="absolute inset-x-0 top-0 hidden pointer-events-none -z-10 dark:block">
        <img
          src="/images/gradient_dark.jpg"
          alt="gradient dark"
          className="w-full h-full"
        />
      </picture>

      <div className="container h-full mx-auto">
        <div className="grid items-center h-full gap-4 md:grid-cols-12">
          <div className="flex flex-col items-center justify-center h-full col-span-6 py-10 md:items-start md:py-20 xl:col-span-4">
            <h1 className="mb-6 text-5xl font-bold text-center text-jacarta-700 font-display dark:text-white md:text-left lg:text-7xl xl:text-9xl">
              OpenWaters
            </h1>
            <h4 className="mb-6 text-3xl font-bold text-left text-jacarta-700 font-display dark:text-white md:text-left lg:text-6xl xl:text-6xl">
              Buy, sell and collect NFTs
            </h4>
            <p className="mb-8 text-lg text-center dark:text-jacarta-200 md:text-left">
            An NFT marketplace built on the powerful CoreDAO blockchain, with a focus on safety and scalability.
            </p>
            <div className="flex space-x-4">
              <Link href="/collection">
                <a className="px-8 py-3 font-semibold text-center text-white transition-all rounded-full bg-accent shadow-accent-volume hover:bg-accent-dark w-36">
                  Explore
                </a>
              </Link>
            </div>
          </div>

          {/* <!-- Hero image --> */}
          <div className="col-span-6 xl:col-span-8">
            <div className="relative text-center md:pl-8 md:text-right">
              <img
                src="/images/new/Logo-White.png"
                alt=""
                className="hero-img pl-28  inline-block w-72 sm:w-full lg:w-full xl:w-full"
              />
              <img
                src="/images/hero/3D_elements.png"
                alt=""
                className="animate-fly pl-16 sm:pl-0 lg:pl-8 xl:pl-8 absolute top-0 w-72 sm:w-full lg:w-[24rem] xl:w-[35rem] "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default hero;
