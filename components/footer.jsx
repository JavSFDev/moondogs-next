import Link from "next/link";
import { footerMenuList, socialIcons } from "../data/footer_data";

const footer = () => {
  return (
    <>
      {/* <!-- Footer --> */}

      <footer className="bg-white dark:bg-jacarta-900 page-footer">
        <div className="container">
          <div className="grid grid-cols-6 pt-24 pb-12 gap-x-7 gap-y-14 md:grid-cols-12">
            <div className="col-span-3 md:col-span-4">
              {/* <!-- Logo --> */}
              <Link href="#">
                <a className="inline-block mb-6">
                  <img
                    src="/images/logo.png"
                    className="max-h-7 dark:hidden"
                    alt="Moondogs | NFT Marketplace"
                  />
                </a>
              </Link>

              <Link href="#">
                <a className="inline-block mb-6 ">
                  <img
                    src="/images/logo_white.png"
                    className="hidden h-14 dark:block"
                    alt="Moondogs | NFT Marketplace"
                  />
                </a>
              </Link>
              <p className="mb-12 dark:text-jacarta-300">
                Create, sell and collect truly rare digital artworks. Powered by
                blockchain technology.
              </p>

              {/* <!-- Socials --> */}
              <div className="flex space-x-5">
                {socialIcons?.map((item) => {
                  const { id, href, text } = item;
                  return (
                    <Link href={href} key={id}>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer group"
                      >
                        <svg className="w-5 h-5 icon group-hover:fill-accent fill-jacarta-300 dark:group-hover:fill-white">
                          <use xlinkHref={`/icons.svg#icon-${text}`}></use>
                        </svg>
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>

            {footerMenuList?.map((single) => (
              <div
                className={`col-span-full sm:col-span-3 md:col-span-2 ${single.diffClass}`}
                key={single.id}
              >
                <h3 className="mb-6 text-sm font-display text-jacarta-700 dark:text-white">
                  {single.title}
                </h3>
                <ul className="flex flex-col space-y-1 dark:text-jacarta-300">
                  {single.list?.map((item) => {
                    const { id, href, text } = item;
                    return (
                      <li key={id}>
                        <Link href={href}>
                          <a className="hover:text-accent dark:hover:text-white">
                            {text}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-between py-8 space-y-2 sm:flex-row sm:space-y-0">
            <span className="text-sm dark:text-jacarta-400">
              <span>© {new Date().getFullYear()} Moondogs</span>
              {/* <Link href="https://themeforest.net/user/ib-themes">
                <a className="hover:text-accent dark:hover:text-white">
                  {" "}
                  ib-themes
                </a>
              </Link> */}
            </span>

            <ul className="flex flex-wrap space-x-4 text-sm dark:text-jacarta-400">
              <li>
                <Link href="/tarms">
                  <a className="hover:text-accent dark:hover:text-white">
                    Terms and conditions
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/tarms">
                  <a className="hover:text-accent dark:hover:text-white">
                    Privacy policy
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default footer;
