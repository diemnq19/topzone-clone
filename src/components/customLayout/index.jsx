import React from "react";
import CustomHeader from "../header";
import CustomFooter from "../footer";

const CustomLayout = ({ children }) => {
  return (
    <div className="bg-normal-bg-color w-full min-h-screen">
      <CustomHeader />
      {children}
      <CustomFooter />
    </div>
  );
};

export default CustomLayout;
