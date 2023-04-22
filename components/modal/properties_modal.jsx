import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closePropertiesModal } from "../../redux/modalSlice";

const Properties_modal = () => {
  const { propertiesModalValue } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <div
        className={
          propertiesModalValue ? "modal fade show block" : "modal fade"
        }
      >
        <div className="max-w-2xl modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addPropertiesLabel">
                Add properties
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => dispatch(closePropertiesModal())}
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
              <p className="mb-8 dark:text-jacarta-300">
                Item Properties show up underneath your item, are clickable, and
                can be filtered in your {"collection's"}
                sidebar.
              </p>

              <div className="relative flex items-center my-3">
                <button className="flex items-center self-end justify-center w-12 h-12 border border-r-0 rounded-l-lg dark:bg-jacarta-700 dark:border-jacarta-600 hover:bg-jacarta-100 border-jacarta-100 bg-jacarta-50 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="w-6 h-6 fill-jacarta-500 dark:fill-jacarta-300"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                  </svg>
                </button>

                <div className="flex-1">
                  <label className="block mb-3 text-base font-semibold font-display text-jacarta-700 dark:text-white">
                    Type
                  </label>
                  <input
                    type="text"
                    className="w-full h-12 px-4 border border-r-0 dark:bg-jacarta-700 dark:border-jacarta-600 focus:ring-accent border-jacarta-100 dark:placeholder-jacarta-300 focus:ring-inset dark:text-white"
                    placeholder="Character"
                  />
                </div>

                <div className="flex-1">
                  <label className="block mb-3 text-base font-semibold font-display text-jacarta-700 dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full h-12 px-4 border rounded-r-lg dark:bg-jacarta-700 dark:border-jacarta-600 focus:ring-accent border-jacarta-100 dark:placeholder-jacarta-300 focus:ring-inset dark:text-white"
                    placeholder="Male"
                  />
                </div>
              </div>

              <button className="px-8 py-2 mt-2 text-sm font-semibold text-center transition-all border-2 rounded-full hover:bg-accent border-accent text-accent hover:text-white">
                Add More
              </button>
            </div>
            {/* <!-- end body --> */}

            <div className="modal-footer">
              <div className="flex items-center justify-center space-x-4">
                <button
                  type="button"
                  className="px-8 py-3 font-semibold text-center text-white transition-all rounded-full bg-accent shadow-accent-volume hover:bg-accent-dark"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties_modal;
