import React, { useState } from "react";
import { LoginType } from "../types/userTypes";
import { loginApi } from "../apiService/userApiService";
import ROUTES from "../routes/routesModel";
import { getUser, saveUserToken } from "../services/LocalStorageService";
import { Button, Grid, TextField, Typography } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //   const handleLogin = () => {
  //     // You can implement your authentication logic here.
  //     // For simplicity, we'll just check if the username and password are non-empty.
  //     if (username && password) {
  //       setIsLoggedIn(true);
  //     }
  //   };

  const handleLogin = async () => {
    try {
      const user: LoginType = { email: username, password: password };
      const token = await loginApi(user);
      saveUserToken(token);

      console.log(getUser());
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  //   return (
  //     <div>
  //       {isLoggedIn ? (
  //         <div>
  //           <p>Welcome, {username}! You are logged in.</p>
  //           <button onClick={handleLogout}>Logout</button>
  //         </div>
  //       ) : (
  //         <div>
  //           <h2>Login Page</h2>
  //           <input
  //             type="text"
  //             placeholder="Username"
  //             value={username}
  //             onChange={(e) => setUsername(e.target.value)}
  //           />
  //           <input
  //             type="password"
  //             placeholder="Password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //           />
  //           <button onClick={handleLogin}>Login</button>
  //         </div>
  //       )}
  //     </div>
  //   );

  return (
    <Grid
      container
      spacing={3}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <Typography variant="h4" component="div">
          Login
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
