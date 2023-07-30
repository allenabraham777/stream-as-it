import React from "react";
import Resolution from "components/SideBar/Tabs/Settings/Resolution";

type Props = {};

const Settings = (props: Props) => {
  return (
    <div className="px-8">
      <div className="py-4">
        <Resolution />
      </div>
    </div>
  );
};

export default Settings;
