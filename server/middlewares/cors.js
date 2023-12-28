const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:3000",
      "https://market-bh-client-3vsfq0nin-efratbyys-projects.vercel.app", // Deployment
      "https://market-bh.vercel.app", // Production
      "https://www.market-bh.co.il",
      "https://market-bh.co.il",
    ],
    optionsSuccessStatus: 200,
  })
);

module.exports = app;
