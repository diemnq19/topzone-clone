import React from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();
  const pathRoute = location.pathname.split("/")[1];
  return (
    <div className="text-base text-white flex items-center">
      <Link
        to={"/iphone"}
        className={`${
          pathRoute === "iphone" ? "bg-white/20" : "hover:bg-white/20"
        } p-6 h-full min-w-[100px] text-center hover:text-white`}
      >
        iPhone
      </Link>
      <Link
        to={"/mac"}
        className={`${
          pathRoute === "mac" ? "bg-white/20" : "hover:bg-white/20"
        } p-6 h-full min-w-[100px] text-center hover:text-white`}
      >
        Mac
      </Link>
      <Link
        to={"/ipad"}
        className={`${
          pathRoute === "ipad" ? "bg-white/20" : "hover:bg-white/20"
        } p-6 h-full min-w-[100px] text-center hover:text-white`}
      >
        iPad
      </Link>
      <Link
        to={"/watch"}
        className={`${
          pathRoute === "watch" ? "bg-white/20" : "hover:bg-white/20"
        } p-6 h-full min-w-[100px] text-center hover:text-white`}
      >
        Watch
      </Link>
      <Link
        to={"/sound"}
        className={`${
          pathRoute === "sound" ? "bg-white/20" : "hover:bg-white/20"
        } p-6 h-full min-w-[100px] text-center hover:text-white`}
      >
        Sound
      </Link>
      <Link
        to={"/accessory"}
        className={`${
          pathRoute === "accessory" ? "bg-white/20" : "hover:bg-white/20"
        } p-6 h-full min-w-[100px] text-center hover:text-white`}
      >
        Accessory
      </Link>
    </div>
  );
};

export default Menu;
