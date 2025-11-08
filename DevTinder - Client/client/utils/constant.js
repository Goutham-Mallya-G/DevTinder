// Environment configuration
// This file reads from environment variables for deployment
// For local development, values fallback to localhost

export const BE_URL = import.meta.env.VITE_BE_URL || "http://localhost:3000";

// Add other constants as needed
// export const API_KEY = import.meta.env.VITE_API_KEY || "";
// export const OTHER_CONFIG = import.meta.env.VITE_OTHER_CONFIG || "";
