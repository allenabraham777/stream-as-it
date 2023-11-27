import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { BiUserCircle } from "react-icons/bi";
import { IoSettingsSharp, IoLogOutOutline } from "react-icons/io5";
import userState from "selectors/userSelectors/userState";

type Props = {};

const UserMenu = (props: Props) => {
  const params = useParams();
  const user = useRecoilValue(userState);

  if (!user || params.streamId) return null;

  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="relative">
      <button
        className="text-3xl hover:bg-gray-100 p-2 rounded-full"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <BiUserCircle />
      </button>
      <div
        className={`${
          showMenu ? "block" : "hidden"
        } absolute -translate-y-2 right-4 top-[100%] border overflow-hidden bg-white w-56 p-2`}
      >
        <ul className="text-lg cursor-pointer">
          <li className="px-4 py-2 border-b hover:bg-gray-100 flex gap-2 items-center">
            <IoSettingsSharp className="text-2xl" /> Account Settings
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 flex gap-2 items-center">
            <IoLogOutOutline className="text-2xl" /> Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
