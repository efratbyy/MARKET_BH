import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import { Button, Grid } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import GavelIcon from "@mui/icons-material/Gavel";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

const DesktopFooter = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <Grid
        container
        sx={{
          display: "relative",
          bottom: 0,
          width: "100%",
          flexDirection: "column",
          //minHeight: "30px",
        }}
      >
        <Paper elevation={3}>
          <Grid container>
            {/* <BottomNavigation> */}
            <Grid
              xs={3}
              item
              sx={{
                display: "block",
                padding: "40px",
                textAlign: "center",
                justifyContent: "space-between",
              }}
            >
              <a href="tel:+97226437197" style={{ textDecoration: "none" }}>
                <Grid
                  item
                  sx={{
                    padding: "10px",
                    color: "#555",
                  }}
                >
                  טלפון: 02-6437197
                </Grid>
              </a>

              <a href="tel:+97226427215" style={{ textDecoration: "none" }}>
                <Grid
                  item
                  sx={{
                    padding: "10px",
                    color: "#555",
                  }}
                >
                  פקס: 02-6437197
                </Grid>
              </a>

              <a
                href="mailto:example@example.com"
                style={{ textDecoration: "none" }}
              >
                <Grid item sx={{ padding: "5px", color: "#555" }}>
                  דואר אלקטרוני: market_bh@gmail.com
                </Grid>
              </a>
            </Grid>
            <Grid
              xs={3}
              item
              sx={{
                display: "block",
                textAlign: "center",
                justifyContent: "space-between",
              }}
            >
              <a
                href="https://wa.me/123456789"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "5px",
                  textDecoration: "none",
                }}
              >
                <Grid item sx={{ padding: "5px", color: "#555" }}>
                  ליצירת קשר דרך ה- WhatsApp {<WhatsAppIcon />}
                </Grid>
              </a>

              <a
                href="https://www.facebook.com/p/%D7%9E%D7%A8%D7%A7%D7%98-%D7%92%D7%91%D7%A2%D7%AA-%D7%91%D7%99%D7%AA-%D7%94%D7%9B%D7%A8%D7%9D-100005717800641/?locale=he_IL"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Grid item sx={{ padding: "5px", color: "#555" }}>
                  בקרו אותנו בדף ה- Facebook שלנו {<FacebookIcon />}
                </Grid>
              </a>

              <a
                href="https://www.instagram.com/market_bet_hakerem/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Grid item sx={{ padding: "5px", color: "#555" }}>
                  בקרו אותנו בדף ה- Instagram שלנו {<InstagramIcon />}
                </Grid>
              </a>
            </Grid>
            <Grid
              xs={3}
              item
              sx={{
                display: "block",
                padding: "40px",
                textAlign: "center",
              }}
            >
              <Grid item sx={{ padding: "5px", textDecoration: "none" }}>
                <Button
                  sx={{ color: "#555" }}
                  onClick={() => navigate(ROUTES.ABOUT)}
                >
                  {<InfoTwoToneIcon />} אודותינו
                </Button>
              </Grid>

              <Grid item sx={{ padding: "5px", textDecoration: "none" }}>
                <Button
                  sx={{ color: "#555" }}
                  onClick={() => navigate(ROUTES.ABOUT)}
                >
                  {<AccessibilityNewIcon />} הצהרת נגישות
                </Button>
              </Grid>

              <Grid item sx={{ padding: "5px", textDecoration: "none" }}>
                <Button
                  sx={{ color: "#555" }}
                  onClick={() => navigate(ROUTES.ABOUT)}
                >
                  {<GavelIcon />} תנאי השימוש
                </Button>
              </Grid>
            </Grid>
            <Grid
              xs={3}
              item
              sx={{
                display: "block",
                padding: "40px",
                textAlign: "center",
                justifyContent: "space-between",
              }}
            >
              <a
                href="https://www.google.com/maps/place/%D7%94%D7%97%D7%9C%D7%95%D7%A5+72,+%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D%E2%80%AD/@31.7746472,35.1892611,17z/data=!3m1!4b1!4m6!3m5!1s0x1502d7b76d2060ef:0x8713ce96140001be!8m2!3d31.7746472!4d35.1892611!16s%2Fg%2F11f5k23c89?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Grid item sx={{ padding: "5px", color: "#555" }}>
                  {<HomeWorkIcon />} כתובתינו: החלוץ 72, ירושלים
                </Grid>
              </a>
            </Grid>
            {/* </BottomNavigation> */}
          </Grid>

          <Grid item xs={12}>
            @
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default DesktopFooter;
