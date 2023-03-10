import { createContext, ReactNode, useContext } from "react"
import { MergedConfig, useConfig } from "../../config"
import { WallProductStore, ComparatorStore } from "@modules/WallProduct"
import UiStore from "./UiStore"

class RootStore {
  wallProductStore
  comparatorStore
  uiStore
  constructor(config: MergedConfig) {
    console.log("in rootStore constructor", { config })
    this.wallProductStore = new WallProductStore(config)
    this.comparatorStore = new ComparatorStore(config)
    this.uiStore = new UiStore(config)
  }
}

export const StoresContext = createContext({} as RootStore)
// export const StoresContextProvider = StoresContextProvider;

export const StoresProvider = ({ children }: { children: ReactNode }) => {
  const config = useConfig()
  const rootStore = new RootStore(config)
  return <StoresContext.Provider value={rootStore}>{children}</StoresContext.Provider>
}

export const useStores = () => useContext(StoresContext)

export const useStore = <T extends keyof RootStore>(store: T): RootStore[T] =>
  useContext(StoresContext)[store]
