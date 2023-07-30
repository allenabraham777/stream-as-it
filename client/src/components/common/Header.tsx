import React from "react";
import BroadcastController from "components/StreamDashboard/BroadcastController";
import { TbBuildingBroadcastTower } from "react-icons/tb";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="p-4 h-[5vh] fixed top-0 left-0 w-full border-b flex justify-between items-center">
      <a
        href="/"
        className="text-2xl font-mono uppercase font-black text-purple-700 tracking-wider flex items-center gap-2"
      >
        <TbBuildingBroadcastTower />
        Stream As It
      </a>
      <div>
        <BroadcastController />
      </div>
    </div>
  );
};

export default Header;
