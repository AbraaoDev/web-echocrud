import axios from "axios";

export const useApiClient = () => {
  const config = useRuntimeConfig();

  const apiClient = axios.create({
    baseURL: config.public.apiBase,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return apiClient;
};
