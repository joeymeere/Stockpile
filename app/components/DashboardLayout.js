import React from "react";
import SideNav from "./SideNav";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <SideNav />
      <div className="w-20"></div>
      <div
        style={{
          width: `calc(100vw - 5rem)`,
        }}
        className="px-5 py-3 pl-10"
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
