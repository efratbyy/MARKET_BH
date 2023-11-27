import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Avatar, Grid } from "@mui/material";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import FacebookIcon from "@mui/icons-material/Facebook";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";

const MobileFooter = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <Grid
        className="container"
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "30px",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 3,
          }}
        >
          <BottomNavigation showLabels>
            <BottomNavigationAction
              onClick={() => navigate(ROUTES.ROOT)}
              label="בית"
              icon={<HomeTwoToneIcon />}
            />

            <BottomNavigationAction
              onClick={() => navigate(ROUTES.ABOUT)}
              label="אודות"
              icon={<InfoTwoToneIcon />}
            />

            <BottomNavigationAction
              // onClick={() => navigate(ROUTES.ROOT)}
              onClick={handleClick}
              label="מוצרים"
              icon={
                <Avatar
                  sx={{
                    border: "1px solid #555",
                    color: isClicked ? "white" : "#555",
                    bgcolor: isClicked ? "#5b9822" : "white",
                    marginTop: "-30px",
                    height: "90%",
                    width: "36%",
                  }}
                >
                  <FormatListBulletedTwoToneIcon />
                </Avatar>
              }
            />

            <BottomNavigationAction
              onClick={() =>
                window.open(
                  "https://www.facebook.com/p/%D7%9E%D7%A8%D7%A7%D7%98-%D7%92%D7%91%D7%A2%D7%AA-%D7%91%D7%99%D7%AA-%D7%94%D7%9B%D7%A8%D7%9D-100005717800641/?locale=he_IL",
                  "_blank"
                )
              }
              label="פייסבוק"
              icon={<FacebookIcon />}
            />

            <BottomNavigationAction
              onClick={() =>
                window.open(
                  "https://www.instagram.com/market_bet_hakerem/?hl=en",
                  "_blank"
                )
              }
              label="אינסטגרם"
              icon={<InstagramIcon />}
            />
          </BottomNavigation>
        </Paper>
      </Grid>
    </>
  );
};

export default MobileFooter;
