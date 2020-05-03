import React, { useState } from "react";

import Navbar from "./Navbar";
import SideDrawer from "./SideDrawer";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Navbar setOpen={setOpen} />
      <SideDrawer open={open} setOpen={setOpen} />
      <main>{children}</main>
    </React.Fragment>
  );
};

export default Layout;
