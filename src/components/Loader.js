import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
