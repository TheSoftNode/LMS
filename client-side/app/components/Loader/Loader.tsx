import React from "react";

type Props = {};

function Loader({}: Props) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
