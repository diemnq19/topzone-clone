import React from "react";
import CustomHeader from "../header";

const CustomLayout = ({ children }) => {
  return (
    <div className="bg-normal-bg-color w-full min-h-[100vh]">
      <CustomHeader />
      {children}
    </div>
  );
};

export default CustomLayout;
