import axios from "axios";

export const APIServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API,
});