"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LeftSidebar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  const sidebarNavigation = [
    {
      title: "Dashboard",
      link: "/dashboard",
    },
    {
      title: "Projects",
      link: "/projects",
    },
    {
      title: "My Tasks",
      link: "/my-tasks",
    },
    {
      title: "Calendar",
      link: "/calendar",
    },
    {
      title: "Team",
      link: "/team",
    },
    {
      title: "Report",
      link: "/report",
    },
  ];
  const handleNavigation = (index: number) => {
    setActiveTab(index);
    router.push(sidebarNavigation[index].link);
  };
  return (
    <div>
      <div className="bg-[url('/homepage_logo.png')] bg-cover bg-left bg-no-repeat h-[40px] m-5 w-[200px]"></div>
      <div className="flex justify-center flex-col gap-y-1 items-center">
        {sidebarNavigation.map(({ title }, index) => {
          return (
            <button
              key={title}
              onClick={() => handleNavigation(index)}
              className={`flex py-1.5 pl-5 text-sm text-left w-[80%] rounded ${index === activeTab ? "active text-indigo-600 bg-[#E8EBFF] font-bold" : "text-gray-500"}`}
            >
              <span className="cursor-pointer">{title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LeftSidebar;
