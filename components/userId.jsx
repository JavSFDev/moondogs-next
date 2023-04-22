import React, { useEffect, useState } from "react";
import { shortenAddress } from "../utils";
import { useCopyToClipboard } from "../hooks";
import { toast } from "react-toastify";

const UserId = ({ classes, userId, shortId }) => {
  const [copied, setCopied] = useState(false);
  const [, copy] = useCopyToClipboard();

  const handleCopy = async (userId) => {
    const res = await copy(userId);
    if (res) toast.success("Copied");
  };

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);

  return (
    <div>
      <button onClick={() => handleCopy(userId)} className={classes}>
        <span>{shortenAddress(userId)}</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="w-4 h-4 mb-px ml-auto dark:fill-jacarta-300 fill-jacarta-500"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M7 7V3a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-4v3.993c0 .556-.449 1.007-1.007 1.007H3.007A1.006 1.006 0 0 1 2 20.993l.003-12.986C2.003 7.451 2.452 7 3.01 7H7zm2 0h6.993C16.549 7 17 7.449 17 8.007V15h3V4H9v3zM4.003 9L4 20h11V9H4.003z"></path>
        </svg>
      </button>
    </div>
  );
};

export default UserId;
