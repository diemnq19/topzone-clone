import React from "react";
import CustomHeader from "../header";
import CustomFooter from "../footer";
import ScrollToTop from "../scrollToTop";

const CustomLayout = ({ children }) => {
  return (
    <div className="bg-normal-bg-color w-full min-h-screen">
      <CustomHeader />
      {children}
      <CustomFooter />
      <ScrollToTop />
    </div>
  );
};

export default CustomLayout;
