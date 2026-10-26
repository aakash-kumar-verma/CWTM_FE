import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full h-screen">
      <div
        className={`bg-gray-200  bg-[url('/loginImg.png')] bg-cover bg-left bg-no-repeat md:block md:w-[55%]`}
      ></div>
      <div className="bg-gray-50 w-full md-w-[45%]  flex justify-center items-center ">
        {children}
      </div>
    </div>
  );
};

export default layout;
