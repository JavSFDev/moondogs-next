import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bidsModalHide } from "../../redux/modalSlice";

const BidsModal = () => {
  const { bidsModal } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const [coreAmount, setCoreAmount] = useState(0.05);

  const handleCoreAmount = (e) => {
    e.preventDefault();
    setCoreAmount(e.target.value);
  };
  return (
    <div>
      <div className={bidsModal ? "modal fade show block" : "modal fade"}>
        <div className="max-w-2xl modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="placeBidLabel">
                Place a bid
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => dispatch(bidsModalHide())}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="w-6 h-6 fill-jacarta-700 dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                </svg>
              </button>
            </div>

            {/* <!-- Body --> */}
            <div className="p-6 modal-body">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold font-display text-jacarta-700 dark:text-white">
                  Price
                </span>
              </div>

              <div className="relative flex items-center mb-2 overflow-hidden border rounded-lg dark:border-jacarta-600 border-jacarta-100">
                <div className="flex items-center self-stretch flex-1 px-2 border-r border-jacarta-100 bg-jacarta-50">
                  <span>
                    <img
                      src="/images/core-icon.svg"
                      alt="icon"
                      className="w-4 h-4 mr-1 icon"
                    />
                  </span>
                  <span className="text-sm font-display text-jacarta-700">
                    CORE
                  </span>
                </div>

                <input
                  type="number"
                  className="focus:ring-accent h-12 w-full flex-[3] border-0 focus:ring-inset dark:text-jacarta-700"
                  placeholder="Amount"
                  value={coreAmount}
                  onChange={(e) => handleCoreAmount(e)}
                />

                <div className="flex self-stretch justify-end flex-1 border-l bg-jacarta-50 border-jacarta-100 dark:text-jacarta-700">
                  <span className="self-center px-2 text-sm">$130.82</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm dark:text-jacarta-400">
                  Balance: 0.0000 WCORE
                </span>
              </div>

            </div>
            {/* <!-- end body --> */}

            <div className="modal-footer">
              <div className="flex items-center justify-center space-x-4">
                <button
                  type="button"
                  className="px-8 py-3 font-semibold text-center text-white transition-all rounded-full bg-accent shadow-accent-volume hover:bg-accent-dark"
                >
                  Place Bid
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidsModal;
