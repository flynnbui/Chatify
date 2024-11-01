import {
  BellOutlined,
  HomeOutlined,
  LogoutOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";

function Navbar() {
  return (
    <nav className="flex h-12 w-full shrink-0 flex-row bg-inherit md:h-screen md:w-16 md:flex-col">
      {/* Logo */}
      <div className="hidden items-center justify-center text-center md:flex md:h-1/6">
        <div className="text-white">
          <button className="home">Chatify</button>
        </div>
      </div>
      {/* Button */}
      <div className="flex h-full w-full flex-row justify-around md:h-4/6 md:w-16 md:flex-col md:justify-start">
        <div className="h-12 text-center text-white md:h-16">
          <button
            className="h-12 w-16 text-center text-white home md:h-16 md:hover:bg-sky-900"
            aria-label="Home"
            title="Home"
          >
            <HomeOutlined />
          </button>
        </div>
        <div className="h-12 text-center text-white md:h-16">
          <button
            id="favorites"
            className="h-12 w-16 text-center text-white md:h-16 md:hover:bg-sky-900"
            aria-label="Notifications"
            title="Notifications"
          >
            <BellOutlined />
          </button>
        </div>
        <div className="h-12 text-center text-white md:h-16">
          <button
            className="h-12 w-16 text-center text-white add md:h-16 md:hover:bg-sky-900"
            aria-label="Add new thread"
            title="New thread"
          >
            <PlusOutlined />
          </button>
        </div>
        <div className="h-12 text-center text-white md:h-16">
          <button
            id="profile"
            className="h-12 w-16 text-center text-white md:h-16 md:hover:bg-sky-900"
            aria-label="Profile"
            title="Profile"
          >
            <UserOutlined />
          </button>
        </div>
        <div className="h-12 text-center text-white md:h-16">
          <button
            id="logout"
            className="h-12 w-16 text-center text-white md:h-16 md:hover:bg-sky-900"
            aria-label="Logout"
            title="Logout"
          >
            <LogoutOutlined />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
