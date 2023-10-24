import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { SnackbarProvider } from "./providers/SnackbarProvider";
import UserProvider from "./providers/UserProvider";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SnackbarProvider>
          <UserProvider>
            <Router />
          </UserProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
