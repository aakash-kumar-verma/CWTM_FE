"use client";
import { logout } from "@/app/api/api";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const Topbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownOptions = [
    {
      title: "My Profile",
      onClick: () => {
        redirect("/profile");
      },
    },
    {
      title: "Logout",
      onClick: () => logout(),
    },
  ];

  const getDropdownValues = () => {
    return dropdownOptions.map(({ title, onClick }) => {
      return (
        <button
          className="cursor-pointer border-1 border-gray-300 text-gray-500 bg-gray-50 mt-0.5  w-[150px]  rounded px-5 py-1"
          onClick={onClick}
          key={title}
        >
          {title}
        </button>
      );
    });
  };
  return (
    <div className="h-[60px] flex items-center justify-end pr-5">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative bg-gray-600 text-white cursor-pointer p-2 rounded-full h-10 w-10 flex justify-center items-center font-bold text-sm"
      >
        AV
        {showDropdown ? (
          <div className="rounded absolute top-[100%] right-0 border-1 border-gray-100 text-gray-500 bg-gray-200 w-[180px] mt-1 py-3">
            {getDropdownValues()}
          </div>
        ) : null}
      </button>
    </div>
  );
};

export default Topbar;
