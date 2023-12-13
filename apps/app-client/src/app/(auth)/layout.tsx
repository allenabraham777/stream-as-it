import NavBar from "@/components/NavBar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <section className="h-full flex items-center justify-center">
      <NavBar fixed hideButtons />
      {children}
    </section>
  );
};

export default layout;
