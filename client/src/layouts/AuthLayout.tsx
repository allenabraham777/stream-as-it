import React from "react";
import Header from "components/common/Header";

type Props = {
  children: JSX.Element;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="bg-blue-100 w-96 border">{children}</div>
    </div>
  );
};

export default AuthLayout;
