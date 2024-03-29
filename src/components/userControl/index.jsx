import { Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import userAtom, { initialUserState } from "../../recoil/user";
import productCartAtom from "../../recoil/productCart";
import productSelectAtom from "../../recoil/selectedProduct";

const UserControl = () => {
  const isAuth = Cookies.get("token");
  const setUserState = useSetRecoilState(userAtom);
  const setCartState = useSetRecoilState(productCartAtom);
  const setSelectedProduct = useSetRecoilState(productSelectAtom)

  const handleLogout = () => {
    setUserState(initialUserState);
    setCartState([]);
    setSelectedProduct([])
    Cookies.remove("token");
  };
  const items = [
    {
      key: "1",
      label: <Link to="/account">My Account</Link>,
    },
    {
      key: "2",
      label: <Link to="/purchase">My purchase</Link>,
    },
    {
      key: "3",
      label: (
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      ),
    },
  ];

  return (
    <div>
      {!isAuth && (
        <div className="text-base ml-4 text-white">
          <Link to="/login" className="mr-2">
            Login
          </Link>
          <Link to="/register" className="ml-2">
            Register
          </Link>
        </div>
      )}
      {isAuth && (
        <div className="pb-0">
          <Dropdown menu={{ items }}>
            <Avatar
              icon={<UserOutlined />}
              className="cursor-pointer text-xl hover:!bg-white/20 pt-1"
              size={"large"}
            />
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default UserControl;
