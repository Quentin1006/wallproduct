import { createContext, useContext, useEffect, useState } from "react";
import local from "./local";

export const ConfigContext = createContext({} as any);

export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider = ({ children }: any) => {
  const [config, setConfig] = useState(local);
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      const response = await fetch("/external-config.json");
      const externalConfig = await response.json();
      setConfig({
        ...local,
        ...externalConfig,
      });
      setFetching(false);
    };
    fetchConfig();
  }, []);

  if (isFetching) return <></>;
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};
