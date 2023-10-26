import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./routesModel";
import RegistrationForm from "../register/RegistrationForm";
import ErrorPage from "../pages/ErrorPage";
import Login from "../login/Login";
import HomePage from "../components/HomePage";
import ShoppingCartMobilePage from "../cart/ShoppingCartMobilePage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.REGISTER} element={<RegistrationForm />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.ROOT} element={<HomePage />} />
      <Route path={ROUTES.SHOPPING_CART} element={<ShoppingCartMobilePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
