import Router from "./Router";
import "./App.css";
import { StoresProvider } from "./state";
import { ConfigProvider } from "./config";

function App() {
  return (
    <ConfigProvider>
      <StoresProvider>
        <Router />
      </StoresProvider>
    </ConfigProvider>
  );
}

export default App;
