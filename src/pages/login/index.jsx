import React from "react";
import FormLogin from "../../components/formLogin";

const Login = () => {
  return (
    <div className="w-full min-h-screen bg-normal-bg-color flex flex-row-reverse items-center justify-center px-4">
      {/* form login */}
      <div className="w-1/2 ml-12">
        <FormLogin />
      </div>
      <div className="w-1/2 mr-4">
        <div className="bg-topzone-image bg-no-repeat bg-contain min-h-[190px] bg-right"></div>
      </div>
    </div>
  );
};

export default Login;
