import axios from "axios";
import { UserInterface } from "../models/interfaces/interfaces.ts";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8188";

export const registration = async (user: UserInterface) => {
  try {
    const { data } = await axios.post(`${apiUrl}/users/register`, user);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject("An unexpected error occurred!");
  }
};
