const configuredApiUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const productionApiUrl = "https://ecotwin-backend-4wz7.onrender.com";

export const API_BASE_URL = (
	configuredApiUrl || (import.meta.env.DEV ? "http://localhost:8080" : productionApiUrl)
).replace(/\/$/, "");
