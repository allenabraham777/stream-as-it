import React from "react";
import SignIn from "components/Authentication/SignInForm";
import DefaultLayout from "layouts/Default";

type Props = {};

const Home = (props: Props) => {
  return (
    <DefaultLayout>
      <div className="text-2xl font-bold">Home Page</div>
    </DefaultLayout>
  );
};

export default Home;
