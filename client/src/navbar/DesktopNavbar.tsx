import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { removeUser } from "../services/LocalStorageService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import SearchBar from "../search_filter/SearchBar";
import { Grid } from "@mui/material";
import { useUser } from "../providers/UserProvider";

type Props = {
  showSearchBar?: boolean;
};

const DesktopNavbar: React.FC<Props> = ({ showSearchBar = true }) => {
  const navigate = useNavigate();
  const { user, setUser, setToken } = useUser();

  // const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
  //   null
  // );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    removeUser(); // remove from localStorage
    setUser(null);
    setToken(null);
    handleCloseUserMenu();
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "#5b9822", display: { xs: "none", md: "flex" } }}
      >
        <Toolbar disableGutters>
          {/*  NavBar */}
          <Grid
            container
            sx={{ display: { xs: "none", md: "flex", mr: "0px", ml: "0px" } }}
            justifyContent="space-between"
            alignItems="center"
          >
            {/* Title */}
            <Grid item md={4}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  pl: "20%",
                  display: { md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "#282828",
                  textDecoration: "none",
                  fontSize: {
                    md: "130%",
                    lg: "170%",
                  },
                }}
              >
                מרקט גבעת בית הכרם
              </Typography>
            </Grid>
            {/* Search Bar */}
            <Grid item md={6}>
              {showSearchBar && <SearchBar />}
            </Grid>
            {/* Avatar */}
            {user && (
              <Grid item md={1} sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar>{user.first.charAt(0).toUpperCase()}</Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={() => navigate(`${ROUTES.ROOT}`)}>
                    <Typography textAlign="center">האזור האישי</Typography>
                  </MenuItem>

                  <MenuItem
                    onClick={() => navigate(`${ROUTES.PURCHASE_HISTORY}`)}
                  >
                    <Typography textAlign="center">הסטורית הזמנות</Typography>
                  </MenuItem>

                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">התנתקות</Typography>
                  </MenuItem>
                </Menu>
              </Grid>
            )}

            {!user && (
              <Grid item md={2}>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid>
                    <Button
                      onClick={() => navigate(`${ROUTES.LOGIN}`)}
                      sx={{
                        my: 2,
                        color: "white",
                        display: {
                          xs: "none",
                          md: "block",
                          fontSize: "100%",
                          padding: 0,
                        },
                      }}
                    >
                      התחבר
                    </Button>
                  </Grid>
                  <Grid>
                    <Button
                      onClick={() => navigate(`${ROUTES.REGISTER}`)}
                      sx={{
                        my: 2,
                        color: "white",
                        display: { xs: "none", md: "block" },
                        fontSize: "100%",
                        padding: 0,
                        paddingRight: 3,
                      }}
                    >
                      הרשם
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default DesktopNavbar;
