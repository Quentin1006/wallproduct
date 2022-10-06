import { createContext, useContext } from "react";
import { useConfig } from "../config";
import RenewalStore from "../Renewal/store";
import UiStore from "./UiStore";

class RootStore {
  renewalStore;
  uiStore;
  _accessToken: string | undefined;
  constructor(config: any) {
    console.log("in rootStore constructor", { config });
    this.renewalStore = new RenewalStore(config);
    this.uiStore = new UiStore(config);
  }
}

export const StoresContext = createContext({} as RootStore);
// export const StoresContextProvider = StoresContextProvider;

export const StoresProvider = ({ children }: any) => {
  const config = useConfig();
  const rootStore = new RootStore(config);
  return (
    <StoresContext.Provider value={rootStore}>
      {children}
    </StoresContext.Provider>
  );
};

export const useStores = () => useContext(StoresContext);

export const useStore = <T extends keyof RootStore>(store: T): RootStore[T] =>
  useContext(StoresContext)[store];
