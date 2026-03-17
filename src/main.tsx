import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { injectTheme } from "./tokens/theme";
import "./index.css";
import App from "./App";

// FOUC を防ぐため createRoot より前に CSS 変数をセット
injectTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
