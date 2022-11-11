import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

export type AuthContextProps = {
  authConfig: AuthConfig
  getAccessToken: () => string | undefined
  loginWithRedirect: () => void
  auth: AuthState
}

export type AuthProviderProps = {
  authConfig: AuthConfig
  children: React.ReactNode
}

export type AuthConfig = {
  domain: string
  scope: string
  clientId: string
  redirectUri: string
  issuer: string
}

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
  return `${authConfig.domain}/authorize?redirect_uri=${encodeURIComponent(currentPath)}`
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ authConfig, children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthState>({} as AuthState)
  const [isCallRedirectProcessed, setIsCallRedirectProcessed] = useState<boolean>(false)

  const isCallbackRedirect = useMemo(() => {
    return _getUrlParam("access_token")
  }, [])

  const getAccessToken = useCallback(() => {
    return auth.accessToken
  }, [auth.accessToken])

  const loginWithRedirect = useCallback(() => loginWithRedirect, [])

  useEffect(() => {
    console.log("in AuthProvider > useEffect")
    if (isCallbackRedirect) {
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
      setIsCallRedirectProcessed(true)
    }
  }, [])

  if (isCallbackRedirect && !isCallRedirectProcessed) {
    return <></>
  }
  return (
    <AuthContext.Provider value={{ auth, authConfig, getAccessToken, loginWithRedirect }}>
      {children}
    </AuthContext.Provider>
  )
}

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const {
    auth: { accessToken, expires },
    authConfig,
  } = useAuth()

  useEffect(() => {
    console.log("in ProtectedRoute > useEffect")
    const date = Date.now()
    if (!accessToken || (expires && expires < date)) {
      loginWithRedirect(authConfig)
    }
  }, [accessToken, expires, authConfig])

  if (!accessToken) {
    return <></>
  }

  return children
}

const loginWithRedirect = (authConfig: AuthConfig) => {
  window.location.href = _buildAuthorizeUrl(authConfig)
}
