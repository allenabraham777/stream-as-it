import React from "react";
import { RecoilRoot } from "recoil";
import AppRoutes from "router/AppRoutes";

type Props = {};

const App = (props: Props) => {
  return (
    <RecoilRoot>
      <AppRoutes />
    </RecoilRoot>
  );
};

export default App;
