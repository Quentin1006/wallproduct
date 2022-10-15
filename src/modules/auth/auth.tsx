import { createContext, useContext, useEffect, useState } from "react"

export type AuthContextProps = {
  authConfig: AuthConfig
  auth: AuthState
}

// @TODO: A remplacer
export type AuthConfig = any

export type AuthState = {
  accessToken?: string
  expires?: number
  id?: number
}

export const _getUrlParam = (param: string): string | undefined => {
  const url = new URL(window.location.href)
  return url.searchParams.get(param) || undefined
}

export const _buildAuthorizeUrl = (authConfig: AuthConfig): string => {
  const currentUrl = new URL(window.location.href)
  const currentPath = currentUrl.toString().split("?")[0]
  return `http://localhost:8088/authorize?redirect_uri=${currentPath}`
}

export const AuthContext = createContext<AuthContextProps>({} as any)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ authConfig, children }: any) => {
  const [auth, setAuth] = useState<AuthState>({})

  useEffect(() => {
    if (_getUrlParam("access_token")) {
      const accessToken = _getUrlParam("access_token")
      const id = Number(_getUrlParam("id"))
      const expires = Number(_getUrlParam("expires"))

      const urlWithoutSearch = window.location.href.replace(window.location.search, "")
      window.history.replaceState({}, "", urlWithoutSearch)

      setAuth({
        accessToken,
        expires,
        id,
      })
    }
  }, [])
  return <AuthContext.Provider value={{ auth, authConfig }}>{children}</AuthContext.Provider>
}

export const ProtectedRoute = ({ children }: any) => {
  const {
    auth: { accessToken, expires },
    authConfig,
  } = useAuth()

  useEffect(() => {
    const date = Date.now()
    if (!accessToken || (expires && expires < date)) {
      window.location.href = _buildAuthorizeUrl(authConfig)
    }
  }, [accessToken, expires])

  return children
}
