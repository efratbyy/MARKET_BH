import * as React from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

type Props = {
  showSearchBar?: boolean;
};

const Navbar: React.FC<Props> = ({ showSearchBar = true }) => {
  return (
    <>
      <DesktopNavbar showSearchBar={showSearchBar} />
      <MobileNavbar showSearchBar={showSearchBar} />
    </>
  );
};
export default Navbar;
