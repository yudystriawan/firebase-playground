import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-screen-sm mx-auto p-5">{children}</div>;
};

export default Layout;
