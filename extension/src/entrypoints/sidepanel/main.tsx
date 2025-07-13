import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/assets/tailwind.css";
import { TRPCProvider } from "@/lib/TrpcProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TRPCProvider>
      <App />
    </TRPCProvider>
  </React.StrictMode>
);
