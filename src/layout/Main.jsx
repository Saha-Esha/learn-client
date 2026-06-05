import React from "react";
import { Outlet, useLocation } from "react-router";
import Nabar from "../Component/navbar/Nabar";

const Main = () => {
  const location = useLocation();

  // paths where navbar should NOT appear
  const hideNavbarRoutes = ["/", "/enterUser"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  return (
    <div>
      {!shouldHideNavbar && <Nabar />}
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
