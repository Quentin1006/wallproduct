import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import local from "./local"

export type AuthConfig = {
  domain: string
  scope: string
  clientId: string
  redirectUri: string
  issuer: string
}

export type ExternalConfig = {
  apiUrl: string
  authConfig: AuthConfig
}

export type MergedConfig = ExternalConfig & typeof local

export const ConfigContext = createContext<MergedConfig>({} as MergedConfig)

export const useConfig = () => useContext(ConfigContext)

export type ConfigProviderProps = {
  children: ReactNode
}
export const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const [config, setConfig] = useState<MergedConfig>(local as MergedConfig)
  const [isFetching, setFetching] = useState(true)

  useEffect(() => {
    const fetchConfig = async () => {
      const response = await fetch(`/external-config.json`)
      const externalConfig: ExternalConfig = await response.json()
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
