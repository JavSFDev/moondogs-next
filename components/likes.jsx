import Tippy from "@tippyjs/react";
import React, { useState } from "react";

const Likes = ({
  like,
  classes = "dark:bg-jacarta-700 absolute top-3 right-3 flex items-center space-x-1 rounded-md bg-white p-2",
}) => {
  const [likeState, setLikeState] = useState(
    typeof like === "string" ? +like : like
  );
  const [likeNumber, setlikeNumber] = useState(likeState);

  const handleLike = () => {
    if (likeState >= likeNumber) {
      setlikeNumber((prev) => prev + 1);
    } else {
      setlikeNumber((prev) => prev - 1);
    }
  };

  return (
    <div className={classes} onClick={handleLike}>
      <Tippy content={<span>Favorite</span>}>
        <button className="relative cursor-pointer js-likes">
          {likeState === likeNumber ? (
            <svg className="w-4 h-4 icon icon-heart-fill dark:fill-jacarta-200 fill-jacarta-500 hover:fill-red dark:hover:fill-red">
              <use xlinkHref="/icons.svg#icon-hert-fill"></use>
            </svg>
          ) : (
            <svg className="w-4 h-4 icon icon-heart-fill dark:fill-jacarta-200 fill-jacarta-500 hover:fill-red dark:hover:fill-red">
              <use xlinkHref="/icons.svg#icon-heart-fill"></use>
            </svg>
          )}
        </button>
      </Tippy>
      <span className="text-sm dark:text-jacarta-200">{likeNumber}</span>
    </div>
  );
};

export default Likes;
