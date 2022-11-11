import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { Config } from "typings"
import local from "./local"

export const ConfigContext = createContext<Config>({} as Config)

export const useConfig = () => useContext(ConfigContext)

export type ConfigProviderProps = {
  children: ReactNode
}
export const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const [config, setConfig] = useState(local)
  const [isFetching, setFetching] = useState(true)

  useEffect(() => {
    const fetchConfig = async () => {
      const response = await fetch("/external-config.json")
      const externalConfig = await response.json()
      setConfig({
        ...local,
        ...externalConfig,
      })
      setFetching(false)
    }
    fetchConfig()
  }, [])

  if (isFetching) return <></>
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
}
