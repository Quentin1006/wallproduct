import Router from "./Router"

import "./App.css"
import { StoresProvider } from "./shared/state"
import { ConfigProvider } from "./config"
import { AuthProvider } from "./shared/auth"
import { FetcherProvider } from "./shared/fetcher"

function App() {
  return (
    <AuthProvider>
      <FetcherProvider>
        <ConfigProvider>
          <StoresProvider>
            <Router />
          </StoresProvider>
        </ConfigProvider>
      </FetcherProvider>
    </AuthProvider>
  )
}

export default App
