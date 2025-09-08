// src/config.js
export const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://bookingbackend-production-0a58.up.railway.app";
