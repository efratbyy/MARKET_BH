import React from "react";
import jwtDecode from "jwt-decode";
import { TokenType } from "../types/userTypes";

const TOKEN = "token_key";

export const getUser = () => {
  const token = localStorage.getItem(TOKEN);
  if (!token) return null;
  try {
    const user: TokenType = jwtDecode(token);
    return user;
  } catch (error) {
    return null;
  }
};

export const removeUser = () => {
  localStorage.removeItem(TOKEN);
};

export const saveUserToken = (token: string) => {
  localStorage.setItem(TOKEN, token);
};
