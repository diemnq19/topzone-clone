import { UpOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isScroll, setIsScroll] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 300) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed z-[1000] bottom-16 right-16 w-10 h-10 bg-white/80 rounded flex items-center justify-center text-dark-bg-color text-xl cursor-pointer ${
        isScroll ? "block" : "hidden"
      }`}
      onClick={scrollTop}
    >
      <UpOutlined />
    </div>
  );
};

export default ScrollToTop;
