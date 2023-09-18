import axios from "axios";
import { UserInterface } from "../models/interfaces/interfaces.ts.js";
import { LoginType } from "../types/userTypes.js";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8188";

export const registrationApi = async (user: UserInterface) => {
  try {
    const { data } = await axios.post(`${apiUrl}/users/register`, user);
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const loginApi = async (user: LoginType) => {
  try {
    const { data } = await axios.post<string>(`${apiUrl}/users/login`, user);
    console.log(data);
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
