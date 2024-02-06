import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.sass";
import { TrelloContextProvider } from "./context/context.tsx";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <TrelloContextProvider>
        <App />
      </TrelloContextProvider>
    </React.StrictMode>
  );
}
