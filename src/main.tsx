import { StrictMode } from "react";
import { ToastContainer} from 'react-toastify';
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@/styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ToastContainer />
  </StrictMode>
);
