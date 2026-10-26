import React, { ReactNode } from "react";
import LeftSidebar from "../components/sidebar/sidebar";
import Topbar from "../components/topbar/topbar";

type AuthenticatedLayoutProps = {
  children: ReactNode;
};

const layoutAuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  return (
    <div>
      <div className="flex h-100">
        <div className="bg-slate-50 w-[15%] h-screen">
          <LeftSidebar />
        </div>
        <div className="w-[85%]">
          <Topbar />
          <div className="px-5  py-2 h-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default layoutAuthenticatedLayout;
