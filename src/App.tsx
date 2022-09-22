import Router from "./Router";
import "./App.css";
import { StoresProvider } from "./state";
import { ConfigProvider } from "./config";
import { AuthProvider } from "./modules/auth";
import { FetcherProvider } from "./modules/fetcher";

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
  );
}

export default App;
