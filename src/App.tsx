import Router from "./Router"

import "./App.css"
import { StoresProvider } from "./shared/state"
import { ConfigProvider, useConfig } from "./config"
import { AuthProvider, useAuth } from "./shared/auth"
import { FetcherProvider } from "./shared/fetcher"

function App() {
  return (
    <ConfigProvider>
      <AppWithConfig />
    </ConfigProvider>
  )
}

function AppWithConfigAndAuth() {
  const { apiUrl } = useConfig()
  const { auth, getAccessToken } = useAuth()

  return (
    <FetcherProvider apiUrl={apiUrl} getAccessToken={getAccessToken}>
      <StoresProvider>
        <Router />
      </StoresProvider>
    </FetcherProvider>
  )
}

function AppWithConfig() {
  const { authConfig } = useConfig()
  return (
    <AuthProvider authConfig={authConfig}>
      <AppWithConfigAndAuth />
    </AuthProvider>
  )
}

export default App
