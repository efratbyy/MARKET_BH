import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Container, CssBaseline, Grid, Typography } from "@mui/material";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <CssBaseline />
      <Container
        sx={{
          backgroundImage: 'url("/assets/images/1.png")', // Replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh", // Adjust the height as needed
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white", // Text color
        }}
      >
        <Grid
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Background color for text
            padding: "spacing(2)",
          }}
        >
          <Typography variant="h4">Your Text Goes Here</Typography>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default AboutPage;
