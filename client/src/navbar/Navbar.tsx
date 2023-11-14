import * as React from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

type Props = {
  showSearchBar?: boolean;
  showSideNavBar?: boolean;
};

const Navbar: React.FC<Props> = ({
  showSearchBar = true,
  showSideNavBar = true,
}) => {
  return (
    <>
      <DesktopNavbar showSearchBar={showSearchBar} />
      <MobileNavbar
        showSideNavBar={showSideNavBar}
        showSearchBar={showSearchBar}
      />
    </>
  );
};
export default Navbar;
