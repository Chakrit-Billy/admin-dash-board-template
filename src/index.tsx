import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/joy/styles";
import JoyOrderDashboardTemplate from "./App.tsx";

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <JoyOrderDashboardTemplate />
    </StyledEngineProvider>
  </React.StrictMode>
);
