import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./routesModel";
import RegistrationForm from "../users/RegistrationForm";
import ErrorPage from "../pages/ErrorPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.REGISTER} element={<RegistrationForm />} />
      {/* <Route path="*" element={<ErrorPage />} /> */}
    </Routes>
  );
};

export default Router;
