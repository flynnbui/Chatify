import React, { useState } from "react";
import {
  BellOutlined,
  HomeOutlined,
  LogoutOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import MessageItem from "../../components/MessageItem";
import { message } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const ForumLayout = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [sender, setSender] = useState("");
  const [time, setTime] = useState("");
  const [latestMessage, setlatestMessage] = useState("");
  const navigate = useNavigate();

  const threadList = [
    {
      id: {
        id: 1,
        title: "COO for cupcake factory 1",
        isPublic: true,
        lock: true,
        content: "Does anyone know what the answer to the question is??",
        creatorId: 61021,
        createdAt: "2011-10-05T14:48:00.000Z",
        likes: [61021],
        watchees: [61021],
      },
    },
    {
      id: {
        id: 2,
        title: "COO for cupcake factory 2",
        isPublic: true,
        lock: true,
        content: "Does anyone know what the answer to the question is??",
        creatorId: 61021,
        createdAt: "2011-10-05T14:48:00.000Z",
        likes: [61021],
        watchees: [61021],
      },
    },
    {
      id: {
        id: 3,
        title: "COO for cupcake factory 3",
        isPublic: true,
        lock: true,
        content: "Does anyone know what the answer to the question is??",
        creatorId: 61021,
        createdAt: "2011-10-05T14:48:00.000Z",
        likes: [61021],
        watchees: [61021],
      },
    },
    {
      id: {
        id: 4,
        title: "COO for cupcake factory 4",
        isPublic: true,
        lock: true,
        content: "Does anyone know what the answer to the question is??",
        creatorId: 61021,
        createdAt: "2011-10-05T14:48:00.000Z",
        likes: [61021],
        watchees: [61021],
      },
    },
    {
      id: {
        id: 4,
        title: "COO for cupcake factory 4",
        isPublic: true,
        lock: true,
        content: "Does anyone know what the answer to the question is??",
        creatorId: 61021,
        createdAt: "2011-10-05T14:48:00.000Z",
        likes: [61021],
        watchees: [61021],
      },
    },
    {
      id: {
        id: 4,
        title: "COO for cupcake factory 4",
        isPublic: true,
        lock: true,
        content: "Does anyone know what the answer to the question is??",
        creatorId: 61021,
        createdAt: "2011-10-05T14:48:00.000Z",
        likes: [61021],
        watchees: [61021],
      },
    },
    {
      id: {
        id: 4,
        title: "COO for cupcake factory 4",
        isPublic: true,
        lock: true,
        content: "Does anyone know what the answer to the question is??",
        creatorId: 61021,
        createdAt: "2011-10-05T14:48:00.000Z",
        likes: [61021],
        watchees: [61021],
      },
    },
    {
      id: {
        id: 4,
        title: "COO for cupcake factory 4",
        isPublic: true,
        lock: true,
        content: "Does anyone know what the answer to the question is??",
        creatorId: 61021,
        createdAt: "2011-10-05T14:48:00.000Z",
        likes: [61021],
        watchees: [61021],
      },
    },
    {
      id: {
        id: 4,
        title: "COO for cupcake factory 4",
        isPublic: true,
        lock: true,
        content: "Does anyone know what the answer to the question is??",
        creatorId: 61021,
        createdAt: "2011-10-05T14:48:00.000Z",
        likes: [61021],
        watchees: [61021],
      },
    },
    {
      id: {
        id: 4,
        title: "COO for cupcake factory 4",
        isPublic: true,
        lock: true,
        content: "Does anyone know what the answer to the question is??",
        creatorId: 61021,
        createdAt: "2011-10-05T14:48:00.000Z",
        likes: [61021],
        watchees: [61021],
      },
    },
    {
      id: {
        id: 4,
        title: "COO for cupcake factory 4",
        isPublic: true,
        lock: true,
        content: "Does anyone know what the answer to the question is??",
        creatorId: 61021,
        createdAt: "2011-10-05T14:48:00.000Z",
        likes: [61021],
        watchees: [61021],
      },
    },
  ];

  return (
    <div className="flex h-screen w-full flex-col md:flex-row">
      {/* Navigation bar */}
      <nav className="flex h-12 w-full shrink-0 flex-row bg-inherit md:h-screen md:w-16 md:flex-col">
        {/* Logo */}
        <div className="hidden items-center justify-center text-center md:flex md:h-1/6">
          <div className="text-white">
            <button className="home">Qanda 🦘</button>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex h-full w-full flex-row justify-around md:h-4/6 md:w-16 md:flex-col md:justify-start">
          <NavButton
            icon={<HomeOutlined />}
            label="Home"
            isActive={activeTab === "home"}
            onClick={() => setActiveTab("home")}
          />
          <NavButton
            icon={<BellOutlined />}
            label="Notifications"
            isActive={activeTab === "notifications"}
            onClick={() => setActiveTab("notifications")}
          />
          <NavButton
            icon={<PlusOutlined />}
            label="New thread"
            isActive={activeTab === "newThread"}
            onClick={() => setActiveTab("newThread")}
          />
          <NavButton
            icon={<UserOutlined />}
            label="Profile"
            isActive={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
          <NavButton
            icon={<LogoutOutlined />}
            label="Logout"
            isActive={activeTab === "logout"}
            onClick={() => setActiveTab("logout")}
          />
        </div>
      </nav>

      {/* Main Content */}
      <div
        className="flex flex-grow flex-col h-[calc(100vh-3rem)] md:h-screen"
        id="mainView"
      >
        {/* Web's Header */}
        <div className="my-2 hidden text-center text-2xl font-bold leading-7 text-white md:my-5 md:block">
          Home
        </div>

        {/* Content Container */}
        <div className="flex flex-grow flex-col overflow-hidden px-2 md:flex-row md:px-0">
          {/* Threads List */}
          <div className="mb-2 flex h-1/3 w-full flex-col overflow-hidden rounded-t-xl border-2 border-gray-500 md:mb-0 md:h-full md:w-96">
            <div className="flex w-full items-center p-2 font-bold text-white md:p-3">
              <div className="w-3/4 text-xl leading-7">Threads</div>
              <div className="flex flex-grow items-center justify-center">
                <button
                  className="flex flex-grow items-center justify-center"
                  aria-label="New thread"
                  title="New Thread"
                  onClick={() => navigate("/home/newChat")}
                >
                  <div className="mr-3">Create</div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-700 bg-gray-600">
                    <PlusOutlined size={16} />
                  </div>
                </button>
              </div>
            </div>
            <div id="threadList" className="flex-grow overflow-y-auto">
              {/* Thread list items go here */}
              {threadList.map((thread) => (
                <MessageItem
                  key={thread.id}
                  sender={thread.id.creatorId}
                  time={new Date(thread.id.createdAt).toLocaleString()}
                  latestMessage={thread.id.title}
                />
              ))}
            </div>
          </div>

          {/* Thread Content */}
          <div className="flex h-2/3 w-full flex-grow flex-col items-center md:h-full">
            <div
              id="threadContainer"
              className="flex h-full w-full flex-col overflow-hidden rounded-t-xl border-2 border-gray-500 md:-ml-6 md:w-11/12"
            >
              <Outlet/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for navigation buttons
const NavButton = ({ icon, label, isActive, onClick }) => {
  return (
    <div className="h-12 text-center text-white md:h-16">
      <button
        className={`h-12 w-16 text-center text-white md:h-16 
          ${isActive ? "bg-sky-900" : "md:hover:bg-sky-900"}`}
        aria-label={label}
        title={label}
        onClick={onClick}
      >
        {icon}
      </button>
    </div>
  );
};

export default ForumLayout;
