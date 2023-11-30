import React, { useState } from "react";
import { IoColorPalette, IoSettingsSharp } from "react-icons/io5";
import { LiaCommentsSolid } from "react-icons/lia";
import { HiRectangleStack } from "react-icons/hi2";
import Brand from "components/SideBar/Tabs/Brand/Brand";
import Settings from "components/SideBar/Tabs/Settings/Settings";

type Props = {};

type TabProps = {
  tabName: string;
};

const tabs = [
  {
    label: "Comments",
    key: "COMMENTS",
    icon: LiaCommentsSolid,
  },
  {
    label: "Banners",
    key: "BANNERS",
    icon: HiRectangleStack,
  },
  {
    label: "Brand",
    key: "BRAND",
    icon: IoColorPalette,
  },
  {
    label: "Settings",
    key: "SETTINGS",
    icon: IoSettingsSharp,
  },
];

const Tab = (props: TabProps) => {
  const { tabName } = props;
  switch (tabName) {
    case "BRAND": {
      return <Brand />;
    }
    case "SETTINGS": {
      return <Settings />;
    }
    default: {
      return <>Not Selected</>;
    }
  }
};

const SideBar = (props: Props) => {
  const [active, setActive] = useState("BRAND");
  const setActiveTab = (tabName: string) => {
    setActive(tabName);
  };
  return (
    <div className="h-[100%] w-[100%] flex flex-shrink">
      <div className="h-[100%] w-[78%]">
        <Tab tabName={active} />
      </div>
      <div className="h-[100%] text-center border-l border-gray-500 border-opacity-10 flex flex-col flex-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              onClick={setActiveTab.bind(null, tab.key)}
              key={tab.key}
              className={`p-5 text-center flex flex-col items-center justify-center ${
                tab.key === active ? "text-blue-700 bg-blue-200" : ""
              }`}
            >
              <Icon className="text-3xl" />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
