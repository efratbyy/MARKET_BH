import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./routesModel";
import RegistrationForm from "../register/RegistrationForm";
import ErrorPage from "../components/ErrorPage";
import Login from "../login/Login";
import HomePage from "../components/HomePage";
import ShoppingCartMobilePage from "../cart/ShoppingCartMobilePage";
import AboutPage from "../components/AboutPage";
import CheckoutPage from "../components/CheckoutPage";
import PurchaseHistory from "../components/PurchaseHistory";
import OrderConfirmation from "../components/OrderConfirmation";
import PurchaseHistoryDetails from "../components/PurchaseHistoryDetails";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.REGISTER} element={<RegistrationForm />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.ROOT} element={<HomePage />} />
      <Route path={ROUTES.SHOPPING_CART} element={<ShoppingCartMobilePage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
      <Route path={ROUTES.ORDER_CONFIRMATION} element={<OrderConfirmation />} />
      <Route path={ROUTES.PURCHASE_HISTORY} element={<PurchaseHistory />} />
      <Route
        path={ROUTES.PURCHASE_HISTORY_DETAILS}
        element={<PurchaseHistoryDetails />}
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
