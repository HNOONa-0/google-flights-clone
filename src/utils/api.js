import { baseUrl } from "./data";

const api = async (endpoint, queryParams = {}) => {
  try {
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${baseUrl}/${endpoint}?${queryString}&locale=${
      import.meta.env.VITE_LOCALE
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
        "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};

export default api;
