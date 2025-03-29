import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-screen-lg mx-auto px-4 py-10">{children}</div>;
};

export default Layout;
