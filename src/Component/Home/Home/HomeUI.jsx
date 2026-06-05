import React from "react";
import Home from "../Home";
import ALLUsers from "../ALLUsers/ALLUsers";

const HomeUI = () => {
  return (
    <div className="flex">
      <div className="flex-2">
        <Home></Home>
      </div>{" "}
      {/* <div className="flex-1">
        <ALLUsers />
      </div> */}
    </div>
  );
};

export default HomeUI;
