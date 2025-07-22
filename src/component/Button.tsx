import React from "react";
import Loader from "./Loader";

export default function Button({ isLoading = false, text = "Submit" }) {
  return (
    <button
      type="submit"
      className={`w-[70%] bg-[#0993EC] hover:bg-[#0882d2] text-white font-medium py-2 rounded-md text-sm transition-all ${
        !isLoading ? "cursor-pointer" : "cursor-not-allowed"
      }`}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2 text-center">
          <Loader />
          Processing...
        </span>
      ) : (
        text
      )}
    </button>
  );
}
