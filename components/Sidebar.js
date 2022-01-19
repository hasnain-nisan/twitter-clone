import Image from 'next/image';
import React from 'react'
import SidebarLink from './SidebarLink';
import { useSession, signOut } from "next-auth/react";
import {HiDotsCircleHorizontal} from 'react-icons/hi'
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import {
  FaHashtag,
  FaBell,
  FaInbox,
  FaBookmark,
  FaClipboardList,
  FaUserAlt,
  FaHome,
} from "react-icons/fa";


const Sidebar = () => {

  const { data: session } = useSession();

    return (
      <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
        <div className="flex items-center justify-center w-14 h-14 p-0 xl:ml-24 hoverAnimation">
          <Image src="https://rb.gy/ogau5a" width={30} height={30} alt="logo" />
        </div>
        <div className="mt-4 mb-2.5 xl:ml-24">
          <SidebarLink text="Home" Icon={FaHome} active />
          <SidebarLink text="Explore" Icon={FaHashtag} />
          <SidebarLink text="Notifications" Icon={FaBell} />
          <SidebarLink text="Messages" Icon={FaInbox} />
          <SidebarLink text="Bookmarks" Icon={FaBookmark} />
          <SidebarLink text="Lists" Icon={FaClipboardList} />
          <SidebarLink text="Profile" Icon={FaUserAlt} />
          <SidebarLink text="More" Icon={HiDotsCircleHorizontal} />
        </div>
        <button className="hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[52px] text-2xl font-bold shadow-md hover:bg-[#1a8cd8]">
          Tweet
        </button>
        <div
          className="text-[#d9d9d9] flex items-center justify-center mt-auto hoverAnimation xl:ml-auto xl:-mr-0"
          onClick={signOut}
        >
          <img
            src={session?.user?.image}
            alt=""
            className="h-10 w-10 rounded-full xl:mr-2.5 border-gray-600 border-2"
          />
          <div className="hidden xl:inline leading-5">
            <h4 className="font-bold">{session.user.name}</h4>
            <p className="text-[#6e767d]">@{session.user.tag}</p>
          </div>
          <BiDotsHorizontalRounded className="h-5 hidden xl:inline ml-5" />
        </div>
      </div>
    );
}

export default Sidebar
