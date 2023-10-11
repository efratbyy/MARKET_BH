import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { SnackbarProvider } from "./providers/SnackbarProvider";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SnackbarProvider>
          <Router />
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
