import axios from "axios";

const BASE = "https://app.ticketmaster.com/discovery/v2";
const KEY = process.env.EXPO_PUBLIC_TM_KEY ?? "";

export const api = axios.create({
  baseURL: BASE,
  headers: {
    Accept: "application/json",
  },
  params: {
    apikey: KEY,
  },
});