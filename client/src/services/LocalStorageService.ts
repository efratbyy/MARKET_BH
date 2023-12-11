import React from "react";
import jwtDecode from "jwt-decode";
import { TokenType } from "../types/userTypes";

const TOKEN = "token_key";

export const getUserFromLocalStorage = () => {
  const token = localStorage.getItem(TOKEN);
  if (!token) return null;
  try {
    const user: TokenType = jwtDecode(token);
    return user;
  } catch (error) {
    return null;
  }
};

export const getToken = () => localStorage.getItem(TOKEN);

export const removeUser = () => {
  localStorage.removeItem(TOKEN);
};

export const saveUserToken = (token: string) => {
  localStorage.setItem(TOKEN, token);
};
