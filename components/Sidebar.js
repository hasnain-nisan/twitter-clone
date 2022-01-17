import Image from 'next/image';
import React from 'react'
import SidebarLink from './SidebarLink';
import {HiDotsCircleHorizontal} from 'react-icons/hi'
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
    return (
      <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
        <div className="flex items-center justify-center w-14 h-14 p-0 xl:ml-24 hoverAnimation">
          <Image src="https://rb.gy/ogau5a" width={30} height={30} alt="logo" />
        </div>
        <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
          <SidebarLink text="Home" Icon={FaHome} active />
          <SidebarLink text="Explore" Icon={FaHashtag} />
          <SidebarLink text="Notifications" Icon={FaBell} />
          <SidebarLink text="Messages" Icon={FaInbox} />
          <SidebarLink text="Bookmarks" Icon={FaBookmark} />
          <SidebarLink text="Lists" Icon={FaClipboardList} />
          <SidebarLink text="Profile" Icon={FaUserAlt} />
          <SidebarLink text="More" Icon={HiDotsCircleHorizontal} />
        </div>
      </div>
    );
}

export default Sidebar
