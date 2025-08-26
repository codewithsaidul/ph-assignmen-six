import { StrictMode } from "react";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./provider/Theme.Provider";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <Toaster position="top-center" reverseOrder={false} />
        </ThemeProvider>
      </Provider>
    </StrictMode>
);
