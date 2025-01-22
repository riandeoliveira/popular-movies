import "@/styles/globals.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";

const rootElement = document.querySelector("#root") as Element;

createRoot(rootElement!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
