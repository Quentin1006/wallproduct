import { createContext, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../auth";

export const FetcherContext = createContext({} as any);

export const useFetcher = () => useContext(FetcherContext);

export const FetcherProvider = ({ children }: any) => {
  const { accessToken } = useAuth();
  const axiosInstance = axios.create();

  useEffect(() => {
    axiosInstance.interceptors.request.use((config) => {
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });
  }, [axiosInstance, accessToken]);
  return (
    <FetcherContext.Provider value={{ fetcher: axiosInstance }}>
      {children}
    </FetcherContext.Provider>
  );
};
