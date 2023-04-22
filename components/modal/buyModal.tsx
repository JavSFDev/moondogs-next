import Link from "next/link";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { buyModalHide } from "../../redux/modalSlice";
import { RootState } from "../../redux/store";

const BuyModal = () => {
  const { buyModal } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  return (
    <div>
      {/* <!-- Buy Now Modal --> */}
      <div className={buyModal ? "modal fade show block" : "modal fade"}>
        <div className="max-w-2xl modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="buyNowModalLabel">
                Complete checkout
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => dispatch(buyModalHide())}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="w-6 h-6 fill-jacarta-700 dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                </svg>
              </button>
            </div>

            {/* <!-- Body --> */}
            <div className="p-6 modal-body">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold font-display text-jacarta-700 dark:text-white">
                  Item
                </span>
                <span className="text-sm font-semibold font-display text-jacarta-700 dark:text-white">
                  Subtotal
                </span>
              </div>

              <div className="relative flex items-center py-4 border-t border-b dark:border-jacarta-600 border-jacarta-100">
                <figure className="self-start mr-5">
                  <img
                    src="/images/avatars/avatar_2.jpg"
                    alt="avatar 2"
                    className="rounded-2lg"
                    loading="lazy"
                  />
                </figure>

                <div>
                  <a href="collection.html" className="text-sm text-accent">
                    Elon Musk #709
                  </a>
                  <h3 className="mb-1 text-base font-semibold font-display text-jacarta-700 dark:text-white">
                    Lazyone Panda
                  </h3>
                  <div className="flex flex-wrap items-center">
                    <span className="block mr-1 text-sm dark:text-jacarta-300 text-jacarta-500">
                      Creator Earnings: 5%
                    </span>
                    <span data-tippy-content="The creator of this collection will receive 5% of the sale total from future sales of this item.">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="w-4 h-4 dark:fill-jacarta-300 fill-jacarta-700"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z" />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="ml-auto">
                  <span className="flex items-center mb-1 whitespace-nowrap">
                    <span data-tippy-content="CORE">
                      <img
                        src="/images/core-icon.svg"
                        alt="icon"
                        className="w-4 h-4 mr-1 icon"
                      />
                    </span>
                    <span className="text-sm font-medium tracking-tight dark:text-jacarta-100">
                      1.55 CORE
                    </span>
                  </span>
                  <div className="text-sm text-right dark:text-jacarta-300">
                    $130.82
                  </div>
                </div>
              </div>

              {/* <!-- Total --> */}
              <div className="dark:border-jacarta-600 border-jacarta-100 mb-2 flex items-center justify-between border-b py-2.5">
                <span className="font-semibold font-display text-jacarta-700 hover:text-accent dark:text-white">
                  Total
                </span>
                <div className="ml-auto">
                  <span className="flex items-center whitespace-nowrap">
                    <span data-tippy-content="CORE">
                      <img
                        src="/images/core-icon.svg"
                        alt="icon"
                        className="w-4 h-4 mr-1 icon"
                      />
                    </span>
                    <span className="font-medium tracking-tight text-green">
                      1.55 CORE
                    </span>
                  </span>
                  <div className="text-right dark:text-jacarta-300">
                    $130.82
                  </div>
                </div>
              </div>

            </div>
            {/* <!-- end body --> */}

            <div className="modal-footer">
              <div className="flex items-center justify-center space-x-4">
                {/* <Confirm_checkout /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyModal;
