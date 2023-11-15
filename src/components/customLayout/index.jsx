import React from "react";
import CustomHeader from "../header";

const CustomLayout = ({ children }) => {
  return (
    <div className="bg-normal-bg-color w-full min-h-screen">
      <CustomHeader />
      {children}
    </div>
  );
};

export default CustomLayout;
